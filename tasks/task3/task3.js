function promiseMap(array, fn, signal) {
    const promises = array.map((item) => {
        if (signal.aborted) {
            return Promise.reject(new DOMException("Aborted", "Abort_Error"));
        }

        return new Promise((resolve, reject) => {
            const onAbort = () => reject(new DOMException("Aborted", "Abort_Error"));

            signal.addEventListener("abort", onAbort, { once: true });

            fn(item)
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    signal.removeEventListener("abort", onAbort);
                });
        });
    });

    return Promise.all(promises);
}
async function demoFunc() {
    const controller = new AbortController();
    const { signal } = controller;

    const numbers = [2, 4, 6, 8, 10];

    const promiseTriple = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * 5), Math.random() * 1500);
        });
    };

    try {
        const res1 = await promiseMap(numbers, promiseTriple, signal);
        console.log("Case 1 result:", res1);
    } catch (err) {
        if (err.name === "Abort_Error") {
            console.error("Case 1 was aborted");
        } else {
            console.error("Error:", err);
        }
    }

    controller.abort();
    const numbers2 = [15, 25, 35];

    const promiseSquare = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num + 100), Math.random() * 2000);
        });
    };

    try {
        const res2 = await promiseMap(numbers2, promiseSquare, signal);
        console.log("Case 2 result:", res2);
    } catch (err) {
        if (err.name === "Abort_Error") {
            console.error("Case 2 was aborted");
        } else {
            console.error("Error:", err);
        }
    }
}
demoFunc()
    .then(() => {
        console.log("demoFunc completed successfully");
    })
    .catch((err) => {
        console.error("Error in demoFunc:", err);
    });
