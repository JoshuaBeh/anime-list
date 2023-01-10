var $topAnimeList = document.querySelector('#top-anime');
var $arrowDown = document.querySelector('.fa-arrow-down');
var $backToTop = document.querySelector('.back-to-top');
var $topOfPage = document.querySelector('.anchor-background');
var pageNumber = 1;

function renderTopAnime(response, i) {
  var li = document.createElement('li');

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
