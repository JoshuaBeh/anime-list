/* global userData */
const $topAnimeList = document.querySelector('#top-anime');
const $arrowDown = document.querySelector('.fa-arrow-down');
const $backToTop = document.querySelector('.back-to-top');
const $topOfPage = document.querySelector('.anchor-background');
const $searchAnchor = document.querySelector('#search-pop-up');
const $outerDiv = document.querySelector('.search-pop-up');
const $topAnimeView = document.querySelector('[data-view="top-anime"]');
const $searchResultView = document.querySelector('[data-view="search-result"]');
const $popUpSearch = document.querySelector('.pop-up-search');
const $searchInput = document.querySelector('.search-input');
const $searchButton = document.querySelector('#search-button');
const $addButton = document.querySelector('.add-button');
const $searchAppend = document.querySelector('#search-append');
const $animeNavAnchor = document.querySelector('.anime');
const $listNavAnchor = document.querySelector('.list-anchor');
const $selectedAnimeView = document.querySelector('[data-view="selected-anime"]');
const $animeListView = document.querySelector('[data-view="anime-list"]');
const $selectedAnimeCharactersView = document.querySelector('[data-view="selected-anime-characters"]');
const $characterListView = document.querySelector('[data-view="character-list"]');
const $ulAnimeList = document.querySelector('#anime-list');
const $popUpList = document.querySelector('.pop-up-list');
const $saveButton = document.querySelector('.save-button');
const $selectedAnimeCharacters = document.querySelector('#selected-anime-characters');
const $charactersButton = document.querySelector('.characters-button');
const $characterList = document.querySelector('#character-list');
const $characterNavAnchor = document.querySelector('.characters-anchor');
const $popUpCharacters = document.querySelector('.pop-up-characters');
const $popUpH1 = document.querySelector('.pop-up-h1');
const $noButton = document.querySelector('.no-button');
const $yesButton = document.querySelector('.yes-button');
const $form = document.querySelector('form');
const $topAnimeLoading = document.querySelector('#top-anime-loading');
const $searchResultLoading = document.querySelector('#search-result-loading');
const $searchResultFalse = document.querySelector('#search-result-false');
const $searchResultError = document.querySelector('#search-result-error');
const $selectedCharactersLoading = document.querySelector('#selected-characters-loading');
const $selectedCharactersFalse = document.querySelector('#selected-characters-false');
const $noAnime = document.querySelector('.no-anime');
let userSearchInput = '';
let pageNumber = 1;

let selectedAnimeInfo = {
  img: '',
  score: 0,
  myScore: 0,
  id: 0,
  title: '',
  episodes: 0,
  progress: 0,
  inList: false
};

let selectedAnimeCharactersInfo = {
  mal_id: 0,
  name: '',
  img: ''
};

window.addEventListener('offline', function (event) {
  if (!navigator.onLine) {
    $searchResultLoading.classList.add('hidden');
    $searchResultError.className = 'white';
    $topAnimeView.classList.add('hidden');
    $searchResultView.classList.add('hidden');
    $selectedAnimeView.classList.add('hidden');
    $animeListView.classList.add('hidden');
    $selectedAnimeCharactersView.add('hidden');
    $characterListView.add('hidden');
  }
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
});

$animeNavAnchor.addEventListener('click', function () {
  viewSwap('top-anime');
});

$listNavAnchor.addEventListener('click', function () {
  if (userData.animeList.length === 0) {
    $noAnime.classList.remove('hidden');
    viewSwap('anime-list');
  } else {
    $noAnime.classList.add('hidden');
    $ulAnimeList.replaceChildren();
    loadAnimeList();
    viewSwap('anime-list');
  }
});

$characterNavAnchor.addEventListener('click', function () {
  if (userData.characterList.length === 0) {
    $characterList.replaceChildren();
    const centerH2 = document.createElement('div');
    centerH2.className = 'col-full center';
    const h2 = document.createElement('h2');
    h2.className = 'white no-characters-text';
    h2.textContent = 'No characters yet, go add some!';
    centerH2.appendChild(h2);
    $characterList.appendChild(centerH2);
    viewSwap('character-list');
    return $characterList;
  } else {
    $characterList.replaceChildren();
    loadCharacterList();
    viewSwap('character-list');
  }
  $characterList.replaceChildren();
  loadCharacterList();
  viewSwap('character-list');
});

