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
}