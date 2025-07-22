class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log("my name is ", this.name, "and  age", this.age);
  }
}

class Student extends Person {
  constructor(name, age, grade, section) {
    super(name, age); // super to be on top of the constructor class
    this.grade = grade;
    this.section = section;
  }
  studentinfo() {
    this.introduce();
    console.log("of grade ", this.grade, "and section", this.section);
  }
}

const s1 = new Student("SPY", 22, 11, "B");
s1.studentinfo();
s1.introduce();
const p1 = new Person("SPEED", 22);
p1.introduce();

p1.studentinfo(); // error , comment this for futher use

// hack can be used we can set prototype properties in p1 from student
Object.setPrototypeOf(p1, Student.prototype);

p1.studentinfo();
