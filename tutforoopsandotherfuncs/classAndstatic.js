class Person {
  static count = 0;
  static ageinc() {
    console.log(this.age); // undefined
    this.age += 1;
    console.log(this.age); // NaN as it is not dependent on the object where age is initialized, it is always depenedend on static variables
    this.count += 1;
    console.log(this.count);
  }
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  happybirthday() {
    console.log("Happy birthday day dear");
    Person.ageinc(); // this.ageinc wont work it will call this for object not the class
    console.log(this.age);
    this.age++;
    console.log(this.age);
    console.log(this.count); // undefined as we cannot call static component from this as they are connected to the class not the object formed by it and the thiss inside the happy birthday is called by the object
    Person.count++;
    console.log(Person.count);
    this.count++;
    console.log(this.count); // NaN trying to add +1 in undefined
  }
}

const p1 = new Person("SPY", "22");
p1.happybirthday();
