/* global userData */
var $topAnimeList = document.querySelector('#top-anime');
var $arrowDown = document.querySelector('.fa-arrow-down');
var $backToTop = document.querySelector('.back-to-top');
var $topOfPage = document.querySelector('.anchor-background');
var $searchAnchor = document.querySelector('#search-pop-up');
var $outerDiv = document.querySelector('.search-pop-up');
var $header = document.querySelector('header');
var $topAnimeView = document.querySelector('[data-view="top-anime"]');
var $searchResultView = document.querySelector('[data-view="search-result"]');
var $popUpSearch = document.querySelector('.pop-up-search');
var $searchInput = document.querySelector('.search-input');
var $searchButton = document.querySelector('#search-button');
var $addButton = document.querySelector('.add-button');
var $searchAppend = document.querySelector('#search-append');
var $animeNavAnchor = document.querySelector('.anime');
var $listNavAnchor = document.querySelector('.list-anchor');
var $selectedAnimeView = document.querySelector('[data-view="selected-anime"]');
var $animeListView = document.querySelector('[data-view="anime-list"]');
var $selectedAnimeCharactersView = document.querySelector('[data-view="selected-anime-characters"]');
var $ulAnimeList = document.querySelector('#anime-list');
var $popUpList = document.querySelector('.pop-up-list');
var $saveButton = document.querySelector('.save-button');
var $selectedAnimeCharacters = document.querySelector('#selected-anime-characters');
var $charactersButton = document.querySelector('.characters-button');
var userSearchInput = '';
var pageNumber = 1;

var selectedAnimeInfo = {
  img: '',
  score: 0,
  myScore: 0,
  id: 0,
  title: '',
  episodes: 0,
  progress: 0,
  inList: false
};

// eslint-disable-next-line no-unused-vars
var selectedAnimeCharactersInfo = {
  mal_id: 0,
  name: '',
  img: ''
};

$animeNavAnchor.addEventListener('click', function () {
  viewSwap('top-anime');
});

$listNavAnchor.addEventListener('click', function () {
  $ulAnimeList.replaceChildren();
  loadAnimeList();
  viewSwap('anime-list');
});

window.addEventListener('load', function () {
  selectedAnimeGet(userData.userTarget);
  searchResultGet();
  viewSwap(userData.view);
  loadAnimeList();
  selectedAnimeCharactersGet();
});

function renderTopAnime(response, i) {
  var li = document.createElement('li');
  li.setAttribute('id', response[i].mal_id);

  var rowDiv = document.createElement('div');
  rowDiv.className = 'row top-background';
  li.appendChild(rowDiv);

  var col20Div = document.createElement('div');
  col20Div.className = 'col-20 center';
  rowDiv.appendChild(col20Div);

  var img = document.createElement('img');
  img.setAttribute('src', response[i].images.jpg.small_image_url);
  img.className = 'top-image';
  col20Div.appendChild(img);

  var col80Div = document.createElement('div');
  col80Div.className = 'col-80 inline';
  rowDiv.appendChild(col80Div);

  var title = document.createElement('a');
  title.className = 'top-titles';
  title.textContent = response[i].title;
  col80Div.appendChild(title);

  var h1Score = document.createElement('h1');
  h1Score.className = 'top-scores inline star-hide';
  if (response[i].score.toString().length === 3) {
    h1Score.textContent = response[i].score + '0';
  } else {
    h1Score.textContent = response[i].score;
  }
  col80Div.appendChild(h1Score);

  var iStar = document.createElement('i');
  iStar.className = 'fa-solid fa-star';
  h1Score.prepend(iStar);
  $topAnimeList.appendChild(li);

  return $topAnimeList;
}

function topAnimeGet() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/top/anime?page=' + pageNumber);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var response = xhr.response.data;
    for (var i = 0; i < response.length; i++) {
      renderTopAnime(response, i);
    }
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
  $header.classList.add('z-index-neg');
  $topAnimeView.classList.add('z-index-neg');
  $searchResultView.classList.add('z-index-neg');
  $selectedAnimeView.classList.add('z-index-neg');
  $animeListView.classList.add('z-index-neg');
  $popUpSearch.classList.remove('hidden');
}
$searchAnchor.addEventListener('click', searchPopUpHandler);

function removeSearchResults() {
  $searchAppend.replaceChildren();
}

function removeSelectedAnimeCharacters() {
  $selectedAnimeCharacters.replaceChildren();
}

