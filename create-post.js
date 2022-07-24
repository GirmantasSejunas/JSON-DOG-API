let formWrapper = document.querySelector('#formWrapper')
let postForm = document.querySelector('.postForm')
let postInput = document.querySelector('#postTitle')
let postText = document.querySelector('#postText')
let submitBtn = document.querySelector('.submitBtn')
let authors = document.querySelector('#authors')
let outputWrapper = document.querySelector('#outputWrapper')

fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.json())
.then( users =>{
    users.map(user =>{
        let usersList = document.createElement('option')
        usersList.getAttribute('value')
        usersList.value = user.id
    let userName = user.name
    
    authors.append(usersList)
    usersList.append(userName)
    })
})

submitBtn.addEventListener("click", event => {
    event.preventDefault()
    outputWrapper.textContent = ''
    
    let postTitle = event.target.form.elements.postTitle.value
    let authorName = event.target.form.elements.authors.value
    let postText = event.target.form.elements.postText.value

        fetch(`https://jsonplaceholder.typicode.com/posts`, 
        {
        method: 'POST',
            body: JSON.stringify({
                title: `${postTitle}`,
                body: `${postText}`,
                userId: `${authorName}`,
            }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })


    .then(res => res.json())
    .then(data => {
        console.log(data)

        fetch(`https://jsonplaceholder.typicode.com/users/${authorName}`)
        .then (res => res.json())
        .then (users =>{
            console.log(users)
                  
                let newPostTitle = document.createElement('h2')
                newPostTitle.textContent = data.title

                let newPostText = document.createElement('p')
                newPostText.textContent = data.body

                
                let newPostId = document.createElement('p')
                newPostId.innerHTML = `post id: ${data.id}`

                let newPostUserId = document.createElement('p')
                newPostUserId.innerHTML = `user id: ${data.userId}`

                let authorName = document.createElement('p')
                authorName.innerHTML = `author : ${users.name}`
                
                outputWrapper.append(newPostTitle, newPostText, newPostUserId,authorName, newPostId)
        })


    })
})