console.log('destructure');

const person = {
    name: 'Bimba',
    age: 7,
    location: {
        city: 'Pula',
        temperature: 29
    }
};

// destructure object
//const name = person.name;
//const age = person.age;
const {name: firstName = 'Anonymous', age, weight = 3} = person;

console.log(`${firstName} is ${age} years old and weights ${weight} kg`);

const {city, temperature: temp} = person.location;

if (city && temp) {
    console.log(`${firstName} is ${age} and lives in ${city}. It's ${temp}C over there`);
}

const book = {
    title: "Ego is the enemy",
    author: "Ryan Holiday",
    publisher: {
        name: 'Penguin'
    }
};

const {name: publisherName = 'Self-Publisher'} = book.publisher;
console.log(publisherName);


// array destructuring
const address = ['Vinkuran Centar 21', 'Pula', 'HR', '52100'];

const [/*street ne zanima nas*/, town, state = 'HRK', zip] = address;
console.log(`You're in ${state}-${zip} ${town}`);

const item = ['Coffee', '$2.00', '$2.50', '$3.00'];
const [itemName, , mediumPrice] = item;

console.log(`Medium ${itemName} costs ${mediumPrice}.`);