function searchResultGet() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/anime?q=' + userSearchInput + '&sfw');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    removeSearchResults();
    var response = xhr.response.data;
    for (var i = 0; i < response.length; i++) {
      renderSearchResult(response, i);
    }
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
  $header.classList.remove('z-index-neg');
  $topAnimeView.classList.remove('z-index-neg');
  $searchResultView.classList.remove('z-index-neg');
  $selectedAnimeView.classList.remove('z-index-neg');
  $animeListView.classList.remove('z-index-neg');
  $popUpSearch.classList.add('hidden');
});

function renderSearchResult(response, i) {
  var col5025div = document.createElement('div');
  col5025div.className = 'col-50-25 center';
  col5025div.setAttribute('id', response[i].mal_id);
  $searchAppend.appendChild(col5025div);

  var imgDiv = document.createElement('div');
  imgDiv.className = 'search-img-margin';
  col5025div.appendChild(imgDiv);

  var img = document.createElement('img');
  img.className = 'search-result-img';
  img.setAttribute('src', response[i].images.jpg.image_url);
  imgDiv.appendChild(img);

  var divForTitle = document.createElement('div');
  divForTitle.className = 'center search-title-div';
  imgDiv.appendChild(divForTitle);

  var anchorTitle = document.createElement('a');
  anchorTitle.className = 'search-title';
  if (response[i].title.length > 15) {
    anchorTitle.textContent = response[i].title.split('').splice(0, 15).join('') + '...';
  } else {
    anchorTitle.textContent = response[i].title;
  }
  divForTitle.appendChild(anchorTitle);

  return $searchAppend;
}

var $selectedTitle = document.querySelector('.selected-title');
var $selectedPicture = document.querySelector('.selected-picture');
var $score = document.querySelector('#score');
var $episodes = document.querySelector('#episodes');
var $rank = document.querySelector('#rank');
var $premiered = document.querySelector('#premiered');
var $status = document.querySelector('#status');
var $type = document.querySelector('#type');
var $synopsis = document.querySelector('#synopsis');
function selectedAnimeGet(userTarget) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/anime/' + userTarget);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var response = xhr.response.data;
    checkDataForButton(response);
    selectedAnimeInfo.img = response.images.jpg.small_image_url;
    selectedAnimeInfo.score = response.score;
    selectedAnimeInfo.id = response.mal_id;
    selectedAnimeInfo.episodes = response.episodes;
    selectedAnimeInfo.title = response.title;
    selectedAnimeInfo.type = response.type;
    selectedAnimeInfo.inList = true;

    $selectedTitle.textContent = response.title;
    $selectedPicture.setAttribute('src', response.images.jpg.large_image_url);
    var starIcon = document.createElement('i');
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
  var closestSelectedDiv = event.target.closest('.col-50-25');
  var closestID = closestSelectedDiv.getAttribute('id');
  userData.userTarget = closestID;
  var userTarget = closestID;
  selectedAnimeGet(userTarget);
  viewSwap('selected-anime');
}
$searchAppend.addEventListener('click', userSelectAnimeHandler);

function userSelectTopAnimeHandler(event) {
  var closestListItem = event.target.closest('li');
  var userTarget = closestListItem.getAttribute('id');
  userData.userTarget = userTarget;
  selectedAnimeGet(userTarget);
  viewSwap('selected-anime');
}
$topAnimeList.addEventListener('click', userSelectTopAnimeHandler);

function addButtonHandler(event) {
  var testStorage = window.localStorage.getItem('animelist-local-storage');
  var parseStorage = JSON.parse(testStorage);
  var userDataArr = parseStorage.animeList;
  var trueOrFalse = true;
  for (var i = 0; i < userDataArr.length; i++) {
    if (userDataArr[i].id === selectedAnimeInfo.id) {
      trueOrFalse = false;
      userDataArr.splice(i, 1);
      $addButton.setAttribute('id', 'not-inlist');
      $addButton.textContent = 'ADD';
      var dataJSON = JSON.stringify(parseStorage);
      window.localStorage.setItem('animelist-local-storage', dataJSON);
      // eslint-disable-next-line no-global-assign
      userData = parseStorage;
      break;
    }
  }
  if (trueOrFalse === true) {
    userDataArr.unshift(selectedAnimeInfo);
    $addButton.setAttribute('id', 'inlist');
    $addButton.textContent = 'IN LIST';
    var userDataJSON = JSON.stringify(parseStorage);
    window.localStorage.setItem('animelist-local-storage', userDataJSON);
    // eslint-disable-next-line no-global-assign
    userData = parseStorage;
  }
}
$addButton.addEventListener('click', addButtonHandler);

