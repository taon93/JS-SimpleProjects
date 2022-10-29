document.getElementById('button1').addEventListener('click', getSingleCustomer);
document.getElementById('button2').addEventListener('click', getAllCustomers);

let number = 1;
function getAllCustomers(event) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'allCustomers.json', true);
  xhr.onload = function(){ 
    if(this.status === 200) { 
      const customers = JSON.parse(this.responseText);
      let output = '';
      customers.forEach(function(customer){
        output += 
          `<ul>
            <li>ID: ${customer.id}</li>
            <li>Name: ${customer.name}</li>
            <li>Company: ${customer.company}</li>
            <li>Phone nr: ${customer.phone}</li>
          </ul>`;
      });
      document.getElementById('customers').innerHTML = output;
    }
  }
  xhr.send(); // triggers http request (I think so)
  event.preventDefault();
}

function getSingleCustomer(event) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'singleCustomer.json', true); //arguments: type of HTML request, source, isItSynchronous
  xhr.onload = function(){ // specifies what will be done when request is received
    if(this.status === 200) { // HTML request status == 200: OK
      const customer = JSON.parse(this.responseText);
      const output = 
        `<ul>
          <li>ID: ${customer.id}</li>
          <li>Name: ${customer.name}</li>
          <li>Company: ${customer.company}</li>
          <li>Phone nr: ${customer.phone}</li>
        </ul>`;
      document.getElementById('customer').innerHTML = output;
    }
  }
  xhr.send(); // triggers http request (I think so)

  // XML HTTP Request have different states of request processing: 
  // 0: request not initialized
  // 1: server connection established
  // 2: request received
  // 3: processing request
  // 4: request finished and response is ready
  // onload method is called when it will reach 4, alternative is onprogress: it will trigger every each state change of request

  xhr.onerror = function() { // will be called on request error
    console.log('Error happened');
  }
  event.preventDefault();
}