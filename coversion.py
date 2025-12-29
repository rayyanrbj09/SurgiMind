import os
import json
import re
import shutil
from collections import defaultdict

# ================= CONFIG =================

DATA_ROOT = "/home/sagemaker-user/surgimind01"

SPLITS = {
    "train": "Training",
    "val": "Validation"
}

YOLO_ROOT = "/home/sagemaker-user/yolo_dataset"

IMG_OUT = {
    "train": os.path.join(YOLO_ROOT, "images/train"),
    "val": os.path.join(YOLO_ROOT, "images/val"),
}

LBL_OUT = {
    "train": os.path.join(YOLO_ROOT, "labels/train"),
    "val": os.path.join(YOLO_ROOT, "labels/val"),
}

# create output dirs
for d in list(IMG_OUT.values()) + list(LBL_OUT.values()):
    os.makedirs(d, exist_ok=True)

# =========================================


def build_frame_lookup(frames_dir):
    """
    Build mapping: {frame_id (int) -> filename}
    """
    lookup = {}
    for fname in os.listdir(frames_dir):
        match = re.search(r"(\d+)", fname)
        if match:
            lookup[int(match.group(1))] = fname
    return lookup


def process_video(video_folder, split):
    base_dir = os.path.join(DATA_ROOT, SPLITS[split])
    video_dir = os.path.join(base_dir, video_folder)

    frames_dir = os.path.join(video_dir, "Frames")
    if not os.path.exists(frames_dir):
        print(f"❌ Missing Frames/ in {video_folder}")
        return

    # auto-detect JSON file (case-insensitive)
    json_files = [f for f in os.listdir(video_dir) if f.lower().endswith(".json")]
    if not json_files:
        print(f"❌ No JSON found in {video_folder}")
        return

    json_path = os.path.join(video_dir, json_files[0])
    print(f"\n▶ Processing {video_folder} [{split}]")
    print(f"✔ Using JSON: {json_path}")

    frame_lookup = build_frame_lookup(frames_dir)

    with open(json_path, "r") as f:
        data = json.load(f)

    if "annotations" not in data or not isinstance(data["annotations"], dict):
        print(f"❌ Unexpected JSON structure in {video_folder}")
        return

    frame_annotations = defaultdict(list)

    # CORRECT parsing for nested dict annotations
    for frame_id_str, ann_list in data["annotations"].items():
        try:
            frame_id = int(frame_id_str)
        except ValueError:
            continue

        for ann in ann_list:
            class_id = ann["instrument"]
            xc, yc, w, h = ann["tool_bbox"]

            frame_annotations[frame_id].append((class_id, xc, yc, w, h))

    # write YOLO files
    for frame_id, objects in frame_annotations.items():
        if frame_id not in frame_lookup:
            continue

        src_img = os.path.join(frames_dir, frame_lookup[frame_id])

        img_name = f"{video_folder}_{frame_id}.jpg"
        lbl_name = f"{video_folder}_{frame_id}.txt"

        shutil.copy(src_img, os.path.join(IMG_OUT[split], img_name))

        with open(os.path.join(LBL_OUT[split], lbl_name), "w") as f:
            for class_id, xc, yc, w, h in objects:
                f.write(f"{class_id} {xc} {yc} {w} {h}\n")


# ================= RUN =================

for split in SPLITS:
    base_dir = os.path.join(DATA_ROOT, SPLITS[split])

    for video_folder in sorted(os.listdir(base_dir)):
        if not video_folder.lower().startswith("vid"):
            continue
        process_video(video_folder, split)

print("\n✅ YOLO dataset generation COMPLETE")
