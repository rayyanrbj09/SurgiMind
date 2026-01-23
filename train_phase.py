import os
import argparse
import json

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torch.utils.tensorboard import SummaryWriter

import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, classification_report

from phase_dataset import PhaseSequenceDataset
from model import CNNLSTM


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--epochs", type=int, default=30)
    parser.add_argument("--batch-size", type=int, default=4)
    parser.add_argument("--seq-len", type=int, default=10)
    parser.add_argument("--lr", type=float, default=1e-4)
    parser.add_argument("--num-phases", type=int, default=7)
    return parser.parse_args()


def main():
    args = parse_args()
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print("Using device:", device)

    train_root = os.environ.get("SM_CHANNEL_TRAIN", "./data/train")
    val_root = os.environ.get("SM_CHANNEL_VAL", "./data/val")
    model_dir = os.environ.get("SM_MODEL_DIR", "./models")
    os.makedirs(model_dir, exist_ok=True)

    writer = SummaryWriter(log_dir=os.path.join(model_dir, "runs"))

    train_dirs = [
        os.path.join(train_root, d)
        for d in os.listdir(train_root)
        if d.startswith("vid")
    ]
    val_dirs = [
        os.path.join(val_root, d)
        for d in os.listdir(val_root)
        if d.startswith("vid")
    ]

    train_ds = PhaseSequenceDataset(train_dirs, args.seq_len)
    val_ds = PhaseSequenceDataset(val_dirs, args.seq_len)

    train_loader = DataLoader(
        train_ds, batch_size=args.batch_size,
        shuffle=True, num_workers=4
    )
    val_loader = DataLoader(
        val_ds, batch_size=args.batch_size,
        shuffle=False, num_workers=4
    )

    model = CNNLSTM(args.num_phases).to(device)

    class_weights = torch.tensor(
        train_ds.class_weights,
        device=device
    )

    criterion = nn.CrossEntropyLoss(
        weight=class_weights,
        label_smoothing=0.1
    )

    optimizer = optim.Adam(
        filter(lambda p: p.requires_grad, model.parameters()),
        lr=args.lr
    )

    scheduler = optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, mode="min", factor=0.5, patience=3
    )

    best_val_loss = float("inf")

    for epoch in range(args.epochs):
        model.train()
        train_loss = 0.0

        for x, y in train_loader:
            x, y = x.to(device), y.to(device)

            optimizer.zero_grad()
            loss = criterion(model(x), y)
            loss.backward()
            optimizer.step()

            train_loss += loss.item()

        train_loss /= len(train_loader)

        
        model.eval()
        val_loss = 0.0
        correct = total = 0
        all_preds, all_labels = [], []

        with torch.no_grad():
            for x, y in val_loader:
                x, y = x.to(device), y.to(device)
                logits = model(x)
                loss = criterion(logits, y)

                val_loss += loss.item()
                preds = logits.argmax(1)

                correct += (preds == y).sum().item()
                total += y.size(0)

                all_preds.extend(preds.cpu().numpy())
                all_labels.extend(y.cpu().numpy())

        val_loss /= len(val_loader)
        val_acc = correct / total

        scheduler.step(val_loss)

        
        writer.add_scalar("Loss/Train", train_loss, epoch)
        writer.add_scalar("Loss/Val", val_loss, epoch)
        writer.add_scalar("Accuracy/Val", val_acc, epoch)
        writer.add_scalar(
            "LR", optimizer.param_groups[0]["lr"], epoch
        )

        print(
            f"Epoch [{epoch+1}/{args.epochs}] "
            f"Train {train_loss:.4f} "
            f"Val {val_loss:.4f} "
            f"Acc {val_acc:.4f}"
        )

        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save(
                model.state_dict(),
                os.path.join(model_dir, "best_model.pth")
            )

    # -------- CONFUSION MATRIX --------
    cm = confusion_matrix(all_labels, all_preds)
    fig, ax = plt.subplots(figsize=(6, 6))
    ax.imshow(cm, cmap="Blues")
    writer.add_figure("ConfusionMatrix", fig)
    plt.close(fig)

    # -------- REPORT --------
    report = classification_report(all_labels, all_preds, digits=4)
    with open(
        os.path.join(model_dir, "classification_report.txt"), "w"
    ) as f:
        f.write(report)

    writer.close()
    print("Training complete")


if __name__ == "__main__":
    main()