function renderTopAnime(response, i) {
  const li = document.createElement('li');
  li.setAttribute('id', response[i].mal_id);

  const rowDiv = document.createElement('div');
  rowDiv.className = 'row top-background';
  li.appendChild(rowDiv);

  const col20Div = document.createElement('div');
  col20Div.className = 'col-20 center';
  rowDiv.appendChild(col20Div);

  const img = document.createElement('img');
  img.setAttribute('src', response[i].images.jpg.small_image_url);
  img.className = 'top-image';
  col20Div.appendChild(img);

  const col80Div = document.createElement('div');
  col80Div.className = 'col-80 inline';
  rowDiv.appendChild(col80Div);

  const title = document.createElement('a');
  title.className = 'top-titles';
  title.textContent = response[i].title;
  col80Div.appendChild(title);

  const h1Score = document.createElement('h1');
  h1Score.className = 'top-scores inline star-hide';
  if (response[i].score.toString().length === 3) {
    h1Score.textContent = response[i].score + '0';
  } else {
    h1Score.textContent = response[i].score;
  }
  col80Div.appendChild(h1Score);

  const iStar = document.createElement('i');
  iStar.className = 'fa-solid fa-star';
  h1Score.prepend(iStar);
  $topAnimeList.appendChild(li);

  return $topAnimeList;
}

function topAnimeGet() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/top/anime?page=' + pageNumber);
  xhr.responseType = 'json';
  $topAnimeLoading.classList.remove('hidden');
  xhr.addEventListener('load', function () {
    const response = xhr.response.data;
    if (!response) {
      $topAnimeLoading.classList.add('hidden');
      return false;
    }
    for (let i = 0; i < response.length; i++) {
      renderTopAnime(response, i);
    }
    $topAnimeLoading.classList.add('hidden');
  });
  xhr.send();
}
topAnimeGet();

$arrowDown.addEventListener('click', function (event) {
  pageNumber++;
  topAnimeGet();
  return pageNumber;
});

$backToTop.addEventListener('click', function (event) {
  $topOfPage.scrollIntoView();
});

function searchPopUpHandler(event) {
  $outerDiv.classList.add('pop-up-background');
  $popUpSearch.classList.remove('hidden');
}
$searchAnchor.addEventListener('click', searchPopUpHandler);

$outerDiv.addEventListener('click', function () {
  $outerDiv.classList.remove('pop-up-background');
  $popUpSearch.classList.add('hidden');
  $popUpCharacters.classList.add('hidden');
  $popUpList.classList.add('hidden');
});

function removeSearchResults() {
  $searchAppend.replaceChildren();
}

function removeSelectedAnimeCharacters() {
  $selectedAnimeCharacters.replaceChildren();
}

function searchResultGet() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/anime?q=' + userSearchInput + '&sfw');
  xhr.responseType = 'json';
  $searchResultFalse.className = 'white hidden';
  $searchResultError.className = 'white hidden';
  $searchResultLoading.classList.remove('hidden');
  xhr.addEventListener('load', function () {
    removeSearchResults();
    const response = xhr.response.data;
    const status = xhr.status;
    if (status >= 400) {
      $searchResultLoading.classList.add('hidden');
      $searchResultError.className = 'white';
    }
    if (!response || response.length === 0) {
      $searchResultLoading.classList.add('hidden');
      $searchResultFalse.className = 'white';
      return false;
    }
    for (let i = 0; i < response.length; i++) {
      renderSearchResult(response, i);
    }
    $searchResultLoading.classList.add('hidden');
  });
  xhr.send();
}

$searchInput.addEventListener('input', function (event) {
  userSearchInput = event.target.value;
  return userSearchInput;
});

$searchButton.addEventListener('click', function () {
  searchResultGet();
  viewSwap('search-result');
  $outerDiv.classList.remove('pop-up-background');
  $popUpSearch.classList.add('hidden');
});

$searchInput.addEventListener('keyup', function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    $searchButton.click();
  }
});

