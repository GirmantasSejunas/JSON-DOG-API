const studentForm = document.querySelector('form');
let editedStudent = null;

const INITIAL_STUDENT_DATA =  [
    {name: 'petras',
    surname: 'petrauskas',
    age: 15,
    tel: 860011122,
    email:'aaa@aaa.aa',
    ItKnowledge: 4,
    group: 'type11',
    interest: 'C++',
    },
    {name: 'jonas',
    surname: 'jonauskas',
    age: 30,
    tel: 860033344,
    email:'bbb@bbb.bb',
    ItKnowledge: 6,
    group: 'type10',
    interest: 'javascript',
    },
    {name: 'antanas',
    surname: 'antanauskas',
    age: 40,
    tel: 860055566,
    email:'ccc@ccc.cc',
    ItKnowledge: 7,
    group: 'type7',
    interest: 'Python',
    },
    {name: 'algis',
    surname: 'algaitis',
    age: 55,
    tel: 860077788,
    email:'ddd@ddd.dd',
    ItKnowledge: 2,
    group: 'type10',
    interest: ['C++, jacascript']
    },
    {name: 'saulius',
    surname: 'saulaitis',
    age: 60,
    tel: 860099911,
    email:'eee@eee.ee',
    ItKnowledge: 9,
    group: 'type15',
    interest: ['C++, python']
    },
    {name: 'auguste',
    surname: 'augustaite',
    age: 6,
    tel: 862299911,
    email:'eee@eee.ee',
    ItKnowledge: 7,
    group: 'type5',
    interest: ['C++, python']
    }
    
    
]

function renderInitialData (students){
  students.map(student => {

      let studentName = document.createElement('p');
      studentName.innerHTML = `student name : ${student.name}`

      let studentSurname = document.createElement('p');
      studentSurname.innerHTML = `student surname : ${student.surname}`
      let studentAge = document.createElement('p')
      studentAge.innerHTML = `student age is/are : ${student.age}`

      let studentPhone = document.createElement('p')
      studentPhone.innerHTML = `student phone is : ${student.tel}`

      let studentEmail = document.createElement('p')
      studentEmail.innerHTML = `student mail is :${student.email}`

      let studentItKnowledge = document.createElement('p')
      studentItKnowledge.innerHTML = `student it knowledge : ${student.ItKnowledge}`

      let studentGroup = document.createElement('p')
      studentGroup.innerHTML = `student group : ${student.group}`

      let studentInterests = document.createElement('p')
      studentInterests.innerHTML = `student interest is/are : ${student.interest}`
      
      let divContainer = document.createElement('div')
      divContainer.classList.add('container')
      let studentList = document.createElement('ul')
      studentList.classList.add('student_list')
      let studentItem = document.createElement('li')
      studentItem.classList.add('student_item')

      document.body.append(divContainer)
      divContainer.append(studentList)
      studentList.append(studentItem)
      studentItem.append(studentName, studentSurname, studentPhone, studentEmail, studentItKnowledge, studentGroup, studentInterests)      
    })
}

renderInitialData(INITIAL_STUDENT_DATA )


const itKnowledgeInputElement = document.querySelector('#student-it-knowledge');
const itKnowledgeOutputElement = document.querySelector('#it-knowledge-output');

