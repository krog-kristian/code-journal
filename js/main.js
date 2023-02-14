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

var $entryList = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', function () {
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntry(data.entries[i]));
  }
});

var $noEntries = document.querySelector('div[data-view=entries] .text-cen p');

function toggleNoEntries() {
  if ($noEntries.classList[0] === undefined) {
    $noEntries.setAttribute('class', 'hidden');
  } else {
    $noEntries.setAttribute('class', '');
  }
}

function viewSwap(view) {
  if (view === 'entries') {
    var $view = document.querySelector('[data-view=entries]');
    $view.setAttribute('class', '');
    data.view = view;
    var $oldView = document.querySelector('[data-view=entry-form');
    $oldView.setAttribute('class', 'hidden');
  } else {
    $view = document.querySelector('[data-view=entry-form]');
    $view.setAttribute('class', '');
    data.view = view;
    $oldView = document.querySelector('[data-view=entries');
    $oldView.setAttribute('class', 'hidden');
  }
}

toggleNoEntries();
viewSwap();
