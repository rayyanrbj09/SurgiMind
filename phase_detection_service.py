import cv2
import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision.models as models
import torchvision.transforms as T
from PIL import Image
from collections import deque
import os


# =========================
# CONFIG
# =========================
SEQ_LEN = 10
NUM_CLASSES = 7
IMG_SIZE = 224

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

LABEL_MAP = {
    0: "Preparation",
    1: "CalotTriangleDissection",
    2: "ClippingCutting",
    3: "GallbladderDissection",
    4: "GallbladderPackaging",
    5: "CleaningCoagulation",
    6: "GallbladderRetraction"
}

# =========================
# MODEL DEFINITION
# =========================
class CNNLSTM(nn.Module):
    def __init__(self, num_classes, hidden_size=256):
        super().__init__()

        resnet = models.resnet18(pretrained=False)
        self.cnn = nn.Sequential(*list(resnet.children())[:-1])
        self.feature_dim = 512

        self.lstm = nn.LSTM(
            input_size=self.feature_dim,
            hidden_size=hidden_size,
            batch_first=True
        )

        self.fc = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        B, T, C, H, W = x.shape
        x = x.view(B * T, C, H, W)

        feats = self.cnn(x).squeeze(-1).squeeze(-1)
        feats = feats.view(B, T, -1)

        lstm_out, _ = self.lstm(feats)
        return self.fc(lstm_out[:, -1, :])

# =========================
# LOAD MODEL (ONCE)
# =========================
MODEL_PATH = "best_phase.pth"
# move model into project root

model = CNNLSTM(NUM_CLASSES).to(DEVICE)
ckpt = torch.load(MODEL_PATH, map_location=DEVICE)
model.load_state_dict(ckpt["model_state_dict"] if "model_state_dict" in ckpt else ckpt)
model.eval()

# =========================
# PREPROCESS
# =========================
transform = T.Compose([
    T.Resize((IMG_SIZE, IMG_SIZE)),
    T.ToTensor(),
    T.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def preprocess(frame):
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    frame = Image.fromarray(frame)
    return transform(frame)

# =========================
# FLASK-CALLABLE FUNCTION
# =========================
def run_phase_detection(video_path):
    """
    Runs phase detection on a video
    Returns timeline of predictions
    """

    if not os.path.exists(video_path):
        raise FileNotFoundError("Video not found")

    cap = cv2.VideoCapture(video_path)
    frame_buffer = deque(maxlen=SEQ_LEN)

    timeline = []
    frame_idx = 0

    with torch.no_grad():
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            frame_idx += 1
            frame_buffer.append(preprocess(frame))

            if len(frame_buffer) < SEQ_LEN:
                continue

            seq = torch.stack(list(frame_buffer)).unsqueeze(0).to(DEVICE)
            logits = model(seq)
            probs = F.softmax(logits, dim=1)
            conf, pred = torch.max(probs, dim=1)

            timeline.append({
                "frame": frame_idx,
                "phase": LABEL_MAP[pred.item()],
                "confidence": round(conf.item(), 3)
            })

    cap.release()

    return {
        "total_frames": frame_idx,
        "timeline": timeline
    }
