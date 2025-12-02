const params = new URLSearchParams(window.location.search);
const imageName = params.get('image');

if (imageName) {
    document.getElementById('uploaded-img').src = '../assets/uploads/' + imageName;
}