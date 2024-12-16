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
async function demoFunc() {
    const controller = new AbortController();
    const { signal } = controller;

    const numbers = [10, 20, 30, 40, 50];
    const promiseTriple = (num) => Promise.resolve(num * 3);

    try {
        const iterable = asyncGenerator(numbers);

        setTimeout(() => {
            console.log("Aborting the process...");
            controller.abort();
        }, 1800);

        const res1 = await asyncMap(iterable, promiseTriple, signal);
        console.log("Final results:", res1);
    } catch (err) {
        if (err.name === "Abort_Error") {
            console.error("Process was aborted successfully");
        } else {
            console.error("Unexpected Error:", err);
        }
    }
}
