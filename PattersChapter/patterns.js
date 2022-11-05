// MODULE PATTERN
const modulePattern = (function(){
  let someText = "hello world"; // private var
  const changeText = function() {
    document.querySelector('.hi').textContent = someText;
  }
  return {
    callChangeText : function () {changeText(); console.log(someText);}
  }
})();

// REVEALING MODULE PATTERN
const revealingModulePattern = (function(){
  const _data = [];
  function add(elem) {
    _data.push(elem);
    console.log(`${elem} added to the data...`);
  }

  function get(id) {
    return _data.find(elem => elem.id === id);
  }
  return {
    add, get
  }
})();

// SINGLETON PATTERN

const singleton = (function() {
  let _instance;
  function getInstance() {
    if(!_instance)
      _instance = new Object({name: 'Maciej', surname: 'Nabialek', id: 3});
    return _instance;
  }
  return { getInstance }
})();

// OBSERVER PATTERN

class ObserverPattern {
  constructor() {
    this.observers = [];
  }
  subscribe(fn) {
    this.observers.push(fn);
    console.log(`${fn.name} was subscribed as an observer`);
  }

  unsubsribe(fn) {
    this.observers = this.observers.filter(subed => {
      if(subed.name !== fn.name)
        return true;
      return false;
      });
    console.log(`${fn.name} was unsubscribed from observers`);
  }
  fireObservedEvents() {
    this.observers.forEach(fn => fn.call());
  }
}
const clicObserver = new ObserverPattern();
document.getElementById('btn-ms-sub').addEventListener('click', function(){
  clicObserver.subscribe(milisecondsLogger);
});
document.getElementById('btn-ms-unsub').addEventListener('click', function() {
  clicObserver.unsubsribe(milisecondsLogger);
});
document.getElementById('btn-fire').addEventListener('click', function() {
  clicObserver.fireObservedEvents();
});

function milisecondsLogger() {
  console.log(`Current miliseconds: ${(new Date).getMilliseconds()}`);
}

// MEDIATOR PATTERN

class User {
  constructor(name) {
    this.name = name;
    this.chatroom = null;
  }
  send(message, to) {
    if(!this.chatroom) console.log(`${this.name} is not registered to the chatroom`);
    else this.chatroom.send(message, this.name, to);
  }
  receive(from, message) {
    console.log(`Message from ${from} to ${this.name}: ${message}`);
  }
}

class Chatroom { // Mediator between Users
  constructor() {
    this.users = [];
  }
  register(user) {
    this.users.push(user);
    user.chatroom = this;
  }
  send(message, from, to) {
    if(to){ const user = this.users.find(user => user.name === to.name);
      user.receive(from, message);}
    else 
      this.users
        .filter(user => user.name !== from)
        .forEach(user => user.receive(from, message));
  }
}

// STATE PATTERN 




  //**************************************************************//
 //************** USAGE - uncomment to see changes **************//
//**************************************************************//

// MODULE PATTERN:
// modulePattern.callChangeText();

// REVEALING MODULE PATTERN:
// revealingModulePattern.add({name: 'Maciek', surname: 'Nabialek', id: 5});
// revealingModulePattern.add({name: 'Bartek', surname: 'Suski', id: 3});
// console.log(revealingModulePattern.get(3));

// SINGLETON PATTERN:
// const obj1 = singleton.getInstance();
// const obj2 = singleton.getInstance();
// if(obj1 === obj2) console.log('Those are the same people, they have the same clothes');

// Usage of Observer Patttern is above in example: this is done on the index.html

// MEDIATOR PATTERN

// const jeff = new User('Jeff');
// const mac = new User('Mac');
// const kate = new User('Kate');

// const chat = new Chatroom();
// chat.register(jeff);
// chat.register(mac);
// chat.register(kate);

// kate.send('Mac I really fancy you!', mac);
// mac.send('Oh, really Kate, it is nice to hear that but I am affraid that I cannot answer your feelings in a way that you want to :/', kate)
// jeff.send('I want to fuck you!');


