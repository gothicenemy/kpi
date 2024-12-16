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
