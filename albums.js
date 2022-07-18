

let albumsWrapper = document.querySelector('#albums-wrapper');
let albumsWrapperTitle = document.createElement('h2');
document.body.prepend(albumsWrapperTitle);

function init(){
let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get('user_id');

  
  if (userId) {
    renderAlbumsByUserId()
  } else {
    renderAllAlbums()
  }
}
  function renderAlbumsByUserId(){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums?_embed=photos&_expand=user`)
    .then(res => res.json())
    .then(albums => {
      albums.map(album => {
        let albumItem = document.createElement('div');
          albumItem.classList.add('album-item');
  
          albumsWrapperTitle.textContent = `Albums of ${user.name}:`;
  
          let randomIndex = Math.floor(Math.random() * photos.length);
  
          albumItem.innerHTML = `<h3><a href="./album.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${album.title}</a> (${photos.length})</h3>
          <img src="${photos[randomIndex].thumbnailUrl}">`;

          albumsWrapper.prepend(albumItem);
      })
    })
  }
  function renderAllAlbums(){
    fetch('https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_limit=15')
    .then(res => res.json())
    .then(albums => {
  

      albumsWrapperTitle.textContent = 'All albums:';
      albums.map(album => {

        fetch('http://shibe.online/api/shibes')
        .then(res => res.json())
        .then ( photos => {
          photos.map(photo => {

          let albumItem = document.createElement('div');
          albumItem.classList.add('album-item');
          let user = album.user
          // let randomIndex = Math.floor(Math.random() *photos.length);
    
                  albumItem.innerHTML = `<h3><a href="./album.html?album_id=${album.id}&album_title=${album.title}&album_userId=${album.userId}&user_name=${user.name}">${album.title}</a> (${album.photos.length})</h3>
                                        <div>Album created by: <a href="./user.html?user_id=${user.id}">${user.name}</a></div>
                                        <img src="${photo}">`;

                  albumsWrapper.prepend(albumItem);
                })
        })
      })
    })
  }

init()
