function promiseMap(array, callback) {
    const promises = array.map(item => callback(item));
    return Promise.all(promises);
}
async function demoFunc() {

    // case 1
    const numbers = [2, 4, 6, 8, 10];

    const promiseTriple = (num) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (num === 6) {
                    reject(`Warning: Number ${num} cannot be processed`);
                } else {
                    resolve(num * 2);
                }
            }, Math.random() * 1000);
        });
    };

    promiseMap(numbers, promiseTriple)
        .then(results => {
            console.log('Case 1 Results:', results);
        })
        .catch(error => {
            console.error('Error in case 1:', error);
        });
    // case 2
    const numbers2 = [15, 25, 35];

    const promiseSquare = (num) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (num === 25) {
                    reject(`Warning: Cannot handle the number ${num}`);
                } else {
                    resolve(num ** 2);
                }
            }, Math.random() * 1000);
        });
    };

    promiseMap(numbers2, promiseSquare)
        .then(squares => {
            console.log('Case 2 Results:', squares);
        })
        .catch(error => {
            console.error('Error in case 2:', error);
        });
}
demoFunc();

// Use cases with async-await
function promiseMap(array, callback) {
    const promises = array.map(item => callback(item));
    return Promise.all(promises);
}

async function demoFunc() {

    // case 1
    const numbers = [3, 6, 9, 12];

    const promiseTriple = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * 2), Math.random() * 1000);
        });
    };

    const results1 = await promiseMap(numbers, promiseTriple);
    console.log('Async-await Case 1 Results:', results1);


    // case 2
    const numbers2 = [12, 24, 36];

    const promiseSquare = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num ** 2), Math.random() * 1000);
        });
    };

    const results2 = await promiseMap(numbers2, promiseSquare);
    console.log('Async-await Case 2 Results:', results2);
}

demoFunc();