function mapWithCallback(array, callback, completionCallback) {
    const results = [];
    let processedItems = 0;

    function mapWithCallback(array, callback, completionCallback) {
        const results = [];
        let processedItems = 0;

        array.forEach((value, idx) => {
            callback(value, (err, result) => {
                if (err) {
                    console.error(`Error occurred: ${err}`);
                    results[idx] = null;
                } else {
                    results[idx] = result;
                }

                processedItems++;
                if (processedItems === array.length) {
                    completionCallback(results);
                }
            });
        });
    }

    function demoTest() {
        const numbers = [2, 4, 6, 8, 10];

        const doubleWithCallback = (num, callback) => {
            setTimeout(() => {
                if (Math.random() < 0.1) {
                    callback(`Failed to process ${num}`);
                } else {
                    callback(null, num * 2);
                }
            }, Math.random() * 1500);
        };
        mapWithCallback(numbers, doubleWithCallback, (results) => {
            console.log(`Processed results: ${results}`);
        });
    }
}

