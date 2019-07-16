const square = function(x) {
    return x*x;
}

console.log(square(3));

// const squareArrow = (x) => {
//     return x*x;
// }

const squareArrow = (x) => x*x;
console.log(squareArrow(4));

const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
};
console.log(getFirstName('lilo zlata'));

const getLastName = (fullName) => fullName.split(' ')[1];
console.log(getLastName('lilo zlata'));

const add = (a, b) => {
    return a+b;
};
console.log(add(2,3,4)); // 5, 3. argument je nebitan (not bound)

const user = {
    name: 'bimba',
    cities: ['vinkuran', 'pula'],
    placesLived() {
        console.log(this.name);
        console.log(this.cities);

        this.cities.forEach((city) => {
            console.log(this.name + ' has lived in ' + city);
        });

        const cityMsgs = this.cities.map((city) => {
            return this.name + ' has lived in ' + city;
        });
    }
}
console.log(user.placesLived());

const multiplier = {
    numbers: [1,2,3,4,5,6],
    multiplyBy: 5,
    multiply() {
        console.log(this.numbers);
        const result = this.numbers.map((number) => {
            return number * this.multiplyBy;
        });
        return result;
    }
};
console.log(multiplier.multiply());