function promiseMap(array, callback) {
    const promises = array.map(item => callback(item));
    return Promise.all(promises);
}
async function demoFunc() {