function renderSearchResult(response, i) {
  if (response[i].images.jpg.image_url !== 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {

    const col5025div = document.createElement('div');
    col5025div.className = 'col-50-25 center';
    col5025div.setAttribute('id', response[i].mal_id);
    $searchAppend.appendChild(col5025div);

    const imgDiv = document.createElement('div');
    imgDiv.className = 'search-img-margin';
    col5025div.appendChild(imgDiv);

    const img = document.createElement('img');
    img.className = 'search-result-img';
    img.setAttribute('src', response[i].images.jpg.image_url);
    imgDiv.appendChild(img);

    const divForTitle = document.createElement('div');
    divForTitle.className = 'center search-title-div';
    imgDiv.appendChild(divForTitle);

    const anchorTitle = document.createElement('a');
    anchorTitle.className = 'search-title';
    if (response[i].title.length > 15) {
      anchorTitle.textContent = response[i].title.split('').splice(0, 15).join('') + '...';
    } else {
      anchorTitle.textContent = response[i].title;
    }
    divForTitle.appendChild(anchorTitle);

    return $searchAppend;
  }
}

const $selectedTitle = document.querySelector('.selected-title');
const $selectedPicture = document.querySelector('.selected-picture');
const $score = document.querySelector('#score');
const $episodes = document.querySelector('#episodes');
const $rank = document.querySelector('#rank');
const $premiered = document.querySelector('#premiered');
const $status = document.querySelector('#status');
const $type = document.querySelector('#type');
const $synopsis = document.querySelector('#synopsis');
function selectedAnimeGet(userTarget) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/anime/' + userTarget);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const response = xhr.response.data;
    checkDataForButton(response);
    selectedAnimeInfo = {};
    selectedAnimeInfo.img = response.images.jpg.small_image_url;
    selectedAnimeInfo.score = response.score;
    selectedAnimeInfo.id = response.mal_id;
    selectedAnimeInfo.episodes = response.episodes;
    selectedAnimeInfo.title = response.title;
    selectedAnimeInfo.type = response.type;
    selectedAnimeInfo.inList = true;
    selectedAnimeInfo.myScore = 0;
    selectedAnimeInfo.progress = 0;

    $selectedTitle.textContent = response.title;
    $selectedPicture.setAttribute('src', response.images.jpg.large_image_url);
    const starIcon = document.createElement('i');
    starIcon.setAttribute('id', 'star-fix');
    starIcon.className = 'fa-solid fa-star';
    $score.textContent = response.score;
    $score.prepend(starIcon);
    $episodes.textContent = response.episodes;
    $rank.textContent = response.rank;
    $premiered.textContent = response.aired.prop.from.year;
    if (response.airing === true) {
      $status.textContent = 'Currently Airing';
    } else {
      $status.textContent = 'Finished';
    }
    $type.textContent = response.type;
    $synopsis.textContent = response.synopsis;
  });
  xhr.send();
}

function userSelectAnimeHandler(event) {
  const closestSelectedDiv = event.target.closest('.col-50-25');
  const closestID = closestSelectedDiv.getAttribute('id');
  userData.userTarget = closestID;
  const userTarget = closestID;
  selectedAnimeGet(userTarget);
  viewSwap('selected-anime');
  return userData.userTarget;
}
$searchAppend.addEventListener('click', userSelectAnimeHandler);

function userSelectTopAnimeHandler(event) {
  const closestListItem = event.target.closest('li');
  const userTarget = closestListItem.getAttribute('id');
  userData.userTarget = userTarget;
  selectedAnimeGet(userTarget);
  viewSwap('selected-anime');
  return userData.userTarget;
}
$topAnimeList.addEventListener('click', userSelectTopAnimeHandler);

function addButtonHandler(event) {
  const userDataArr = userData.animeList;
  let trueOrFalse = true;
  for (let i = 0; i < userDataArr.length; i++) {
    if (userDataArr[i].id === selectedAnimeInfo.id) {
      trueOrFalse = false;
      userDataArr.splice(i, 1);
      $addButton.setAttribute('id', 'not-inlist');
      $addButton.textContent = 'ADD';
      break;
    }
  }
  if (trueOrFalse === true) {
    userDataArr.unshift(selectedAnimeInfo);
    $addButton.setAttribute('id', 'inlist');
    $addButton.textContent = 'IN LIST';
  }
}
$addButton.addEventListener('click', addButtonHandler);

function checkDataForButton(response) {
  const userDataArr = userData.animeList;
  let trueOrFalse = false;
  for (let i = 0; i < userDataArr.length; i++) {
    if (userDataArr[i].id === response.mal_id) {
      trueOrFalse = true;
      break;
    }
  }
  if (trueOrFalse === true) {
    $addButton.setAttribute('id', 'inlist');
    $addButton.textContent = 'IN LIST';
  } else {
    $addButton.setAttribute('id', 'not-inlist');
    $addButton.textContent = 'ADD';
  }
}

