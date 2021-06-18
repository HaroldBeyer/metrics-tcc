

/**
 * here we are going to run everything
 */

const axios = require('axios');
let promises = [];

const environments = ['http://54.209.160.91:3000/', 'https://8l2vbnm4g9.execute-api.us-east-1.amazonaws.com/dev/'];
const collections = ['request', 'service', 'schedule'];
let numberOfExecutions = 100;

const handleRequest = (environment, url) => {
    const id = environment == 'http://54.209.160.91:3000/' ? '299159259241775622' : '299132375568220676';
    const service = environment == 'http://54.209.160.91:3000/' ? '299158833470636550' : '299132312382079492';
    const scheduledDate = environment == 'http://54.209.160.91:3000/' ? '1997-12-17T00:00:00.000Z' : '1992-11-14T21:00:00.000Z';
    promises.push(axios.default.get(url + '/' + id));


    const body = {
        service,
        scheduledDate
    }

    promises.push(axios.default.post(url, body));
    promises.push(axios.default.put(url + '/' + id + '/confirm'));
    promises.push(axios.default.put(url + '/' + id + '/cancel'));
}

const handleService = (environment, url) => {
    const id = environment == 'http://54.209.160.91:3000/' ? '299158833470636550' : '299132312382079492';
    promises.push(axios.default.get(url + '/' + id));
    const body = { name: "Consulta teste" };

    promises.push(axios.default.post(url, body));
}

const handleSchedule = (environment, url) => {
    const id = environment == 'http://54.209.160.91:3000/' ? '299159118705328643' : '299132343579312642';
    const service = environment == 'http://54.209.160.91:3000/' ? '299158833470636550' : '299132312382079492';
    promises.push(axios.default.get(url + '/' + id));
    const body = {
        hour: 22,
        day: 16,
        year: 1997,
        month: 11,
        service
    }

    promises.push(axios.default.post(url, body));

}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function runRequests() {
    if (numberOfExecutions <= 0)
        return;
    console.log("Executing for 1 sec");
    console.log("Time init: " + new Date().toTimeString());
    await execute(1000, 1000);
    await Promise.all(promises);
    promises = [];
    console.log("Time ending " + new Date().toTimeString());
    await delay(600000);
    console.log("Executing for 10 sec");
    console.log("Time: " + new Date().toTimeString());
    await execute(10000, 1000);
    await Promise.all(promises);
    promises = [];
    console.log("Time ending " + new Date().toTimeString());
    await delay(600000);
    console.log("Executing for 5 minutes");
    console.log("Time: " + new Date().toTimeString());
    await execute(300000, 30);
    await Promise.all(promises);
    promises = [];
    console.log("Time ending " + new Date().toTimeString());
    await delay(600000);
    console.log("Executing for 1 hour");
    console.log("Time: " + new Date().toTimeString());
    await execute(3600000, 6);
    await Promise.all(promises);
    promises = [];
    console.log("Time ending " + new Date().toTimeString());
    await delay(600000);
    console.log("Executing for alternate times");
    console.log("Time: " + new Date().toTimeString());
    for (let ii = 10; ii >= 0; ii--) {
        await execute(0, 2, 30);
        await execute(25000, 2, 50);
        await Promise.allSettled(promises);
        promises = [];
        await execute(35000, 2, 20);
        await Promise.allSettled(promises);
        promises = [];
    }
    console.log("Time ending " + new Date().toTimeString());

    async function execute(timeBetweenExecutions, times, repeated = 1) {
        return new Promise(async (resolve, reject) => {
            for (let index = times; index >= 0; index--) {
                console.log(`Index: ${index}`);
                await delay(timeBetweenExecutions);
                for (let i = repeated; i >= 0; i--) {
                    for (const environment of environments) {
                        for (const collection of collections) {
                            const url = environment + collection;
                            promises.push(axios.default.get(url));

                            switch (collection) {
                                case 'request':
                                    handleRequest(environment, url);
                                    break;
                                case 'service':
                                    handleService(environment, url);
                                    break;
                                case 'schedule':
                                    handleSchedule(environment, url);
                                    break;
                            }
                        }
                    }
                }
            }
            resolve();
        })
    }
    console.log("Done!");
}

runRequests();
