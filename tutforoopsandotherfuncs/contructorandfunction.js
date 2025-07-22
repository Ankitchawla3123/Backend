// OOPS Some concepts
// const person = {
//   name: "ankit",
//   age: "22",
//   greet: function () {
//     console.log(this.name);
//   },
// };

// constructor
function Person(name) {
  this.name = name;
  this.greet = function () {
    console.log("Hi, I am " + this.name);
  };
}

const p1 = new Person("SPY");
p1.greet();
console.log(typeof p1);
console.log(p1);
