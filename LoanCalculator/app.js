const loanSubmit = document.querySelector('#loan-form');
const loanAmountInput = document.querySelector('#amount');
const interestInput = document.querySelector('#interest');
const yearsToRepayInput = document.querySelector('#years');
const loadingGif = document.querySelector('#loading');
const resultsTab = document.querySelector('#results');


const monthlyPaymentOutput = document.querySelector('#monthly-payment');
const totalPaymentOutput = document.querySelector('#total-payment');
const totalInterestOutput = document.querySelector('#total-interest');

addEventListers();

function addEventListers() {
  loanSubmit.addEventListener('submit', calculateAndDisplayPaymentInformation);
}

function calculateAndDisplayPaymentInformation(event) {
  resultsTab.style.display = 'none';
  loadingGif.style.display = 'block';
  
  
  setTimeout(calculateResults, 2000)
  
  event.preventDefault();
}

function calculateResults() {
  const principal = parseFloat(loanAmountInput.value);
  const calculatedInterest = parseFloat(interestInput.value) / (100 * 12);
  const calculatedPayments = parseFloat(yearsToRepayInput.value) * 12;
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthlyPayment = x * principal * calculatedInterest / (x - 1);
  if(isFinite(monthlyPayment)) {
    monthlyPaymentOutput.value = monthlyPayment.toFixed(2);
    totalPaymentOutput.value = (monthlyPayment * calculatedPayments).toFixed(2);
    totalInterestOutput.value = (totalPaymentOutput.value - principal).toFixed(2);
    resultsTab.style.display = 'block';
    loadingGif.style.display = 'none';
  } else {
    showError("Please check your numbers");
    loadingGif.style.display = 'none';
  }
}

function showError(error) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger'
  errorDiv.appendChild(document.createTextNode(error));
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
