
import headerFnc from './header.js'
import {firstLetterToUppercase} from './function.js'


let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get('post_userId');
// let postUserId = urlParams.get('user_id')

let postsWrapper = document.querySelector('#posts-wrapper');
let postsListTitle = document.createElement('h2');
let postsList = document.createElement('ol');

postsWrapper.append(postsListTitle, postsList);

headerFnc()

function init(){

  if (userId) {
    renderPostsByUserId()
  } else {
    renderAllPosts()
  }

}
function renderPostsByUserId(){
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts?_expand=user`)
  .then(res => res.json())
  .then(posts => {
  
    posts.map(post => {
      postsListTitle.textContent = `Posts of ${post.user.name}:`;
      let postItem = document.createElement('li');
      postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${firstLetterToUppercase(post.title)}</a>`;
      postsList.prepend(postItem);
       
      })
  })
}

function renderAllPosts() {
  fetch(`https://jsonplaceholder.typicode.com/posts?_expand=user`)
  .then(res => res.json())
  .then(posts => {

    postsListTitle.textContent = 'All Posts:';

    posts.map(post => {
          let postItem = document.createElement('li');
          postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${firstLetterToUppercase(post.title)} (${post.user.name})</a>`;
  
          postsList.prepend(postItem);
        })
    })
}

let postCreator = document.querySelector('#postCreator')

postCreator.addEventListener('click', event =>{
  event.preventDefault()
  console.dir(event.target)
})


init()