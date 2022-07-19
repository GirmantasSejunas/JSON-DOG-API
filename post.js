import headerFnc from './header.js'
import {firstLetterToUppercase} from './function.js'

let queryParams = document.location.search
let urlParams = new URLSearchParams(queryParams)
let postId = urlParams.get('post_id')
let postWrapper = document.querySelector('#postWrapper')

headerFnc()

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/?_expand=user`)
.then(res => res.json())
.then(post => {
    
    console.log(post.userId)

    let postAuthor = document.createElement('h2')
    postAuthor.innerHTML = `<a href="./user.html?user_id=${post.userId}">Post of: ${post.user.name}</a>`

    let postTitle = document.createElement('h3')
    postTitle.classList.add('postTitle')
    postTitle.textContent = firstLetterToUppercase(post.title)
    
    let postItem = document.createElement('p')
    postItem.classList.add('postItem')
    postItem.textContent = firstLetterToUppercase(post.body)
    
    
    postWrapper.prepend(postAuthor,postTitle, postItem)
    
})