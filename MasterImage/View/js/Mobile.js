const imgInput = document.getElementById('upload');
const deleteBtn = document.getElementById('delete');
const imgPreview = document.getElementById('preview');
const uploadLabel = document.getElementById('upload-label');
const fileBar = document.getElementById('filewrapper');
const fileName = document.querySelector('.file-name');
const fileSize = document.querySelector('.file-size');
const uploadArea = document.querySelector('.upload-area');
const submitBtn = document.getElementById('submitMU')
const errorMessage = document.getElementById('error-message');
const MAX_FILE_SIZE_MB = 10;

let selectedFile = null;


deleteBtn.addEventListener('click', removeFile)
imgInput.addEventListener('change', handleFileSelect);


function handleFileSelect(event){
    selectedFile = event.target.files[0];
    if (!selectedFile) {
        uploadArea.style.marginBottom = '0';
        errorMessage.textContent = "!! Make sure to select a file !!"
        uploadLabel.style.borderColor = red;
        return;
    }

    var fileSizeBytes = selectedFile.size;
    fileSizeMB = fileSizeBytes / (1024 * 1024);

    // Validation for file size
    if(fileSizeMB >= MAX_FILE_SIZE_MB){
        uploadArea.style.marginBottom = '0';
        errorMessage.textContent = "!! File should not exceed 10 MB !!"
        errorMessage.style.display = 'block';
        uploadLabel.style.borderColor = '#B71C1C';
        selectedFile=null;
        return;
    } 

    errorMessage.style.display = 'none';
    uploadArea.style.marginBottom = '1rem';
    uploadLabel.style.borderColor = 'black';
    preview(selectedFile);
    showFileBar(selectedFile);
}

function preview(){
    var fileReader = new FileReader;
    fileReader.readAsDataURL(selectedFile);
    fileReader.onload = function() {
        var result = fileReader.result;
        imgPreview.setAttribute('src', result);
        imgPreview.style.display = "flex";
        uploadArea.style.display= "none";
    }
}

function showFileBar (){
    if (selectedFile) {
        fileName.textContent = selectedFile.name;
        fileSize.textContent = fileSizeMB.toFixed(2) + " MB";
        fileBar.style.display = 'flex'; 
    }
}

function removeFile() {
    selectedFile=null;
    imgInput.value = '';
    imgPreview.style.display='none';
    fileBar.style.display = 'none';
    uploadArea.style.display = 'flex';
}

submitBtn.addEventListener('click', async function(event) {
    if (!selectedFile) {
        uploadArea.style.marginBottom = '0';
        errorMessage.textContent = "!! Make sure to select a file first !!"
        errorMessage.style.display = 'block';
        uploadLabel.style.borderColor = '#B71C1C';
        return;
    }

    uploadArea.style.marginBottom = '1rem';
    uploadLabel.style.borderColor = 'black';
    errorMessage.style.display = 'none';
    const formData = new FormData();
    formData.append('image', selectedFile); 

    try {
        submitBtn.textContent = "Uploading..."; // Feedback
                
        const response = await fetch('/upload-endpoint', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("Upload Successful!");
            const filename = selectedFile.name;
            window.location.href= `UploadSuccessfully.html?image=${encodeURIComponent(filename)}`;
        } else {
            alert("Upload failed.");
        }
    } catch (error) {
        console.error(error);
        alert("Error uploading file.");
    } finally {
        submitBtn.textContent = "Submit"; // Reset button text
    }
});