function renderAnimeList(userData) {
  const li = document.createElement('li');
  li.setAttribute('class', userData.id);

  const outerRowDiv = document.createElement('div');
  outerRowDiv.className = 'row center top-background';
  li.appendChild(outerRowDiv);

  const col20Div = document.createElement('div');
  col20Div.className = 'col-20-list';
  outerRowDiv.appendChild(col20Div);

  const img = document.createElement('img');
  img.className = 'anime-list-img';
  img.setAttribute('src', userData.img);
  col20Div.appendChild(img);

  const col80Div = document.createElement('div');
  col80Div.className = 'col-80-list white font-2';
  outerRowDiv.appendChild(col80Div);

  const innerRowDiv = document.createElement('div');
  innerRowDiv.className = 'row';
  col80Div.appendChild(innerRowDiv);

  const colFullDiv = document.createElement('div');
  colFullDiv.className = 'col-full block';
  innerRowDiv.appendChild(colFullDiv);

  const h3 = document.createElement('h3');
  h3.className = 'test-margin width-list-title';
  h3.textContent = userData.title;
  colFullDiv.appendChild(h3);

  const inputDiv = document.createElement('div');
  inputDiv.className = 'just-inline width-inputs';
  colFullDiv.appendChild(inputDiv);

  const h4Score = document.createElement('h4');
  h4Score.className = 'test-margin width-100px';
  h4Score.textContent = 'Score: ' + userData.myScore;
  inputDiv.appendChild(h4Score);

  const h4Progress = document.createElement('h4');
  h4Progress.className = 'test-margin';
  h4Progress.textContent = 'Progress: ' + userData.progress + '/' + userData.episodes;
  inputDiv.appendChild(h4Progress);

  return li;
}

function loadAnimeList() {
  const userDataArr = userData.animeList;
  userDataArr.forEach(userData => {
    $ulAnimeList.appendChild(renderAnimeList(userData));
  });
}

function getCurrentAnimeListItem(event) {
  const closestListItem = event.target.closest('li');
  const userChangedListItem = closestListItem.getAttribute('class');
  userData.currentListItem = userChangedListItem;
  animeListPopUp();
}
$ulAnimeList.addEventListener('click', getCurrentAnimeListItem);

const $scoreInput = document.querySelector('#score-input');
let userScoreInput = '';
$scoreInput.addEventListener('input', function (event) {
  userScoreInput = event.target.value;
  return userScoreInput;
});

const $progressInput = document.querySelector('#progress-input');
let userProgressInput = '';
$progressInput.addEventListener('input', function () {
  userProgressInput = event.target.value;
  return userProgressInput;
});

function saveListEntry(event) {
  const userDataArr = userData.animeList;
  for (let i = 0; i < userDataArr.length; i++) {
    if (userDataArr[i].id.toString() === userData.currentListItem) {
      if (userScoreInput > 10) {
        userDataArr[i].myScore = 10;
      } else if (userScoreInput === '') {
        userDataArr[i].myScore = 0;
      } else {
        userDataArr[i].myScore = userScoreInput.toString();
      }
      if (Number(userProgressInput) > userDataArr[i].episodes) {
        userDataArr[i].progress = userDataArr[i].episodes;
      } else if (userProgressInput === '') {
        userDataArr[i].progress = 0;
      } else {
        userDataArr[i].progress = userProgressInput.toString();
      }
    }
  }
  if (userDataArr.every(index => index.myScore !== 0)) {
    userDataArr.sort((x, y) => y.myScore - x.myScore);
  }
  $ulAnimeList.replaceChildren();
  loadAnimeList();
  animeListClosePopUp();
}
$saveButton.addEventListener('click', saveListEntry);

const $deleteButton = document.querySelector('.delete-button');
function deleteButtonHandler() {
  const userDataArr = userData.animeList;
  for (let i = 0; i < userDataArr.length; i++) {
    if (userDataArr[i].id.toString() === userData.currentListItem) {
      userDataArr.splice(i, 1);
    }
  }
  $ulAnimeList.replaceChildren();
  loadAnimeList();
  animeListClosePopUp();
}
$deleteButton.addEventListener('click', deleteButtonHandler);

function animeListPopUp() {
  $outerDiv.classList.add('pop-up-background');
  $popUpList.classList.remove('hidden');
}

function animeListClosePopUp() {
  $outerDiv.classList.remove('pop-up-background');
  $popUpList.classList.add('hidden');
}

