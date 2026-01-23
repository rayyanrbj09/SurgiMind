import cv2
from ultralytics import YOLO
import os


model = YOLO("best_tool.pt")


def stream_uploaded_video(video_path):
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        raise RuntimeError("Cannot open video")

    while True:
        success, frame = cap.read()
        if not success:
            break

        # YOLO inference (like real_timedemo)
        results = model(frame, conf=0.3, verbose=False)
        annotated_frame = results[0].plot()

        # Encode frame
        ret, buffer = cv2.imencode(".jpg", annotated_frame)
        frame_bytes = buffer.tobytes()

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + frame_bytes +
            b"\r\n"
        )

    cap.release()
