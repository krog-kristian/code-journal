var $photoImage = document.querySelector('.journal-photo > img');

var $inputURL = document.querySelector('#photo');

$inputURL.addEventListener('input', function () {
  $photoImage.setAttribute('src', event.target.value);
});

var $form = document.querySelector('form');

$form.addEventListener('submit', save);

function save(event) {
  event.preventDefault();
  var formInput = {};
  formInput.title = $form.elements.title.value;
  formInput.photo = $form.elements.photo.value;
  formInput.notes = $form.elements.notes.value;
  formInput.entryId = data.nextEntryId;
}
