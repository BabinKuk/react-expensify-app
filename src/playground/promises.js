const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Resolve');
        // ignored resolve('Resolve 2');
        reject('Something went wrong...')
    }, 2000);
    
});
console.log('wait 2s...');
    
promise.then((data) => {
    console.log(data);
}).catch((err) => {
    console.log('error', err);
});
console.log('after...');
    