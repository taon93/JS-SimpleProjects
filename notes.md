## API
- API stands for Application Programming Interface, it is interface of any type that takes request from client and delivers response (from itself, from other program or mixed -> it is endpoint for client).
- APIs have endpoints for specific requests for web APIs this will be domains in conjunction with HTML request type (GET, POST, PUT, DELETE etc).

## Fetch API: 
- this is API similar to AJAX but newer and (probably) better, window object has member fetch
- fetch returns promise Object - it is asynchronous by default. **new Promise((resolve, reject) => {Body})**
- fetch returns nested Promise (I don't know why) so to unpack actual response use:
  ```
  fetch('http://example.com/movies.json')
    .then((response) => response.json()) // first Promise: response consist of all HTTP response: with headers .json takes data and resolves it as JSON format
    .then((data) => console.log(data)); // this block is actually dealing with data and how to process it
  ```
- in fetch API HTML errors **are NOT** handled by default by .catch() -> response must be checked: res.ok field tells if http request ended with error or not: 
  ```
      fetch('https://devcamper.io/api/v1/bootcamps/34343')
      .then(res => res.json())
      .then(res => {
        if (!res.ok) {
           throw new Error(res.error);
        }
        return res;
      })
      .catch(err => console.log(err));
  ```
  ### OR
  ```
    function handleErrors(res) {
      if (!res.ok) throw new Error(res.error);
      return res;
    }
     
    fetch('https://devcamper.io/api/v1/bootcamps/34343')
      .then(res => res.json())
      .then(handleErrors)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
   ```  

   - Typical uses of fetch for **GET** and **POST** HTTP methods
  ```
  class EasyHttp {

    httpGetOnUrl(url) {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then(result => result.json())
          .then(data => resolve(data))
          .catch(err => reject(err));
      })
        
    }

    httpPostOnUrl(url, data) {
      return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(result => result.json())
          .then(data => resolve(data))
          .catch(err => reject(err));
      });
    }
  }
  ```
- Async keyword: async keyword in function definition makes this function return Promise object:
  ```
  async function myFunc() { // even though myFunc should return 'HELLO' in fact it returns Promise with body tied to then method
    return 'HELLO';
  }

  myFunc().then(res => console.log(res)); // usage of the Promise
  ```
- Await keyword: await keyword synchronizes async functions: it will block execution until async function is not completed. Usage: 
  ```
  async function getUsers() {
    const response = await fetch('someDomainUrl'); // fetch returns promise but it will be process only when resolved - in synchronous way due to await keyword
    const data = await response.json(); // response was also promise
    return data;
  }
  ```
## Lambdas AKA "Arrow Function"

- Lambdas in class declaration preserve **this** operator: inside of method you cannot use:
  `
  function() { 
    this.someField.someAction();
    //rest of the body
  }
  `
  **but you can** 
  `
  () => {
    this.someField.someAction();
    //rest of the body
  }
  `
- Look out if you want to return Object literal in lambda: 
  `const sayHello = () => {msg: 'Hello'};` : lambda will take curly braces as a body of the function not Object boundaries. To avoid that wrap Object in normal parentheses: `const sayHello = () => ({msg: 'Hello'});`
- Single parameter lambda don't need parentheses: ```name => console.log(`Hello ${name}`);```
