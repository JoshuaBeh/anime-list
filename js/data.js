/* exported data */

let userData = {
  userTarget: '',
  animeList: [],
  characterList: [],
  view: 'top-anime',
  currentListItem: '',
  currentCharacter: ''
};

function beforeunloadHandler(event) {
  const dataJSON = JSON.stringify(userData);
  window.localStorage.setItem('animelist-local-storage', dataJSON);
}
window.addEventListener('beforeunload', beforeunloadHandler);

window.addEventListener('pagehide', beforeunloadHandler);

const localStorageJson = window.localStorage.getItem('animelist-local-storage');

if (localStorageJson !== null) {
  userData = JSON.parse(localStorageJson);
}