itKnowledgeInputElement.addEventListener('input', (event) => {
  
  itKnowledgeOutputElement.textContent = event.target.value;
});

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  let studentName = document.querySelector('#student-name').value;
  let studentSurname = document.getElementById('student-surname').value;
  // let studentAge = studentForm.querySelector('#student-age').value;
  let studentAge = event.target.querySelector('#student-age').value;
  let studentPhone = studentForm.querySelector('[name="phone"]').value;
  let studentEmail = event.target.elements.email.value;
  let studentItKnowledge = event.target.elements['it-knowledge'].value;
  // let studentGroup = document.querySelector('input[name="group"]:checked');
  let studentGroup = event.target.elements.group.value;
  let interests = document.querySelectorAll('input[name="interest"]:checked');

  // let studentNameInput = document.querySelector('#student-name');
  // studentNameInput.style.borderColor = '';

  // let inputErrorMessage = document.querySelector('.input-error-message');
  
  // if (inputErrorMessage) {
  //   inputErrorMessage.remove();
  // }

  // if (!studentName) {
  //   let alertText = 'Ne visi laukeliai užpildyti.';
  //   alertMessage(alertText, 'error-alert');

  //   studentNameInput.style.borderColor = 'red';

  //   let inputError = document.createElement('span');
  //   inputError.textContent = 'Šis laukelis yra privalomas';
  //   inputError.classList.add('input-error-message');

  //   studentNameInput.after(inputError);

  //   return;
  // }

  document.querySelectorAll('.input-error-message').forEach(input => input.remove());

  let requiredInputs = document.querySelectorAll('input.required');

  let validForm = true;

  requiredInputs.forEach(input => {
    input.classList.remove('input-error');

    if (!input.value) {
      inputErrorMessage(input, 'Šis laukelis yra privalomas.');
      validForm = false;
      return;
    }

    if (input.name === 'name' && input.value.length < 3) {
      inputErrorMessage(input, 'Vardas privalo būti bent 3 simbolių ilgumo.');
      validForm = false;
      return;
    }

    if (input.name === 'surname' && input.value.length < 3) {
      inputErrorMessage(input, 'Pavardė privalo būti bent 3 simbolių ilgumo.');
      validForm = false;
      return;
    }

    if (input.name === 'age') {
      if (input.value < 0) {
        inputErrorMessage(input, 'Amžius privalo būti teigiamas skaičius.');
        validForm = false;
        return;
      }

      if (input.value > 120) {
        inputErrorMessage(input, 'Įvestas amžius yra per didelis.');
        validForm = false;
        return;
      }
    }
    
    if (input.name === 'phone') {
      if (input.value.length < 9 || input.value.length > 12) {
        inputErrorMessage(input, 'Įvestas telefono numeris yra neteisingas.');
        validForm = false;
        return;
      }
    }
    
    if (input.name === 'email') {
      if (input.value.length < 5 || !input.value.includes('@')) {
        inputErrorMessage(input, 'Įvestas elektroninis paštas yra neteisingas.');
        validForm = false;
        return;
      }
    }
  })

  if (!validForm) {
    return;
  }

  let studentsList = document.querySelector('#students-list');
  let studentItem = document.createElement('div');
  studentItem.classList.add('student-item');

  let nameElement = document.createElement('p');
  nameElement.innerHTML = `<strong>Name:</strong> ${studentName}`;

  let surnameElement = document.createElement('p');
  surnameElement.innerHTML = `<strong>Surname:</strong> ${studentSurname}`;

  let ageElement = document.createElement('p');
  ageElement.innerHTML = `<strong>Age:</strong> ${studentAge}`;

  let phoneElement = document.createElement('p');
  // phoneElement.innerHTML = `<strong>Phone:</strong> ${studentPhone}`;
  phoneElement.innerHTML = `<strong>Phone:</strong> ****`;

  let emailElement = document.createElement('p');
  // emailElement.innerHTML = `<strong>Email:</strong> ${studentEmail}`;
  emailElement.innerHTML = `<strong>Email:</strong> ****`;

  let itKnowledgeElement = document.createElement('p');
  itKnowledgeElement.innerHTML = `<strong>IT Knowledge:</strong> ${studentItKnowledge}`;

  let groupElement = document.createElement('p');
  groupElement.innerHTML = `<strong>Group:</strong> ${studentGroup}`;

  let interestWrapperElement = document.createElement('div');
  interestWrapperElement.classList.add('interest-wrapper');

  let interestTitleElement = document.createElement('h4');
  interestTitleElement.classList.add('interest-title');
  interestTitleElement.textContent = 'Interests:';

  let interestListElement = document.createElement('ul');
  interestListElement.classList.add('interest-list');

  interests.forEach(interest => {
    let interestItemElement = document.createElement('li');
    interestItemElement.textContent = interest.value;
    
    interestListElement.append(interestItemElement);
  });

  interestWrapperElement.append(interestTitleElement, interestListElement);

  let privateInfoButton = document.createElement('button');
  privateInfoButton.textContent = 'Show student';

  // let hiddenData = true;
  // privateInfoButton.addEventListener('click', () => {
  //   if (hiddenData) {
  //     phoneElement.innerHTML = `<strong>Phone:</strong> ${studentPhone}`;
  //     emailElement.innerHTML = `<strong>Email:</strong> ${studentEmail}`;
  //     privateInfoButton.textContent = 'Slėpti asmens duomenis';
  //   } else {      
  //     phoneElement.innerHTML = `<strong>Phone:</strong> ****`;
  //     emailElement.innerHTML = `<strong>Email:</strong> ****`;
  //     privateInfoButton.textContent = 'Rodyti asmens duomenis';
  //   }

  //   hiddenData = !hiddenData;
  // });

  privateInfoButton.addEventListener('click', () => {
    if (!privateInfoButton.classList.contains('hide')) {
      phoneElement.innerHTML = `<strong>Phone:</strong> ${studentPhone}`;
      emailElement.innerHTML = `<strong>Email:</strong> ${studentEmail}`;
      privateInfoButton.textContent = 'Slėpti asmens duomenis';
    } else {      
      phoneElement.innerHTML = `<strong>Phone:</strong> ****`;
      emailElement.innerHTML = `<strong>Email:</strong> ****`;
      privateInfoButton.textContent = 'Rodyti asmens duomenis';
    }

    privateInfoButton.classList.toggle('hide');
  });

  let deleteStudentButton = document.createElement('button');
  deleteStudentButton.textContent = 'Remove student';

  deleteStudentButton.addEventListener('click', () => {
    studentItem.remove();
    let messageText = `Student deleted (${studentName} ${studentSurname})`;
    alertMessage(messageText);
  });

