import headerFnc from './header.js'
import {firstLetterToUppercase} from './function.js'


let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get('user_id');

let divWrapperElement = document.querySelector('#wrapper')

headerFnc()

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
.then(res => res.json())
.then(user =>{
    
    
    let userWrapper = document.createElement('ul')
    userWrapper.classList.add('userWrapper')
    
    let userFullName = document.createElement('h3')
    userFullName.textContent = `${user.name} (${user.username})`
    userFullName.classList.add('userFullName')
    
    let userEmail = document.createElement('li')
    userEmail.textContent = `User email : ${user.email}`
    userEmail.classList.add('userEmail')
    
    let userPhone = document.createElement('li')
    userPhone.textContent = `User phone : ${user.phone}`
    userPhone.classList.add('userPhone')
    
    let userWebsite = document.createElement('li')
    userWebsite.textContent = `User website : ${user.website}`
    userWebsite.classList.add('userWebsite')
    
    let userWorkplace = document.createElement('li')
    userWorkplace.textContent =  `User works in ${user.company.name} company.`
    userWorkplace.classList.add('userWorkplace')
    
    let userAdress = document.createElement('li')
    userAdress.classList.add('userAdress')
    
    
    let userAdressStreet = user.address.street
    let userAdressSuite = user.address.suite
    let userAdreesCity = user.address.city
    let userAdreesZipcode = user.address.zipcode
    
    
    // userAdress.append(userAdressStreet, userAdressSuite, userAdreesCity, userAdreesZipcode)
    userAdress.innerHTML = `User adress : ${userAdressStreet}, ${userAdressSuite}, ${userAdreesCity}, ${userAdreesZipcode}.`
    
    
    // userAdress.append(userArdessContent)
    
    divWrapperElement.append(userFullName, userWrapper)
    userWrapper.append(userEmail, userPhone, userWebsite, userWorkplace, userAdress)
    
    
  })
  
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts?_limit=1`)
  .then(res => res.json())
  .then(posts => {
    let postsWrapper = document.querySelector('#user-post');

    let postsTitle = document.createElement('h3');
    postsTitle.classList.add('posts-title');
    postsTitle.textContent = 'User posts:';

    postsWrapper.append(postsTitle)

    posts.map(post => {
      let postItem = document.createElement('div');
      postItem.classList.add('post-item');

      postItem.innerHTML = `<h4>${firstLetterToUppercase(post.title)}</h4>
                            <p>${firstLetterToUppercase(post.body)}</p>
                            <a href="./posts.html?post_userId=${post.userId} ">Read More...</a>`;

      postsWrapper.append(postItem);

    })
  })

fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
  .then(res => res.json())
  .then(albums => {
    let userAlbums = document.querySelector('#user-albums');

    userAlbums.innerHTML = '<h3 class="user-albums-title">User albums:</h3>';

    let albumsList = document.createElement('ol');
    albumsList.classList.add('albums-list');

    userAlbums.append(albumsList);


    
    albums.map(album => {
      let albumItem = document.createElement('li');
      albumItem.classList.add('album-item');
      albumItem.innerHTML = `<a href="./album.html?album_id=${album.id}&album_title=${album.title}&album_userId=${album.userId}">${firstLetterToUppercase(album.title)}</a>`;

      
      albumsList.prepend(albumItem);
    })
  }) 