function checkDataForButton(response) {
  var testStorage = window.localStorage.getItem('animelist-local-storage');
  var parseStorage = JSON.parse(testStorage);
  var userDataArr = parseStorage.animeList;
  var trueOrFalse;
  if (userDataArr.length === 0) {
    return;
  }
  for (var i = 0; i < userDataArr.length; i++) {
    if (userDataArr[i].id === response.mal_id) {
      trueOrFalse = true;
      break;
    } else {
      trueOrFalse = false;
    }
  }
  if (trueOrFalse === true) {
    $addButton.setAttribute('id', 'inlist');
    $addButton.textContent = 'IN LIST';
    return $addButton;
  } else {
    $addButton.setAttribute('id', 'not-inlist');
    $addButton.textContent = 'ADD';
    return $addButton;
  }
}

function renderAnimeList(userData) {
  var li = document.createElement('li');
  li.setAttribute('class', userData.id);

  var outerRowDiv = document.createElement('div');
  outerRowDiv.className = 'row center top-background';
  li.appendChild(outerRowDiv);

  var col10Div = document.createElement('div');
  col10Div.className = 'col-10';
  outerRowDiv.appendChild(col10Div);

  var img = document.createElement('img');
  img.className = 'anime-list-img';
  img.setAttribute('src', userData.img);
  col10Div.appendChild(img);

  var col90Div = document.createElement('div');
  col90Div.className = 'col-90 white anime-list-inline';
  outerRowDiv.appendChild(col90Div);

  var h3 = document.createElement('h3');
  h3.className = 'padding-left-fix margin-tb-fix';
  h3.textContent = userData.title;
  col90Div.appendChild(h3);

  var spanFixDiv = document.createElement('div');
  spanFixDiv.className = 'span-fix';
  col90Div.appendChild(spanFixDiv);

  var scoreSpan = document.createElement('span');
  scoreSpan.textContent = 'Score: ' + userData.myScore;
  spanFixDiv.appendChild(scoreSpan);

  var progressSpan = document.createElement('span');
  progressSpan.className = 'margin-left-70';
  progressSpan.textContent = 'Progress: ' + userData.progress + '/' + userData.episodes;
  spanFixDiv.appendChild(progressSpan);

  return li;
}

function loadAnimeList() {
  var testStorage = window.localStorage.getItem('animelist-local-storage');
  var parseStorage = JSON.parse(testStorage);
  var userDataArr = parseStorage.animeList;
  userDataArr.forEach(userData => {
    $ulAnimeList.appendChild(renderAnimeList(userData));
  });
}

function getCurrentAnimeListItem(event) {
  var closestListItem = event.target.closest('li');
  var userChangedListItem = closestListItem.getAttribute('class');
  userData.currentListItem = userChangedListItem;
  animeListPopUp();
}
$ulAnimeList.addEventListener('click', getCurrentAnimeListItem);

var $scoreInput = document.querySelector('#score-input');
var userScoreInput = '';
$scoreInput.addEventListener('input', function (event) {
  userScoreInput = event.target.value;
  return userScoreInput;
});

var $progressInput = document.querySelector('#progress-input');
var userProgressInput = '';
$progressInput.addEventListener('input', function () {
  userProgressInput = event.target.value;
  return userProgressInput;
});

function saveListEntry(event) {
  var testStorage = window.localStorage.getItem('animelist-local-storage');
  var parseStorage = JSON.parse(testStorage);
  var userDataArr = parseStorage.animeList;
  for (var i = 0; i < userDataArr.length; i++) {
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
      } else if (userScoreInput === '') {
        userDataArr[i].progress = 0;
      } else {
        userDataArr[i].progress = userProgressInput.toString();
      }
    }
  }
  var dataJSON = JSON.stringify(parseStorage);
  window.localStorage.setItem('animelist-local-storage', dataJSON);
  // eslint-disable-next-line no-global-assign
  userData = parseStorage;
  $ulAnimeList.replaceChildren();
  loadAnimeList();
  animeListClosePopUp();
}
$saveButton.addEventListener('click', saveListEntry);

