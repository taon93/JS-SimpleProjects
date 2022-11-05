const nameBar = document.getElementById('name');
const zipcodeBar = document.getElementById('zipcode');
const emailBar = document.getElementById('email');
const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', checkAndSubmitForm);

function checkAndSubmitForm(event) {
  const name = nameBar.value;
  console.log(name);
  if((/[A-Z][a-z]{1,9}/).test(name))
    console.log(name);
  else
    clearInputAndDisplayError(nameBar);

  const zipcode = zipcodeBar.value;
  console.log(zipcode);
  if(zipcode.match(/[0-9]{2}-[0-9]{3}/) !== null)
    console.log(zipcode);
  else
    clearInputAndDisplayError(zipcodeBar);

  const email = emailBar.value;
  console.log(email);
  if(email.match(/[A-Za-z_.0-9]*@[a-z]*.(com|pl|net|org)/) !== null)
    console.log(email);
  else
    clearInputAndDisplayError(emailBar);
  
  event.preventDefault();
}

function clearInputAndDisplayError(uiElement) {
  uiElement.classList.add('is-invalid'); // is-invalid is a class that will enable displaing error message marked in invalid-feedback class
  uiElement.addEventListener('focus', removeErrorPrompt);
}

function removeErrorPrompt(event) {
  event.target.classList.remove('is-invalid');
}