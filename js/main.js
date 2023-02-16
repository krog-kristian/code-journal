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
  if (!data.editing) {
    formInput.entryId = data.nextEntryId;
    data.nextEntryId += 1;
    data.entries.unshift(formInput);
    $entryList.prepend(renderEntry(formInput));
  } else {
    formInput.entryId = data.editing.entryId;
    for (var i = 0; i < data.entries.length; i++) {
      if (formInput.entryId === data.entries[i].entryId) {
        data.entries[i] = formInput;
      }
    }
    var $liReplace = document.querySelector('[data-entry-id="' + data.editing.entryId + '"]');
    $liReplace.replaceWith(renderEntry(formInput));
    $formHeading.textContent = 'New Entry';
    data.editing = null;
    $deleteButton.classList.add('hidden');
  }
  $photoImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formJournal.reset();
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
  $image.setAttribute('alt', 'Picture of: ' + entry.title);
  $photoDiv.appendChild($image);
  $listEntry.appendChild($photoDiv);
  var $textDiv = document.createElement('div');
  $textDiv.setAttribute('class', 'column-half');
  var $entryTitle = document.createElement('h3');
  $entryTitle.textContent = entry.title;
  $entryTitle.setAttribute('class', 'space-between');
  var $faPencil = document.createElement('i');
  var $editDiv = document.createElement('div');
  $faPencil.setAttribute('class', 'fa fa-pencil');
  $faPencil.setAttribute('aria-hidden', 'true');
  var $faTag = document.createElement('i');
  $faTag.setAttribute('class', 'fa-sharp fa-solid fa-tag');
  $editDiv.appendChild($faTag);
  $editDiv.appendChild($faPencil);
  $entryTitle.appendChild($editDiv);
  $textDiv.appendChild($entryTitle);
  var $paragraph = document.createElement('p');
  $paragraph.textContent = entry.notes.trim();
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
    var $view = document.querySelector('div[data-view="entries"]');
    $view.setAttribute('class', '');
    data.view = view;
    var $oldView = document.querySelector('div[data-view="entry-form"]');
    $oldView.setAttribute('class', 'hidden');
  } else {
    $view = document.querySelector('div[data-view="entry-form"]');
    $view.setAttribute('class', '');
    data.view = view;
    $oldView = document.querySelector('div[data-view="entries"');
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

// Editing
var $formHeading = document.querySelector('div[data-view="entry-form"] h2');
var $deleteButton = document.querySelector('#delete');

$entryList.addEventListener('click', function () {
  var $selectedEntry = event.target.closest('li');
  var selectedId = $selectedEntry.getAttribute('data-entry-id');
  if (event.target.matches('.fa-pencil')) {
    viewSwap('entry-form');
    for (var i = 0; i < data.entries.length; i++) {
      if (Number(selectedId) === data.entries[i].entryId) {
        data.editing = data.entries[i];
      }
    }
    $formJournal.elements.title.value = data.editing.title;
    $formJournal.elements.photo.value = data.editing.photo;
    $formJournal.elements.notes.value = data.editing.notes;
    $photoImage.setAttribute('src', data.editing.photo);
    $formHeading.textContent = 'Edit Entry';
    $deleteButton.classList.remove('hidden');
  }
  if (event.target.matches('.fa-tag')) {
    // console.log('add a tag!');
    for (i = 0; i < data.entries.length; i++) {
      if (Number(selectedId) === data.entries[i].entryId) {
        var $inputTag = document.createElement('input');
        var $rightDiv = event.target.closest('h3');
        $rightDiv.appendChild($inputTag);
      }
    }
  }
}
);

// Deleting Entries

var $popup = document.querySelector('#popup');

$deleteButton.addEventListener('click', function () {
  $popup.classList.remove('hidden');
}
);

var $cancelButton = document.querySelector('#cancel');
var $confirmButton = document.querySelector('#confirm');

$popup.addEventListener('click', function () {
  if (event.target === $cancelButton) {
    $popup.classList.add('hidden');
  } else if (event.target === $confirmButton) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries.splice(i, 1);
      }
    }
    var $removeLi = document.querySelector('[data-entry-id="' + data.editing.entryId + '"]');
    $removeLi.remove();
    if (data.entries.length === 0) {
      toggleNoEntries();
    }
    $popup.classList.add('hidden');
    viewSwap('entries');
    data.editing = null;
    $formJournal.reset();
    $photoImage.setAttribute('src', 'images/placeholder-image-square.jpg');
    $deleteButton.classList.add('hidden');
    $formHeading.textContent = 'New Entry';
  }
}
);

// Stretch Features

// Search Bar

var $searchBar = document.querySelector('#search');

$searchBar.addEventListener('input', searchAndRender);
var currentIds = [];
var $liLst = document.querySelectorAll('li');

function searchAndRender(event) {
  var $titleList = document.querySelectorAll('h3');
  $liLst = document.querySelectorAll('li');
  for (var i = 0; i < $titleList.length; i++) {
    if (!$titleList[i].textContent.toLowerCase().includes(event.target.value.toLowerCase())) {
      $liLst[i].remove();
    }
  }
  for (var k = 0; k < data.entries.length; k++) {
    if (data.entries[k].title.toLowerCase().includes(event.target.value)) {
      $liLst = document.querySelectorAll('li');
      for (var j = 0; j < $liLst.length; j++) {
        currentIds.push(Number($liLst[j].getAttribute('data-entry-id')));
      }
      if (!currentIds.includes(data.entries[k].entryId)) {
        $entryList.appendChild(renderEntry(data.entries[k]));
      }
    }
  }
  if (event.target.value === '') {
    $liLst = document.querySelectorAll('li');
    for (i = 0; i < $liLst.length; i++) {
      $liLst[i].remove();
    }
    for (i = 0; i < data.entries.length; i++) {
      $entryList.appendChild(renderEntry(data.entries[i]));
    }
  }
  currentIds = [];
}

// Reverse Entries

var $reverseArrows = document.querySelector('.fa-arrows-up-down');

var reverseOrder = false;

$reverseArrows.addEventListener('click', function () {
  if (reverseOrder === false) {
    $liLst = document.querySelectorAll('li');
    for (var i = 0; i < $liLst.length; i++) {
      $liLst[i].remove();
    }
    for (i = data.entries.length - 1; i >= 0; i--) {
      $entryList.appendChild(renderEntry(data.entries[i]));
    }
    reverseOrder = true;
  } else {
    $liLst = document.querySelectorAll('li');
    for (i = 0; i < $liLst.length; i++) {
      $liLst[i].remove();
    }
    for (i = 0; i < data.entries.length; i++) {
      $entryList.appendChild(renderEntry(data.entries[i]));
    }
    reverseOrder = false;
  }
}
);
