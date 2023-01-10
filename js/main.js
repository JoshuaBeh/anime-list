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
var $searchAppend = document.querySelector('#search-append');
var userSearchInput = '';
var pageNumber = 1;

function renderTopAnime(response, i) {
  var li = document.createElement('li');

  var rowDiv = document.createElement('div');
  rowDiv.className = 'row top-background relative';
  li.appendChild(rowDiv);

  var col20Div = document.createElement('div');
  col20Div.className = 'col-20 center relative';
  rowDiv.appendChild(col20Div);

  var img = document.createElement('img');
  img.setAttribute('src', response[i].images.jpg.small_image_url);
  img.className = 'top-image';
  col20Div.appendChild(img);

  var col80Div = document.createElement('div');
  col80Div.className = 'col-80 inline relative';
  rowDiv.appendChild(col80Div);

  var title = document.createElement('a');
  title.setAttribute('href', '#');
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
  $popUpSearch.classList.remove('hidden');
}
$searchAnchor.addEventListener('click', searchPopUpHandler);

function removeSearchResults() {
  $searchAppend.replaceChildren();
}

function searchResultGet() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/anime?q=' + userSearchInput);
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
  $outerDiv.classList.remove('pop-up-background');
  $header.classList.remove('z-index-neg');
  $topAnimeView.classList.remove('z-index-neg');
  $searchResultView.classList.remove('z-index-neg');
  $popUpSearch.classList.add('hidden');
});

function renderSearchResult(response, i) {
  var col5025div = document.createElement('div');
  col5025div.className = 'col-50-25';
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
