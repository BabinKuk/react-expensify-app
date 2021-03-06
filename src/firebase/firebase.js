import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// init database
const database = firebase.database();

// init providers to enable authentication
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

export { firebase, googleAuthProvider, githubAuthProvider, database as default };

// TEST
// // // add test data
// // database.ref().set({
// //     name: 'Bimba',
// //     age: 7,
// //     isSingle: true,
// //     stressLEvel: 5,
// //     job: {
// //         title: 'Guardian',
// //         company: 'Vinkuran'
// //     },
// //     location: {
// //         city: 'Vinkuran',
// //         country: 'HR'
// //     }
// // }).then(() => {
// //     console.log('data saved');
// // }).catch((err) => {
// //     console.log('Failed', err);
// // });
// // // overwrite above record 
// // //database.ref().set('Zlata');

// // // overwrite age property
// // //database.ref('age').set(8);

// // //overwrite city inside location
// // //database.ref('location/city').set('Pula');

// // // attributes height, weight
// // database.ref('attributes').set({
// //     weight: 20,
// //     height: 110
// // }).then(() => {
// //     console.log('Attributes added');
// // }).catch((err) => {
// //     console.error('Attributes error', err);
// // });

// // // remove data
// // database.ref('isSingle').remove().then(() => {
// //     console.log('isISngle removed successfully');
// // }).catch((err) => {
// //     console.error('Remove failed ', err);
// // });

// // // update data
// // // update method affects only selected attributes
// // // set method affects all attributes
// // database.ref().update({
// //     name: 'Lilo',
// //     age: 10,
// //     job: 'Guardian'
// // });

// // // update data in nested objects
// // // using '' and /
// // // other nested attributes are unchanged
// // database.ref().update({
// //     'location/city': 'Pula'
// // }).then(() => {
// //     console.log('1. update success');    
// // }).catch((err) => {
// //     console.error('1. update error ', err);
// // });

// // // update stressLEvel, job.company, location.city
// // database.ref().update({
// //     stressLEvel: 3,
// //     'job/company': 'Dolija',
// //     'location/city': 'Vinkuran Pula'
// // }).then(() => {
// //     console.log('2. update success');
// // }).catch((err) => {
// //     console.error('2. update error ', err);
// // });

// // // fetching all data from firebase
// // // only once!!
// // database.ref().once('value').then((snapshot) => {
// //     console.log(snapshot);
// //     console.log('Data fetched succesfully ', snapshot.val());
// // }).catch((err) => {
// //     console.error('Error fetching data ', err);
// // });

// // // fetching selected data from firebase
// // // only once!!
// // database.ref('location/city').once('value').then((snapshot) => {
// //     console.log(snapshot);
// //     console.log('Data fetched succesfully ', snapshot.val());
// // }).catch((err) => {
// //     console.error('Error fetching data ', err);
// // });

// // // fetching data from database 
// // // every time the data changes
// // // subscribe to database
// // const onValueChange = database.ref().on('value', (snapshot) => {
// //     console.log('fetching updated data', snapshot.val());
// // }, (err) => {
// //     console.error('Error fetching data', err);
// // });

// // setTimeout(() => {
// //     database.ref('age').set(9);
// // }, 4000);

// // setTimeout(() => {
// //     database.ref('age').set(4);
// // }, 6000);

// // // unsibscribe to database
// // setTimeout(() => {
// //     database.ref().off('value', onValueChange);
// // }, 8000);

// // // will not execute
// // setTimeout(() => {
// //     database.ref('age').set(8);
// // }, 12000);

// // const onValueChangeChallenge = database.ref().on('value', (snapshot) => {
// //     const name = snapshot.val().name;
// //     const job = snapshot.val().job.title;
// //     const company = snapshot.val().job.company;
// //     console.log(`${name} is ${job} at ${company}.`);
// // }, (err) => {
// //     console.error('Error fetching data', err);
// // });

// // setTimeout(() => {
// //     database.ref('job').set({
// //         company: 'Uljanik',
// //         title: 'No title'
// //     });
// // }, 6000);

// // // unsibscribe to database
// // setTimeout(() => {
// //     database.ref().off('value', onValueChangeChallenge);
// // }, 8000);

// // // firebase and data arrays
// // // id is auto generated by firebase
// // database.ref('expenses').push({
// //     description: 'kruh, mlijeko, povrce',
// //     amount: 10000,
// //     note: 'Test note',
// //     createdAt: 100000000
// // }).then(
// //     dataSaved
// // ).catch(
// //     catchError
// // );

// // database.ref('expenses').push({
// //     description: 'Benzin',
// //     amount: 30000,
// //     note: '',
// //     createdAt: 200000000
// // }).then(
// //     dataSaved
// // ).catch(
// //     catchError
// // );

// // database.ref('expenses').push({
// //     description: 'Voda',
// //     amount: 35000,
// //     note: 'Platiti racun',
// //     createdAt: 300000000
// // }).then(
// //     dataSaved
// // ).catch(
// //     catchError
// // );

// // fetching data arrays once
// database.ref('expenses')
// .once('value')
// .then((snapshot) => {
//     console.log(snapshot.val());
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });

//     console.log(expenses);
// })
// .catch(
//     catchError
// );

// // subscribe to expenses array changes
// const onExpensesChange = database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });

//     console.log('Expenses change ', expenses);
// }, catchError);

// // child_removed
// const onExpensesChildRemoved = database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log('Expenses child removed ', snapshot.val());
// }, catchError);

// // child_changed
// const onExpensesChildChange = database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log('Expenses child changed ', snapshot.val());
// }, catchError);

// //child_added
// const onExpensesChildAdd = database.ref('expenses').on('child_added', (snapshot) => {
//     console.log('Expenses child added ', snapshot.val());
// }, catchError);

// const dataSaved = () => {
//     console.log('Data saved');
// };

// const catchError = (err) => {
//     console.error('Error ', err);
// };