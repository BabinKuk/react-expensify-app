console.log('classes 1');

class Person {
    constructor(name = 'Anonymous', age = 0) {
        this.name = name;
        this.age = age;
    }

    getGreeting() {
        //return 'Hi, ' + this.name + '!';
        return `Hi, ${this.name}!`;
    }

    getDescription() {
        return `${this.name} is ${this.age} year(s) old.`
    }
}

class Student extends Person {
    constructor(name, age, major = 'Undecided') {
        super(name, age); // Person
        this.major = major;
    }

    hasMajor() {
        return !!this.major;
    }

    // override parent method
    getDescription() {
        let desc = super.getDescription();

        if (this.hasMajor()) {
            desc += ` Their major is ${this.major}.`;
        }
        return desc;
    }
}

class Traveller extends Person {
    constructor(name, age, homeLocation) {
        super(name, age);
        this.homeLocation = homeLocation;
    }

    //override parent method
    getGreeting() {
        let greeting = super.getGreeting();

        if (this.homeLocation) {
            greeting += ` You're coming from ${this.homeLocation}.`;
        }

        return greeting;
    }
}

const me = new Person('Bimba', 7);
console.log(me.getGreeting());
console.log(me.getDescription());

const you = new Person();
console.log(you.getGreeting());
console.log(you.getDescription());

const her = new Student('Samba', 10, 'Computer Science');
console.log(her.getGreeting());
console.log(her.getDescription());
console.log(her.hasMajor());

const other = new Traveller('Rumba', 10, 'Vinkuran');
console.log(other.getGreeting());
console.log(other.getDescription());
