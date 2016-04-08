var img = document.querySelector('img')

function loaded() {
  alert('loaded')
}

if (img.complete) {
  loaded()
} else {
  img.addEventListener('load', loaded)
  img.addEventListener('error', function() {
      alert('error')
  })
}
