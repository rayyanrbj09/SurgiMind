/**
 * Initializes the upload page.
 */
function initUpload() {
    console.log("Upload Report page initialized.");
    
    // Find the "Upload from Folder" button
    const uploadReportButton = document.getElementById('upload_report');
    
    // Find the hidden file input
    const fileInput = document.getElementById('report-upload');

    // Add click listener to the button to trigger the hidden file input
    if (uploadReportButton && fileInput) {
        uploadReportButton.addEventListener('click', () => {
            fileInput.click();
        });
    }
}

/**
 * This function is called by the 'onchange' event of the file input.
 * It now handles the entire file upload process.
 */
async function startProcessing() {
    // We assume showToast is available from shared-app.js
    // If showToast is not defined, these will gracefully fail.
    const toast = (message, type = 'info') => {
        if (typeof showToast === 'function') {
            showToast(message, type);
        } else {
            console.log(`Toast (${type}): ${message}`);
        }
    };

    const fileInput = document.getElementById('report-upload');
    
    // Check if a file was actually selected
    if (!fileInput.files || fileInput.files.length === 0) {
        console.log("No file selected.");
        return;
    }

    const file = fileInput.files[0];
    
    // Show processing message
    toast("File selected. Processing report...", 'info');

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);

    try {
        // Send the file to the /file_upload endpoint
        const response = await fetch('/file_upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // On success, show the success message
            toast(`Successfully uploaded: ${data.filename}`, 'success');
            // You could add a redirect here, e.g.:
            // window.location.href = '/dashboard';
        } else {
            // On controlled server error (e.g., wrong file type)
            toast(`Upload failed: ${data.message}`, 'error');
        }
    } catch (error) {
        // On network or other unexpected fetch error
        console.error('Upload error:', error);
        toast('An unexpected error occurred. Please try again.', 'error');
    }

    // Reset the file input so the user can upload another file
    // (and the 'onchange' event will fire again if they select the same file)
    fileInput.value = '';
}

// Expose init and startProcessing functions to the global window object
// so they can be called from the HTML's 'onload' and 'onchange' attributes.
window.initUpload = initUpload;
window.startProcessing = startProcessing;
