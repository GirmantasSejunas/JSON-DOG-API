import headerFnc from './header.js'
import {firstLetterToUppercase} from './function.js'

let containerElement = document.querySelector('#container')
let albumsContainer = document.querySelector('#albumsContainer')

headerFnc()
fetch('https://jsonplaceholder.typicode.com/posts?_limit=12')
.then(res => res.json())
.then(posts => {

        
        posts.map(post => {


            let postTitleAndBodyElement = document.createElement('div')
            postTitleAndBodyElement.classList.add('postDivElement')
            
            let postTitle = post.title
            let postTitleElement = document.createElement('h2')
            postTitleElement.textContent = firstLetterToUppercase(postTitle)
            
            let postAuthorElement = document.createElement('span')
            postAuthorElement.classList.add('postAuthorElement')

            
            let postBody = post.body
            let postBodyElement = document.createElement('p')
            postBodyElement.textContent = firstLetterToUppercase(postBody)
            
            let commentsDivElement = document.createElement('div')
            commentsDivElement.classList.add('commentsDivElement')
            
            let showButton = document.createElement('button')
            showButton.textContent = `Show comments`
            
            
            postTitleAndBodyElement.append(postTitleElement, postAuthorElement, postBodyElement, showButton, commentsDivElement)
            containerElement.prepend(postTitleAndBodyElement)
            
            fetch('https://jsonplaceholder.typicode.com/users/' + post.userId)
            .then(res => res.json())
            .then(user => {
                postAuthorElement.innerHTML = `Author is : <a href="./user.html?user_id=${user.id}">${user.name}</a>`
            })


            

            showButton.addEventListener('click', () => {
                if(!showButton.classList.contains('hide')){
                    showButton.textContent = 'Hide comments'
                    commentsDivElement.style="display:block;"

                    fetch(`https://jsonplaceholder.typicode.com/posts/${post.userId}/comments`)
                    .then(res => res.json())
                    .then(comments => {
                        comments.map(comment => {
        
                            
                            let commentDivItem = document.createElement('div')
                            commentDivItem.classList.add('commentsDivItem')
                            
                            let commentsTitleElement = document.createElement('h3')
                            commentsTitleElement.textContent = firstLetterToUppercase(comment.name)
                            
                            let commentsEmailElement = document.createElement('p')
                            commentsEmailElement.innerHTML = `<a href=""mailto:${comment.email}">${comment.email}</a>`
                            
                            let commentsBodyElement = document.createElement('p')
                            commentsBodyElement.textContent = firstLetterToUppercase(comment.body)
                            
                            
                            commentsDivElement.append(commentDivItem)
                            commentDivItem.append(commentsTitleElement, commentsEmailElement, commentsBodyElement)
                        })
                    })
                }else {
                    showButton.textContent = `Show comments`
                    commentsDivElement.style="display:none;"
                
                    
                }
                showButton.classList.toggle('hide')

            })
        })
    })
            


fetch('https://jsonplaceholder.typicode.com/albums/?_limit=20')
.then(res => res.json())
.then(albums => {
    
    albums.map(album => {

        let albumItem = document.createElement('div')
        albumItem.classList.add('albumItem')
        
        fetch('https://jsonplaceholder.typicode.com/users/' + album.userId)
        .then(res => res.json())
        .then(user =>{
            
            fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos?_limit-20`)
            .then(res => res.json())
            .then(photos =>{

                fetch('http://shibe.online/api/shibes')
                .then(res => res.json())
                .then ( images => {
                    images.map(image => {

                  
                        let albumTitle = document.createElement('h3')
                        albumTitle.classList.add('albumTitle')
                        albumTitle.innerHTML = `<a href="./album.html?album_id=${user.id}&album_title=${album.title}&album_userId=${album.userId}">${firstLetterToUppercase(album.title)}</a>`
                
                        let albumAuthor = document.createElement('span')
                        albumAuthor.classList.add('albumAuthor')
                        albumAuthor.innerHTML = `<a  href ="./user.html?user_id=${user.id}">Album author : ${user.name}</a>`
                
                        let albumImgWrapper = document.createElement('div')
                        albumImgWrapper.classList.add('albumImgWrapper')

                        let albumImg = document.createElement('img')
                        albumImg.src = image
                
                        albumImgWrapper.append(albumImg)
                        albumsContainer.append(albumItem)
                        albumItem.append(albumTitle, albumAuthor, albumImgWrapper)
                    })

                })
            })

        })

    })
})