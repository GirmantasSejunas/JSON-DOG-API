import headerFnc from './header.js'
import {firstLetterToUppercase} from './function.js'

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get('album_id');
let albumTitle = urlParams.get('album_title')
let albumUserId = urlParams.get('album_userId')

let albumWrapper = document.querySelector('#albumWrapper')

headerFnc()

    
    
    fetch(`https://jsonplaceholder.typicode.com/users/${albumUserId}?_embed=albums`)
    .then(res => res.json())
    .then(user =>{
        
        user.albums.map(album => {
            let authorName = document.createElement('h3')
            authorName.innerHTML = `<a href ="./user.html?user_id=${albumUserId}"> ${user.name} </a>`    
            
            let albumTitleElement = document.createElement('p')
            albumTitleElement.textContent = firstLetterToUppercase(album.title)
 
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
