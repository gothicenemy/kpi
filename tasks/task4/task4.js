async function* asyncGenerator(array) {
    for (const item of array) {
        yield new Promise((resolve) =>
            setTimeout(() => resolve(item), Math.random() * 800 + 200)
        );
    }
}
async function asyncMap(asyncIterable, callback, signal) {
    const res = [];

    for await (const item of asyncIterable) {
        if (signal.aborted) {
            throw new DOMException("Aborted", "Abort_Error");
        }
        const result = await callback(item);
        console.log("Processing:", result);
        res.push(result);
    }

    return res;
}
