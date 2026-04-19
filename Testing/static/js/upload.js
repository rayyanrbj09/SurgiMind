function initUpload() {
    console.log("Upload Report page initialized.");
    // This is where you would initialize file drag-and-drop setup
}

async function startProcessing() {
    const fileInput = document.getElementById("report-upload");
    if (!fileInput.files.length) return;

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    document.getElementById("summary-status").innerText =
        "Analyzing report, please wait...";

    const res = await fetch("/file_upload", {
        method: "POST",
        body: formData
    });

    const data = await res.json();

    if (data.success && data.summary) {
        document.getElementById("summary-status").innerText =
            "AI-generated summary";

        document.getElementById("summary-content").innerText =
            data.summary;
    } else {
        document.getElementById("summary-status").innerText =
            "No summary available.";
    }
}


// Expose init function
window.initUpload = initUpload;
window.startProcessing = startProcessing;