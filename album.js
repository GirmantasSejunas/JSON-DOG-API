let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get('album_id');
let albumTitle = urlParams.get('album_title')
let albumUserId = urlParams.get('album_userId')

let albumWrapper = document.querySelector('#albumWrapper')

fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
.then(res => res.json())
.then(photos => {
    
    
    fetch('https://jsonplaceholder.typicode.com/users/' + albumUserId)
    .then(res => res.json())
    .then(user =>{
        
           let authorName = document.createElement('h3')
           authorName.innerHTML = `<a href ="./user.html?user_id=${albumUserId}"> ${user.name} </a>`    
           
           let albumTitleElement = document.createElement('p')
           albumTitleElement.textContent = albumTitle

           let albumPhotos = document.createElement('div')
           albumPhotos.classList.add('albumPhotos')
           
           albumWrapper.append(authorName, albumTitleElement, albumPhotos)

           fetch('http://shibe.online/api/shibes?count=20')
            .then(res => res.json())
            .then ( photos => {

           photos.map(photo => {
            let imageElement = document.createElement('img')
            imageElement.src = photo
            imageElement.classList.add('albumImage')
            imageElement.setAttribute('alt', photo.title)

            albumPhotos.prepend(imageElement)
           })
        })

        })
    })
