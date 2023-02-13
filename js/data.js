/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal', dataJSON);
});

if (localStorage.getItem('code-journal')) {
  var previousData = localStorage.getItem('code-journal');
  data = JSON.parse(previousData);
}
