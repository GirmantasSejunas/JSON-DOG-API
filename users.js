import headerFnc from './header.js'

headerFnc()
let divWrapperElement = document.querySelector('#wrapper')


fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.json())
.then(users =>{

    users.map(user =>{

        let userWrapper = document.createElement('div')
        userWrapper.classList.add('userWrapper')

        let userFullName = document.createElement('p')
        userFullName.innerHTML = `User name is : <a href="./user.html?user_id=${user.id}"> ${user.name}</a>`
        userFullName.classList.add('userFullName')

        let userNickName = document.createElement('p')
        userNickName.textContent = `User nick is : ${user.username}`
        userNickName.classList.add('userNickName')

        let userEmail = document.createElement('p')
        userEmail.textContent = `User email is : ${user.email}`
        userEmail.classList.add('userEmail')
        
        let userPhone = document.createElement('p')
        userPhone.textContent = `User phone is : ${user.phone}`
        userPhone.classList.add('userPhone')

        let userWebsite = document.createElement('p')
        userWebsite.textContent = `User website : ${user.website}`
        userWebsite.classList.add('userWebsite')

        let userWorkplace = document.createElement('p')
        userWorkplace.textContent =  `User works in ${user.company.name} company.`
        userWorkplace.classList.add('userWorkplace')


        let userAdress = document.createElement('p')
        userAdress.classList.add('userAdress')

        let userAdressStreet = user.address.street
        let userAdressSuite = user.address.suite
        let userAdreesCity = user.address.city
        let userAdreesZipcode = user.address.zipcode

        userAdress.append(userAdressStreet, userAdressSuite, userAdreesCity, userAdreesZipcode)

        divWrapperElement.append(userWrapper)
        userWrapper.append(userFullName, userNickName, userEmail, userPhone, userWebsite, userWorkplace)


    })
})