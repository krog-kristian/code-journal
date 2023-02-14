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
  $entryList.prepend(renderEntry(formInput));
  viewSwap('entries');
  if ($noEntries.classList.length === 0) {
    toggleNoEntries();
  }
}

// Viewing Entries

function renderEntry(entry) {
  var $listEntry = document.createElement('li');
  $listEntry.setAttribute('class', 'row');
  $listEntry.setAttribute('data-entry-id', entry.entryId);
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
  $entryTitle.setAttribute('class', 'space-between');
  var $faPencil = document.createElement('i');
  $faPencil.setAttribute('class', 'fa fa-pencil');
  $faPencil.setAttribute('aria-hidden', 'true');
  $entryTitle.appendChild($faPencil);
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
  viewSwap(data.view);
  if (data.entries.length === 0) {
    toggleNoEntries();
  }
});

var $noEntries = document.querySelector('div[data-view=entries] .text-cen p');

function toggleNoEntries() {
  if ($noEntries.classList.contains('hidden')) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}

function viewSwap(view) {
  if (view === 'entries') {
    var $view = document.querySelector('div[data-view=entries]');
    $view.setAttribute('class', '');
    data.view = view;
    var $oldView = document.querySelector('div[data-view=entry-form');
    $oldView.setAttribute('class', 'hidden');
  } else {
    $view = document.querySelector('div[data-view=entry-form]');
    $view.setAttribute('class', '');
    data.view = view;
    $oldView = document.querySelector('div[data-view=entries');
    $oldView.setAttribute('class', 'hidden');
  }
}

var $entriesAnchor = document.querySelector('.column-full > .header-link');

$entriesAnchor.addEventListener('click', function () {
  var viewTarget = $entriesAnchor.getAttribute('data-view');
  viewSwap(viewTarget);
});

var $entriesFormAnchor = document.querySelector('#new-entry');

$entriesFormAnchor.addEventListener('click', function () {
  var viewTarget = $entriesFormAnchor.getAttribute('data-view');
  viewSwap(viewTarget);
});