function renderSelectedAnimeCharacters(response, i) {
  const userDataArr = userData.characterList;

  const col5025div = document.createElement('div');
  col5025div.className = 'col-50-25 center';
  $selectedAnimeCharacters.appendChild(col5025div);

  const imgDiv = document.createElement('div');
  imgDiv.className = 'search-img-margin';
  col5025div.appendChild(imgDiv);

  const img = document.createElement('img');
  img.className = 'search-result-img';
  img.setAttribute('src', response[i].character.images.jpg.image_url);
  img.setAttribute('id', response[i].character.mal_id);
  imgDiv.appendChild(img);

  const divForTitle = document.createElement('div');
  divForTitle.className = 'center search-title-div';
  imgDiv.appendChild(divForTitle);

  const h2 = document.createElement('h2');
  h2.className = 'search-title';
  if (response[i].character.name.length > 15) {
    h2.textContent = response[i].character.name.split('').splice(0, 15).join('') + '...';
  } else {
    h2.textContent = response[i].character.name;
  }
  divForTitle.appendChild(h2);
  for (let j = 0; j < userDataArr.length; j++) {
    if (Number(userDataArr[j].mal_id) === response[i].character.mal_id) {
      imgDiv.className = 'search-img-margin-green';
      h2.className = 'search-title-white';
      break;
    } else {
      imgDiv.className = 'search-img-margin';
      h2.className = 'search-title';
    }
  }

  return $selectedAnimeCharacters;
}

function selectedAnimeCharactersGet() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/anime/' + userData.userTarget + '/' + 'characters');
  $selectedCharactersFalse.className = 'white hidden';
  $selectedCharactersLoading.classList.remove('hidden');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const response = xhr.response.data;
    if (!response) {
      $selectedCharactersLoading.classList.add('hidden');
      $selectedCharactersFalse.className = 'white';
      return false;
    }
    for (let i = 0; i < response.length; i++) {
      renderSelectedAnimeCharacters(response, i);
    }
    $selectedCharactersLoading.classList.add('hidden');
  });
  xhr.send();
}

$charactersButton.addEventListener('click', function (event) {
  selectedAnimeCharactersGet();
  viewSwap('selectedAnimeCharacters');
});

function selectedAnimeCharactersListHandler(event) {
  const closestSelectedDiv = event.target.closest('.col-50-25');
  const closestImg = closestSelectedDiv.querySelector('img').getAttribute('src');
  const closestID = closestSelectedDiv.querySelector('img').getAttribute('id');
  const closestName = closestSelectedDiv.querySelector('h2').textContent;
  selectedAnimeCharactersInfo = {};
  selectedAnimeCharactersInfo.mal_id = closestID;
  selectedAnimeCharactersInfo.img = closestImg;
  selectedAnimeCharactersInfo.name = closestName;
  const userDataArr = userData.characterList;

  let trueOrFalse = false;
  for (let i = 0; i < userDataArr.length; i++) {
    if (userDataArr[i].mal_id === closestID) {
      trueOrFalse = true;
      break;
    } else {
      trueOrFalse = false;
    }
  }
  if (trueOrFalse === false) {
    userDataArr.unshift(selectedAnimeCharactersInfo);

  }
  $characterList.replaceChildren();
  loadCharacterList();
  viewSwap('character-list');
}
$selectedAnimeCharacters.addEventListener('click', selectedAnimeCharactersListHandler);

function renderCharacterList(userData) {
  const col5025div = document.createElement('div');
  col5025div.className = 'col-50-25 center';

  const imgDiv = document.createElement('div');
  imgDiv.className = 'search-img-margin';
  col5025div.appendChild(imgDiv);

  const img = document.createElement('img');
  img.className = 'search-result-img';
  img.setAttribute('src', userData.img);
  img.setAttribute('id', userData.mal_id);
  imgDiv.appendChild(img);

  const divForTitle = document.createElement('div');
  divForTitle.className = 'center search-title-div';
  imgDiv.appendChild(divForTitle);

  const h2 = document.createElement('h2');
  h2.className = 'search-title';
  if (userData.name.length > 15) {
    h2.textContent = userData.name.split('').splice(0, 15).join('') + '...';
  } else {
    h2.textContent = userData.name;
  }
  divForTitle.appendChild(h2);

  return col5025div;
}

function loadCharacterList() {
  const characterListArr = userData.characterList;
  characterListArr.forEach(userData => {
    $characterList.appendChild(renderCharacterList(userData));
  });
}

function characterListPopUp() {
  $outerDiv.classList.add('pop-up-background');
  $popUpCharacters.classList.remove('hidden');
}

$noButton.addEventListener('click', function (event) {
  $outerDiv.classList.remove('pop-up-background');
  $popUpCharacters.classList.add('hidden');
});

