# phase_dataset.py
import os
import json
import torch
import numpy as np
from torch.utils.data import Dataset
from PIL import Image
from torchvision import transforms
from collections import Counter

VALID_EXT = (".jpg", ".jpeg", ".png")

class PhaseSequenceDataset(Dataset):
    def __init__(self, video_dirs, seq_len=10):
        self.seq_len = seq_len
        self.samples = []

        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])

        for video_dir in video_dirs:
            frames_dir = os.path.join(video_dir, "Frames")
            if not os.path.isdir(frames_dir):
                continue

            # ---- auto-detect JSON file ----
            json_files = [
                f for f in os.listdir(video_dir)
                if f.lower().endswith(".json")
            ]
            if not json_files:
                continue

            ann_path = os.path.join(video_dir, json_files[0])

            with open(ann_path, "r") as f:
                data = json.load(f)

            # ---- nested JSON handling ----
            annotations = data.get("annotations", {})
            if not isinstance(annotations, dict):
                continue

            # ---- build phase map (frame_id -> phase) ----
            phase_map = {}
            for frame_id_str, ann_list in annotations.items():
                try:
                    frame_id = int(frame_id_str)
                except ValueError:
                    continue

                if not ann_list:
                    continue

                phase = ann_list[0].get("phase", -1)
                if phase != -1:
                    phase_map[frame_id] = phase

            if not phase_map:
                continue

            # ---- collect valid frame files ----
            frames = []
            for fname in os.listdir(frames_dir):
                if not fname.lower().endswith(VALID_EXT):
                    continue
                try:
                    frame_id = int(fname.split(".")[0])
                    frames.append((frame_id, fname))
                except ValueError:
                    continue

            frames.sort(key=lambda x: x[0])  # sort by frame number
            frame_ids = [f[0] for f in frames]

            # ---- build sequences ----
            for i in range(len(frame_ids) - seq_len + 1):
                seq_ids = frame_ids[i:i + seq_len]
                last_id = seq_ids[-1]

                if last_id not in phase_map:
                    continue

                seq_files = [
                    next(fname for fid, fname in frames if fid == sid)
                    for sid in seq_ids
                ]

                self.samples.append((
                    frames_dir,
                    seq_files,
                    phase_map[last_id]
                ))

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        frames_dir, seq_files, label = self.samples[idx]

        imgs = []
        for fname in seq_files:
            img_path = os.path.join(frames_dir, fname)
            img = Image.open(img_path).convert("RGB")
            imgs.append(self.transform(img))

        x = torch.stack(imgs)  # (T, 3, H, W)
        y = torch.tensor(label)

        return x, y
