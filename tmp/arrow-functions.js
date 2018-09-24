class Person {
  constructor(){
    this.age = 1;
    this.fn2 = () => this.age;

  }

  fn(){return this.age}

}


const p = new Person();

fn = p.fn;
fn2 = p.fn2;
// console.log(fn());
console.log(fn2());
class Bla {
  constructor() {
    this.age = 2;
    const p = new Person();
    this.fn2 = p.fn2;
  }
}
console.log((new Bla).fn2());