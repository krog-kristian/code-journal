var $photoImage = document.querySelector('.journal-photo > img');

var $inputURL = document.querySelector('#photo');

$inputURL.addEventListener('input', function () {
  $photoImage.setAttribute('src', event.target.value);
});

var $formJournal = document.querySelector('form');

$formJournal.addEventListener('submit', save);

function save(event) {
  event.preventDefault();
  var formInput = {};
  formInput.title = $formJournal.elements.title.value;
  formInput.photo = $formJournal.elements.photo.value;
  formInput.notes = $formJournal.elements.notes.value;
  formInput.entryId = data.nextEntryId;
  data.nextEntryId += 1;
  data.entries.unshift(formInput);
  $photoImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formJournal.reset();
}
