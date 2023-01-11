/* exported data */
// eslint-disable-next-line no-unused-vars
var userData = {
  animeList: [],
  view: 'top-anime',
  nextListItem: 1
};

function beforeunloadHandler(event) {
  var dataJSON = JSON.stringify(userData);
  window.localStorage.setItem('animelist-local-storage', dataJSON);
}
window.addEventListener('beforeunload', beforeunloadHandler);

var localStorageJson = window.localStorage.getItem('animelist-local-storage');

if (localStorageJson !== null) {
  userData = JSON.parse(localStorageJson);
}