$yesButton.addEventListener('click', function (event) {
  const userDataArr = userData.characterList;
  for (let i = 0; i < userDataArr.length; i++) {
    if (userDataArr[i].mal_id === userData.currentCharacter) {
      userDataArr.splice(i, 1);
    }
  }
  $characterList.replaceChildren();
  loadCharacterList();

  $outerDiv.classList.remove('pop-up-background');
  $popUpCharacters.classList.add('hidden');
});

$characterList.addEventListener('click', function () {
  const closestListItem = event.target.closest('img');
  const userChangedListItem = closestListItem.getAttribute('id');
  userData.currentCharacter = userChangedListItem;
  const userDataArr = userData.characterList;
  for (let i = 0; i < userDataArr.length; i++) {
    if (userDataArr[i].mal_id === userChangedListItem) {
      const currentName = userDataArr[i].name.split(',');
      $popUpH1.textContent = 'Remove ' + currentName[0].toString() + '?';
    }
  }
  characterListPopUp();
});

function viewSwap(userview) {
  $searchResultError.className = 'white hidden';
  if (userview === 'top-anime') {
    $topAnimeView.classList.remove('hidden');
    $searchResultView.classList.add('hidden');
    $selectedAnimeView.classList.add('hidden');
    $animeListView.classList.add('hidden');
    $selectedAnimeCharactersView.classList.add('hidden');
    $characterListView.classList.add('hidden');
    userData.view = 'top-anime';
    $characterNavAnchor.className = 'nav-anchor characters-anchor';
    $listNavAnchor.className = 'nav-anchor list-anchor';
    removeSearchResults();
    removeSelectedAnimeCharacters();
  } else if (userview === 'search-result') {
    $searchResultView.classList.remove('hidden');
    $topAnimeView.classList.add('hidden');
    $selectedAnimeView.classList.add('hidden');
    $animeListView.classList.add('hidden');
    $selectedAnimeCharactersView.classList.add('hidden');
    $characterListView.classList.add('hidden');
    userData.view = 'search-result';
    $characterNavAnchor.className = 'nav-anchor characters-anchor';
    $listNavAnchor.className = 'nav-anchor list-anchor';
    removeSelectedAnimeCharacters();
  } else if (userview === 'selected-anime') {
    $selectedAnimeView.classList.remove('hidden');
    $topAnimeView.classList.add('hidden');
    $searchResultView.classList.add('hidden');
    $animeListView.classList.add('hidden');
    $selectedAnimeCharactersView.classList.add('hidden');
    $characterListView.classList.add('hidden');
    userData.view = 'selected-anime';
    $characterNavAnchor.className = 'nav-anchor characters-anchor';
    $listNavAnchor.className = 'nav-anchor list-anchor';
    removeSearchResults();
    removeSelectedAnimeCharacters();
  } else if (userview === 'anime-list') {
    $animeListView.classList.remove('hidden');
    $topAnimeView.classList.add('hidden');
    $searchResultView.classList.add('hidden');
    $selectedAnimeView.classList.add('hidden');
    $selectedAnimeCharactersView.classList.add('hidden');
    $characterListView.classList.add('hidden');
    userData.view = 'anime-list';
    $characterNavAnchor.className = 'nav-anchor characters-anchor';
    $listNavAnchor.className = 'nav-anchor-grey list-anchor';
    removeSearchResults();
    removeSelectedAnimeCharacters();
  } else if (userview === 'selectedAnimeCharacters') {
    $topAnimeView.classList.add('hidden');
    $searchResultView.classList.add('hidden');
    $selectedAnimeView.classList.add('hidden');
    $animeListView.classList.add('hidden');
    $characterListView.classList.add('hidden');
    $selectedAnimeCharactersView.classList.remove('hidden');
    userData.view = 'selectedAnimeCharacters';
    $characterNavAnchor.className = 'nav-anchor characters-anchor';
    $listNavAnchor.className = 'nav-anchor list-anchor';
    removeSearchResults();
  } else if (userview === 'character-list') {
    $topAnimeView.classList.add('hidden');
    $searchResultView.classList.add('hidden');
    $selectedAnimeView.classList.add('hidden');
    $animeListView.classList.add('hidden');
    $selectedAnimeCharactersView.classList.add('hidden');
    $characterListView.classList.remove('hidden');
    userData.view = 'character-list';
    $characterNavAnchor.className = 'nav-anchor-grey characters-anchor';
    $listNavAnchor.className = 'nav-anchor list-anchor';
    removeSearchResults();
    removeSelectedAnimeCharacters();
  }
}
