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
    super(name, age);
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
