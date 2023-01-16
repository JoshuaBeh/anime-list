/* exported data */

var userData = {
  userTarget: '',
  animeList: [],
  characterList: [],
  view: 'top-anime',
  currentListItem: '',
  currentCharacter: ''
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
