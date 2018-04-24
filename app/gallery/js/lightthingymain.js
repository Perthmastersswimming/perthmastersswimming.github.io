var apiKey = '986e904143a37c668876552671aacde9',
    authorId = 'xtarsy',
    perPage = 18,
    startPage = 0;

// Main content container
var $container = $('#container');

// Masonry 
$container.masonry({
  itemSelector: '.grid-item',
  columnWidth: '.grid-item',
  percentPosition: true
});

var gallery; 

function loadImages(page, callback) {
  console.log('loadImages page: '+page);
  var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&user_id=' + authorId + '&per_page=' + perPage + '&page=' + page + '&format=json&nojsoncallback=1';
  $.getJSON(url, function(response) {
    if (response.stat === 'ok') {
      (function loadEachImg(arrPhotos, index) {
        if (index < arrPhotos.length) {
          var photo = arrPhotos[index];
          var link = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
          var $newElem = $('<a href="'+link+'"><img class="grid-item " src=' + link + ' style="display: none"></a>');
          $container.append($newElem);
          // ensure that new image loaded before adding to masonry layout
          $newElem.imagesLoaded(function(){
            $newElem.show();
            $container.masonry( 'appended', $newElem, true );
            $container.masonry('layout');
            // Init lightGallery
            if (gallery) {
              gallery.destroy(true);
            }
            gallery = $container.lightGallery({
              thumbnail: true,
              animateThumb: true,
              showThumbByDefault: false,
            }).data('lightGallery'); 
            loadEachImg(arrPhotos, ++index);
          });
        } else {	// done looping
          if (callback) {
            callback();
          }
        }
      })(response.photos.photo, 0);
    }
  });
}
console.log('-----------loadImages');
loadImages(++startPage, function() {
  // make sure body has scroll therefore be able to do infinitescroll
  if (document.body.scrollHeight <= window.innerHeight) {
    loadImages(++startPage);
  }
});

// infinite scroll
var loadingImages = false;
$(document).scroll(function() {
  var docScrollTop = $(document).scrollTop();
  var endScroll = $(document).height() - $(window).height() - 100;
  if (!loadingImages && (docScrollTop > endScroll)) {
    loadingImages = true;
    loadImages(++startPage, function(){
      loadingImages = false;
    });
  }
});

/*-------------------

-*/

var circle = document.querySelector('.material-btn');
var link = document.querySelector('.material-content').querySelectorAll('li');
var ham = document.querySelector('.material-hamburger');
var main = document.querySelector('main');
var win = window;

function openMenu(event) {
 
  circle.classList.toggle('active');
  ham.classList.toggle('material-close');
  main.classList.toggle('active');
  for (var i = 0; i < link.length; i++) {
    link[i].classList.toggle('active');
  }
  event.preventDefault();
  event.stopImmediatePropagation();
}

function closeMenu() {
  if (circle.classList.contains('active')) {
    circle.classList.remove('active');
    for (var i = 0; i < link.length; i++) {
      link[i].classList.toggle('active');
    }
    ham.classList.remove('material-close');
    main.classList.remove('active');
  }
}

circle.addEventListener('click', openMenu, false);

win.addEventListener('click', closeMenu, false);

