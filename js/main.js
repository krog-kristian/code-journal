var photoImage = document.querySelector('.journal-photo > img');

var inputURL = document.querySelector('#photo');

inputURL.addEventListener('input', function () {
  photoImage.setAttribute('src', event.target.value);
});