var $deleteButton = document.querySelector('.delete-button');
function deleteButtonHandler() {
  var testStorage = window.localStorage.getItem('animelist-local-storage');
  var parseStorage = JSON.parse(testStorage);
  var userDataArr = parseStorage.animeList;
  for (var i = 0; i < userDataArr.length; i++) {
    if (userDataArr[i].id.toString() === userData.currentListItem) {
      userDataArr.splice(i, 1);
    }
  }
  var dataJSON = JSON.stringify(parseStorage);
  window.localStorage.setItem('animelist-local-storage', dataJSON);
  // eslint-disable-next-line no-global-assign
  userData = parseStorage;
  $ulAnimeList.replaceChildren();
  loadAnimeList();
  animeListClosePopUp();
}
$deleteButton.addEventListener('click', deleteButtonHandler);

function animeListPopUp() {
  $outerDiv.classList.add('pop-up-background');
  $header.classList.add('z-index-neg');
  $animeListView.classList.add('z-index-neg');
  $popUpList.classList.remove('hidden');
}

function animeListClosePopUp() {
  $outerDiv.classList.remove('pop-up-background');
  $header.classList.remove('z-index-neg');
  $animeListView.classList.remove('z-index-neg');
  $popUpList.classList.add('hidden');
}

function renderSelectedAnimeCharacters(response, i) {
  var col5025div = document.createElement('div');
  col5025div.className = 'col-50-25 center';
  col5025div.setAttribute('id', response[i].character.mal_id);
  $selectedAnimeCharacters.appendChild(col5025div);

  var imgDiv = document.createElement('div');
  imgDiv.className = 'search-img-margin';
  col5025div.appendChild(imgDiv);

  var img = document.createElement('img');
  img.className = 'search-result-img';
  img.setAttribute('src', response[i].character.images.jpg.image_url);
  imgDiv.appendChild(img);

  var divForTitle = document.createElement('div');
  divForTitle.className = 'center search-title-div';
  imgDiv.appendChild(divForTitle);

  var h2 = document.createElement('h2');
  h2.className = 'search-title';
  if (response[i].character.name.length > 15) {
    h2.textContent = response[i].character.name.split('').splice(0, 15).join('') + '...';
  } else {
    h2.textContent = response[i].character.name;
  }
  divForTitle.appendChild(h2);

  return $selectedAnimeCharacters;
}

function selectedAnimeCharactersGet() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/anime/' + userData.userTarget + '/' + 'characters');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var response = xhr.response.data;
    for (var i = 0; i < response.length; i++) {
      renderSelectedAnimeCharacters(response, i);
    }
  });
  xhr.send();
}

$charactersButton.addEventListener('click', function (event) {
  selectedAnimeCharactersGet();
  viewSwap('selectedAnimeCharacters');
});

function viewSwap(userview) {
  if (userview === 'top-anime') {
    $topAnimeView.classList.remove('hidden');
    $searchResultView.classList.add('hidden');
    $selectedAnimeView.classList.add('hidden');
    $animeListView.classList.add('hidden');
    $selectedAnimeCharactersView.classList.add('hidden');
    userData.view = 'top-anime';
    removeSearchResults();
    removeSelectedAnimeCharacters();
  } else if (userview === 'search-result') {
    $searchResultView.classList.remove('hidden');
    $topAnimeView.classList.add('hidden');
    $selectedAnimeView.classList.add('hidden');
    $animeListView.classList.add('hidden');
    $selectedAnimeCharactersView.classList.add('hidden');
    userData.view = 'search-result';
    removeSelectedAnimeCharacters();
  } else if (userview === 'selected-anime') {
    $selectedAnimeView.classList.remove('hidden');
    $topAnimeView.classList.add('hidden');
    $searchResultView.classList.add('hidden');
    $animeListView.classList.add('hidden');
    $selectedAnimeCharactersView.classList.add('hidden');
    userData.view = 'selected-anime';
    removeSearchResults();
    removeSelectedAnimeCharacters();
  } else if (userview === 'anime-list') {
    $animeListView.classList.remove('hidden');
    $topAnimeView.classList.add('hidden');
    $searchResultView.classList.add('hidden');
    $selectedAnimeView.classList.add('hidden');
    $selectedAnimeCharactersView.classList.add('hidden');
    userData.view = 'anime-list';
    removeSearchResults();
    removeSelectedAnimeCharacters();
  } else if (userview === 'selectedAnimeCharacters') {
    $topAnimeView.classList.add('hidden');
    $searchResultView.classList.add('hidden');
    $selectedAnimeView.classList.add('hidden');
    $animeListView.classList.add('hidden');
    $selectedAnimeCharactersView.classList.remove('hidden');
    userData.view = 'selectedAnimeCharacters';
    removeSearchResults();
  }
}
