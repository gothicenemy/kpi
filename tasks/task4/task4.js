async function* asyncGenerator(array) {
    for (const item of array) {
        yield new Promise((resolve) =>
            setTimeout(() => resolve(item), Math.random() * 800 + 200)
        );
    }
}
