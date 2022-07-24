import headerFnc from './header.js'


function init () {
    headerFnc()
let createUserForm = document.querySelector('#create-user-form')

createUserForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let name = event.target.elements.name.value
    let userName = event.target.elements.username.value
    let email = event.target.elements.email.value
    let street = event.target.elements.street.value
    let suite = event.target.elements.suite.value
    let city = event.target.elements.city.value
    let zipcode = event.target.elements.zip.value
    let phone = event.target.elements.phone.value
    let website = event.target.elements.website.value
    let companyName = event.target.elements['company-name'].value
    let companyCatchphrase = event.target.elements['company-catchphrase'].value
    let companyBs = event.target.elements['company-bs'].value

   let userData = {
        name,
        userName,
        email,
        adress:{
            street,
            suite,
            city,
            zipcode,
        },
        phone,
        website,
        company:{
            name: companyName,
            catchphrase: companyCatchphrase,
            bs: companyBs,
        }
    }
    console.log(userData)
    event.target.reset()
})


}


init()