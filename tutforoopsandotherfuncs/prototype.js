function Person(name) {
  this.name = name;
}
Person.prototype.tell = function () {
  console.log(this.name, " ,hey how are you");
};

const p1 = new Person("SPEEDY");
p1.tell();
//p1 does not have a tell() method directly.

//JavaScript looks up the prototype chain: p1 → Person.prototype → Object.prototype.

