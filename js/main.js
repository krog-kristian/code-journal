// Data entry and storage.
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

// Viewing Entries

function renderEntry(entry) {
  var $listEntry = document.createElement('li');
  $listEntry.setAttribute('class', 'row');
  var $photoDiv = document.createElement('div');
  var $image = document.createElement('img');
  $photoDiv.setAttribute('class', 'column-half entry-photos');
  $image.setAttribute('src', entry.photo);
  $photoDiv.appendChild($image);
  $listEntry.appendChild($photoDiv);
  var $textDiv = document.createElement('div');
  $textDiv.setAttribute('class', 'column-half');
  var $entryTitle = document.createElement('h3');
  $entryTitle.textContent = entry.title;
  $textDiv.appendChild($entryTitle);
  var $paragraph = document.createElement('p');
  $paragraph.textContent = entry.notes;
  $textDiv.appendChild($paragraph);
  $listEntry.appendChild($textDiv);
  return $listEntry;
}

renderEntry();
