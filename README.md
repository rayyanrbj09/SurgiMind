# Surgical Mind

**Surgical Mind** is an AI-powered system for **surgical workflow analysis**. It integrates medical report detection, surgical tool recognition, and procedural workflow analysis to support precision, safety, and efficiency in the operating room.

## Features

* 📄 **Report Detection & Summarization** – Extracts and summarizes key surgical reports.
* 🔧 **Tool Detection** – Identifies instruments in real time during operations.
* 📊 **Workflow Analysis** – Measures surgical areas, recommends procedures, and maps the workflow.

## Tech Stack

* **AI / ML**: PyTorch, YOLOv8, LSTM/GRU
* **Computer Vision**: OpenCV
* **Backend**: Flask / FastAPI
* **Frontend**: Streamlit or React.js
* **Deployment**: Docker, AWS/GCP/Heroku

## Project Pipeline

1. **Data Preparation** – Collect and preprocess surgical datasets.
2. **Model Training** – Train models for tool detection and workflow classification.
3. **Integration** – Build a modular pipeline combining detection and analysis.
4. **Visualization** – Interactive interface with real-time annotations.
5. **Deployment** – Dockerized backend with frontend app for demonstrations.

## Use Cases

* Assisting surgeons with **real-time decision support**.
* Improving **surgical training** with automated insights.
* Enhancing **patient safety** through workflow monitoring.

## Installation

```bash
git clone https://github.com/your-username/surgical-mind.git
cd surgical-mind
pip install -r requirements.txt
```

## Usage

```bash
# Run backend
python app.py  

# Run frontend (example: Streamlit)
streamlit run ui.py  
```

Upload surgical videos/reports to see **tool detection, report summaries, and workflow insights** in action.

## Future Work

* Gesture recognition for advanced workflow mapping
* Integration with robotic-assisted surgery systems
* Enhanced visualization dashboards

## Contributors

👤 **MOHD RAYYAN BIN MOHD JAWEED**
B.Tech Student, JNTUH | AI/ML Enthusiast

**SYED SAAD AHMED**
B.Tech student, JNTUH | AI/ML Enthusiast

**MOHAMMED SOFIYAAN**
B.Tech Student, JNTUH | AI/ML Enthusiast


