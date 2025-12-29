import subprocess
import sys
import os

# -----------------------------
# STEP 1: Ensure ultralytics is installed
# -----------------------------
def install_packages():
    try:
        import ultralytics  # noqa
        print("ultralytics already installed")
    except ImportError:
        print("Installing ultralytics...")
        subprocess.check_call([
            sys.executable, "-m", "pip", "install",
            "ultralytics>=8.0.0"
        ])

install_packages()

# -----------------------------
# STEP 2: Imports AFTER install
# -----------------------------
from ultralytics import YOLO
import torch

# -----------------------------
# STEP 3: Paths (SageMaker standard)
# -----------------------------
DATA_YAML = "/opt/ml/input/data/train/data.yaml"
OUTPUT_DIR = "/opt/ml/model"

# -----------------------------
# STEP 4: Training
# -----------------------------
def main():
    print("Torch version:", torch.__version__)
    print("CUDA available:", torch.cuda.is_available())

    # Load pretrained YOLO model
    model = YOLO("yolov8n.pt")  # lightweight + fast

    model.train(
        data=DATA_YAML,
        epochs=50,
        imgsz=640,
        batch=16,
        device=0 if torch.cuda.is_available() else "cpu",
        project=OUTPUT_DIR,
        name="yolo-exp",
        save=True,
        save_period=1,        # checkpoint every epoch
        exist_ok=True,
        workers=4,
        verbose=True
    )

    print("Training completed successfully")

if __name__ == "__main__":
    main()
