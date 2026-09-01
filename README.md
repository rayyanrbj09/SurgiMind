# SurgiMind — Final Project README

This repository contains the implemented Surgical Intelligence platform. After reviewing the code across the active project history, the working implementation is centered on a Flask web app that performs three main AI tasks:

- Surgical tool detection on video frames
- Surgical phase recognition from video sequences
- Medical report extraction and summarization from uploaded PDFs

The trained detection weights are packaged in the model bundle used for inference. In the live repo, the inference artifacts are available as the root-level weights `best_tool.pt` and `best_phase.pth`; these are the working equivalents of a packaged `model.tar.gz` export.

## What is implemented

### 1. Surgical tool detection

Implemented with YOLOv8 in `train.py` and loaded in `app.py`:

- `tool_model = YOLO("best_tool.pt")`
- Video upload is supported through the Flask app
- Detection can be triggered from `/api/detect_tools`
- Output is saved under the static detection runs folder and exposed as a video result

This is the live tool-detection path in the repository and is the primary object-detection capability.

### 2. Surgical phase recognition

Implemented with a CNN-LSTM sequence model:

- `model.py` defines `CNNLSTM`
- A ResNet-18 backbone is used to extract features from each frame
- A temporal LSTM captures sequence context across 10-frame windows
- The final classifier predicts one of 7 surgical phases

The training pipeline is in:

- `train_phase.py`
- `phase_dataset.py`
- `model.py`

Inference is exposed by:

- `phase_detection_service.py`
- `app.py` route `/api/detect_phase`

The project loads the model weights from `best_phase.pth`.

### 3. Medical report extraction and summarization

The PDF workflow is implemented in:

- `reports_service.py`
- `summary.py`
- `main.py`

It does the following:

- Extracts text from PDF pages
- Extracts tables from PDF pages
- Runs OCR on rendered document pages
- Combines the extracted text and OCR into one payload
- Sends the combined content to a Hugging Face summarization pipeline (`facebook/bart-large-cnn`)

This is connected to the app through the PDF summarization API in `app.py`.

### 4. Web application and uploads

The Flask app in `app.py` includes:

- Google/GitHub authentication setup
- Login and dashboard pages
- Upload flow for videos and PDFs
- Real-time video streaming via `uploaded_video_stream.py`
- API endpoints for:
  - PDF summary generation
  - tool detection
  - surgical phase detection

This is the main user-facing system implemented in the repository.

## Detection models in the model bundle

The model package used by the system contains the trained inference artifacts used by the app:

- `best_tool.pt` — YOLOv8 surgical tool detector
- `best_phase.pth` — CNN-LSTM phase classifier

The project also includes the training configuration for the detection pipeline:

- `data.yaml` — YOLO dataset config
- `train.py` — YOLO training entry point
- `train_phase.py` — phase-training entry point
- `phase_dataset.py` — sequence dataset builder
- `model.py` — model architecture definition

The expected model package/export can therefore be thought of as a `model.tar.gz`-style archive containing these detector weights and any supporting metadata.

## Surgical tool classes and phase categories

### Tool detection

The object-detection pipeline is trained for 7 tool categories in the dataset config:

- Tool_0
- Tool_1
- Tool_2
- Tool_3
- Tool_4
- Tool_5
- Tool_6

This is configured in `data.yaml`.

### Phase detection

The phase model classifies 7 laparoscopic surgery phases:

- Preparation
- Calot Triangle Dissection
- Clipping & Cutting
- Gallbladder Dissection
- Gallbladder Packaging
- Cleaning & Coagulation
- Gallbladder Retraction

This is defined in `phase_detection_service.py` and `model.py`.

## Project structure

- `app.py` — Flask application and API routes
- `main.py` — summary generation entry point
- `phase_detection_service.py` — phase inference logic
- `reports_service.py` — PDF extraction logic
- `summary.py` — summarization model wrapper
- `train.py` — YOLO tool model training
- `train_phase.py` — phase model training
- `phase_dataset.py` — frame-sequence dataset loader
- `model.py` — CNN-LSTM network architecture
- `uploaded_video_stream.py` — video streaming support
- `best_tool.pt` — trained tool detector
- `best_phase.pth` — trained phase detector
- `assets/` — sample plots and evaluation visuals
- `static/` and `templates/` — web frontend

## How to run

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the application:

```bash
python app.py
```

Then access the Flask UI and upload:

- a surgical video for tool or phase detection
- a PDF for report extraction and summary generation

## Repository status

Across the checked branches, the live implementation is present in the main working branch. The branch variants reviewed during the repo audit primarily contained README placeholders and did not add working inference code beyond the core project already present in the active branch.

## Summary

The implemented system is a practical surgical AI platform that combines:

- real-time surgical tool detection using YOLOv8
- surgical phase classification using a CNN-LSTM model
- PDF-based medical report extraction and summarization
- a Flask-based interface for upload, analysis, and dashboard use

This is the current state of the codebase and the final supported implementation in this repository.


