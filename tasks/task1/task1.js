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