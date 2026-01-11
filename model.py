import torch
import torch.nn as nn
from torchvision import models


class CNNLSTM(nn.Module):
    def __init__(self, num_phases: int):
        super().__init__()

        # ---------------- CNN BACKBONE ----------------
        backbone = models.resnet18(
            weights=models.ResNet18_Weights.IMAGENET1K_V1
        )

        # Freeze CNN initially
        for param in backbone.parameters():
            param.requires_grad = False

        self.cnn = nn.Sequential(
            *list(backbone.children())[:-1]
        )  # (B*T, 512, 1, 1)

        # ---------------- LSTM ----------------
        self.lstm = nn.LSTM(
            input_size=512,
            hidden_size=256,
            num_layers=2,
            dropout=0.3,
            batch_first=True
        )

        self.dropout = nn.Dropout(0.5)

        # ---------------- CLASSIFIER ----------------
        self.fc = nn.Linear(256, num_phases)

    def forward(self, x):
        """
        x shape: (B, T, 3, H, W)
        """
        B, T, C, H, W = x.shape

        x = x.view(B * T, C, H, W)
        feats = self.cnn(x)              # (B*T, 512, 1, 1)
        feats = feats.view(B, T, 512)    # (B, T, 512)

        lstm_out, _ = self.lstm(feats)

        out = self.dropout(lstm_out[:, -1, :])
        logits = self.fc(out)
        return logits
