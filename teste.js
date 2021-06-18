console.log("Teste")

function main() {

    const valor = 123;
    const promise1 = new Promise((resolve, reject) => {
        if (valor > 100) {
            resolve('oi');
        }
        reject("fiaa")

    });
    const promise2 = new Promise((resolve, reject) => {
        if (valor > 100) {
            reject("asad")
        }
        resolve('bsb');

    });

    const promise3 = new Promise((resolve, reject) => {
        if (valor > 100) {
            resolve('oitenta');
        }
        reject("zzz")

    });

    // const result = await Promise.allSettled([promise1, promise2, promise3]);

    const promise = Promise.allSettled([promise1, promise2, promise3]);
    promise.then((result, err) => {

        if (result) {
            console.log(`Result: ${result}`);
        } else if (err) {
            console.log(`Error: ${err}`);
        }

        console.log("FIm!");
    });


    console.log("Deu certo");
}

main();

