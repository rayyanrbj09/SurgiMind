import cv2
import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision.models as models
import torchvision.transforms as T
from PIL import Image
from collections import deque


# =========================
# CONFIG
# =========================
MODEL_PATH = r"C:\Users\Rayyan\Downloads\model (1)\best_model.pth"
VIDEO_PATH = r"C:\Users\Rayyan\Downloads\vid01.mp4"
SEQ_LEN = 10          # MUST match training
NUM_CLASSES = 7       # MUST match training
IMG_SIZE = 224

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# =========================
# LABEL MAP (EDIT IF NEEDED)
# =========================
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
        # x: (B, T, C, H, W)
        B, T, C, H, W = x.shape
        x = x.view(B * T, C, H, W)

        feats = self.cnn(x).squeeze(-1).squeeze(-1)
        feats = feats.view(B, T, -1)

        lstm_out, _ = self.lstm(feats)
        return self.fc(lstm_out[:, -1, :])

# =========================
# LOAD MODEL
# =========================
model = CNNLSTM(NUM_CLASSES).to(DEVICE)

ckpt = torch.load(MODEL_PATH, map_location=DEVICE)
model.load_state_dict(ckpt["model_state_dict"] if "model_state_dict" in ckpt else ckpt)

model.eval()
print("✅ Model loaded")

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
# VIDEO INFERENCE
# =========================
cap = cv2.VideoCapture(VIDEO_PATH)
assert cap.isOpened(), "❌ Cannot open video"

frame_buffer = deque(maxlen=SEQ_LEN)

with torch.no_grad():
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame_buffer.append(preprocess(frame))

        if len(frame_buffer) < SEQ_LEN:
            cv2.imshow("Inference", frame)
            if cv2.waitKey(1) & 0xFF == 27:
                break
            continue

        seq = torch.stack(list(frame_buffer)).unsqueeze(0).to(DEVICE)

        logits = model(seq)
        probs = F.softmax(logits, dim=1)
        conf, pred = torch.max(probs, dim=1)

        label_id = pred.item()
        label_name = LABEL_MAP[label_id]
        confidence = conf.item()

        cv2.putText(
            frame,
            f"Pred: {label_name} ({confidence:.2f})",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.9,
            (0, 255, 0),
            2
        )

        cv2.imshow("Inference", frame)
        if cv2.waitKey(1) & 0xFF == 27:
            break

cap.release()
cv2.destroyAllWindows()

print("Inference finished")