//   SEPTINTA UŽDUOTIS:
// 1. Prie kiekvieno studento pridėti mygtuką, kurį paspaudus leistų redaguoti studento duomenis.
// 2. Redaguojant studentą, submit mygtuko tekstas turėtų pasikeisti į „Save Changes".
// 3. Pakeitus studento duomenis, turi iššokti <span> elementas, kuris informuoja apie studento duomenų redagavimą: „Studento (Vardas Pavardė) duomenys sėkmingai pakeisti". Šis span elementas dingsta po 5 sekundžių.

  // 1. Sukurti Edit mygtuką.
  let editStudentButton = document.createElement('button');
  editStudentButton.textContent = 'Edit';

  // 2. Prie mygtuko pridėti event listener'į.
  editStudentButton.addEventListener('click', () => {

    // 3. Surinkti studento duomenis ir jais užpildyti formos laukelius.

    // document.querySelector('#student-name').value = studentName;
    studentForm.elements.name.value = studentName;
    // document.querySelector('#student-surname').value = studentSurname;
    studentForm.elements.surname.value = studentSurname;
    // document.querySelector('#student-age').value = studentAge;
    studentForm.elements.age.value = studentAge;
    // document.querySelector('#student-phone').value = studentPhone;
    studentForm.elements.phone.value = studentPhone;
    // document.querySelector('#student-email').value = studentEmail;
    studentForm.elements.email.value = studentEmail;
    studentForm.elements.group.value = studentGroup;
    document.querySelector('#student-it-knowledge').value = studentItKnowledge;
    studentForm.elements['it-knowledge'].value = studentItKnowledge;

    studentForm.elements.interest.forEach(formInterest => {
      formInterest.checked = false;
      interests.forEach(studentInterest => {
        if (studentInterest.value === formInterest.value) {
          formInterest.checked = true;
        }
      });
    });

    // 4. Pakeisti formos submit mygtuko tekstą.
    studentForm.querySelector('[type="submit"]').value = 'Save Changes';

    // 5. Išsaugoti studento HTML elementą kintamąjame.
    editedStudent = studentItem;

  });

  studentItem.append(nameElement, surnameElement, ageElement, phoneElement, emailElement, itKnowledgeElement, groupElement, interestWrapperElement, privateInfoButton, deleteStudentButton, editStudentButton);

  // 6. Submit event'o metu patikrinti ar kuriame naują studentą, ar redaguojame jau sukurtą.
  if (editedStudent) {
    // 7. Jeigu studentas redaguojamas, šį naują (redaguotą) HTML elementą panaudoti perrašant seną studento HTML elementą (kuris išsaugotas 5 žingsnyje).

    // editedStudent kintamasis saugo originalaus studentItem reikšmę
    console.log(editedStudent);

    // studentItem kintamasis saugo dabartinę formos studento reikšmę
    console.log(studentItem);

    // editedStudent.innerHTML = studentItem.innerHTML;
    editedStudent.replaceWith(studentItem);
    editedStudent = null;

    let alertText = `Student edited (${studentName} ${studentSurname})`;
    alertMessage(alertText);

    // 8. Pakeisti formos submit mygtuko tekstą į pradinį ir pakeisti iššokančio pranešimo tekstą.
    studentForm.querySelector('[type="submit"]').value = 'Submit';

  } else {
    studentsList.prepend(studentItem);

    let alertText = `Student created (${studentName} ${studentSurname})`;
    alertMessage(alertText);
  }

  // studentForm.reset();
  event.target.reset();
});




function alertMessage(text, elementClass = '') {
  const alertElement = document.querySelector('#alert');
  alertElement.textContent = text;

  if (elementClass) {
    alertElement.classList.add(elementClass);
  }

  setTimeout(() => {
    alertElement.textContent = '';
    if (elementClass) {
      alertElement.classList.remove(elementClass);
    }
  }, 5000);
}

function inputErrorMessage(inputElement, errorMessage) {
  let alertText = 'Ne visi laukeliai užpildyti.';
  alertMessage(alertText, 'error-alert');

  inputElement.classList.add('input-error');

  let inputError = document.createElement('span');
  inputError.textContent = errorMessage;
  inputError.classList.add('input-error-message');

  inputElement.after(inputError);
}