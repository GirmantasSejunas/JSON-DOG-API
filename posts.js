// let queryParams = document.location.search
// let urlParams = new URLSearchParams(queryParams)
// let postUserId = urlParams.get('post_userId')
// console.log(postUserId)
// let postWrapper = document.querySelector('#postWrapper')



let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get('post_userId');
let postUserId = urlParams.get('user_id')

let postsWrapper = document.querySelector('#posts-wrapper');
let postsListTitle = document.createElement('h2');
let postsList = document.createElement('ol');

postsWrapper.append(postsListTitle, postsList);


function init(){

  if (userId) {
    renderPostsByUserId()
  } else {
    renderAllPosts()
  }

}
function renderPostsByUserId(){
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
  .then(res => res.json())
  .then(posts => {
    fetch('https://jsonplaceholder.typicode.com/users/' + userId)
      .then(res => res.json())
      .then(user => {
      
        postsListTitle.textContent = `Posts of ${user.name}:`;
        posts.map(post => {
          let postItem = document.createElement('li');
          postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${post.title}</a>`;
          postsList.prepend(postItem);
       
        })
      })
  })
}

function renderAllPosts() {
  fetch(`https://jsonplaceholder.typicode.com/posts?_expand=user`)
  .then(res => res.json())
  .then(posts => {

    postsListTitle.textContent = 'All Posts:';

    posts.map(post => {
      console.log(post.user.name)
          let postItem = document.createElement('li');
          postItem.innerHTML = `<a href="./post.html?post_id=${post.id}">${post.title} (${post.user.name})</a>`;
  
          postsList.prepend(postItem);
        })
    })
}


init()