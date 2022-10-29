// As I understand, prototype in JS object is used for creating common part for all objects of specified class - as normal methods in class scope in C++ and Java
function Person(firstName, lastName, dateOfBirth) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthday = new Date(dateOfBirth);
}
// This is usage of prototype:
Person.prototype.calculateAge = function() {
  const diff = Date.now() - this.birthday.getTime();
  const ageDate = new Date(diff);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

Person.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
}

const mary = new Person('Mary', 'Smith', '3 March 1965');
console.log(mary.calculateAge()); // usage - without prototype: mary.calculateAge() instead of mary.prototype.calculateAge();

//prototype has its own properties related to Object class:
console.log(mary.hasOwnProperty('lastName')); // returns true: this is part of the Person
console.log(mary.hasOwnProperty('getFullName')); // returns false because getFullName is not part of Person property - it is part of the prototype

//INHERITANCE
//Customer: will inherit from Person

function Customer(firstName, lastName, phone, membership, dob) {
  Person.call(this, firstName, lastName, dob); // .call() enables to call other function from same context
  this.phone = phone;
  this.membership = membership;
}

const customerTom = new Customer('Tom', 'Jones', '324-132-546', 'Standard', '20 June 1993');
console.log(customerTom);

//right now Customer is not yet inheriting Person
Customer.prototype = Object.create(Person.prototype);

//after this command Customer.prototype is of type Person
console.log(customerTom);

Customer.prototype.constructor = Customer;

//Object.create: lets you create object of given type:
const customerJohn = Object.create(Customer, 
  {
    firstName: {value: 'John'},
    lastName: {value: 'Kavinsky'},
    phone: {value: "784-391-301"},
  });
console.log(customerJohn);

// ES6: Above syntax of polymorphism, inheritance and constructors may be changed by using ES6 format: this is syntax sugar but is more similar to Java and C syntax
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
class Animal {
  constructor(name, systematicFamily) {
    this.name = name;
    this.systematicFamily = systematicFamily;
  }
  makeSound() {
    return "Some animalistic sound";
  }
  static saySomething() { // static methods
    return "Pain is unbearable, killll MEEEE!";
  }
}

class Fish extends Animal {
  constructor(name, systematicFamily, depthOfLiving, typeOfWater) {
    super(name, systematicFamily);
    this.depthOfLiving = depthOfLiving;
    this.typeOfWater = typeOfWater;
  }
  makeSound() { //polymorphysm
    return "Bool bool";
  }

}

const dog = new Animal('Canis familiaris', 'Canide');
console.log(dog.makeSound());
console.log(Animal.saySomething());

const fish = new Fish('Silurus glanis', 'Siluridae', 10, 'sweet');
console.log(fish.makeSound());