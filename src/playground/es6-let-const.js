var nameVar = 'bimba';
console.log('nameVar', nameVar);

// cannot be redefined
let nameLet = 'samba';
//let nameLet = 'zlata';
nameLet = 'zlata';
console.log('nameLet', nameLet);

// cannot be redefined or reasigned
const nameConst = 'rumba';
//const nameConst = 'lilo';
//nameConst = 'lilo';
console.log('nameConst', nameConst);

// block level scoping
let fullName = 'Vinkuran centar';
let firstName;

if (fullName) {
    firstName = fullName.split(' ')[0];
    console.log(firstName);
}