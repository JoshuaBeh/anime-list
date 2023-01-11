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
var $selectedAnimeView = document.querySelector('[data-view="selected-anime"]');
var userSearchInput = '';
var pageNumber = 1;

$animeNavAnchor.addEventListener('click', function () {
  viewSwap('top-anime');
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
  $popUpSearch.classList.remove('hidden');
}
$searchAnchor.addEventListener('click', searchPopUpHandler);

function removeSearchResults() {
  $searchAppend.replaceChildren();
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
  $popUpSearch.classList.add('hidden');
});

function renderSearchResult(response, i) {
  var col5025div = document.createElement('div');
  col5025div.className = 'col-50-25';
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
    var userDataArr = userData.animeList;
    for (var i = 0; i < userDataArr.length; i++) {
      if (userDataArr[i].id === response.mal_id) {
        $addButton.setAttribute('id', 'inlist');
        $addButton.textContent = 'IN LIST';
        break;
      } else {
        $addButton.setAttribute('id', 'not-inlist');
        $addButton.textContent = 'ADD';
      }
    }

    selectedAnimeInfo.img = response.images.jpg.small_image_url;
    selectedAnimeInfo.score = response.score;
    selectedAnimeInfo.id = response.mal_id;
    selectedAnimeInfo.episodes = response.episodes;
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

var selectedAnimeInfo = {
  img: '',
  score: 0,
  id: 0,
  episodes: 0,
  progress: 0,
  inList: false
};
function userSelectAnimeHandler(event) {
  var closestSelectedDiv = event.target.closest('.col-50-25');
  var closestID = closestSelectedDiv.getAttribute('id');
  var userTarget = closestID;
  selectedAnimeGet(userTarget);
  viewSwap('selected-anime');
}
$searchAppend.addEventListener('click', userSelectAnimeHandler);

function userSelectTopAnimeHandler(event) {
  var closestListItem = event.target.closest('li');
  var userTarget = closestListItem.getAttribute('id');
  selectedAnimeGet(userTarget);
  viewSwap('selected-anime');
}
$topAnimeList.addEventListener('click', userSelectTopAnimeHandler);

function addButtonHandler(event) {
  var userDataArr = userData.animeList;
  var trueOrFalse = true;
  for (var i = 0; i < userDataArr.length; i++) {
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

function viewSwap(userview) {
  if (userview === 'top-anime') {
    $topAnimeView.classList.remove('hidden');
    $searchResultView.classList.add('hidden');
    $selectedAnimeView.classList.add('hidden');
    removeSearchResults();
  } else if (userview === 'search-result') {
    $searchResultView.classList.remove('hidden');
    $topAnimeView.classList.add('hidden');
    $selectedAnimeView.classList.add('hidden');
  } else if (userview === 'selected-anime') {
    $selectedAnimeView.classList.remove('hidden');
    $topAnimeView.classList.add('hidden');
    $searchResultView.classList.add('hidden');
    removeSearchResults();
  }
}
