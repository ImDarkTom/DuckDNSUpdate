const axios = require('axios');
const cron = require('node-cron');
require('dotenv').config()

const domain = process.env.DOMAIN;
const token = process.env.TOKEN;
const schedule = '*/30 * * * *';

async function updateIp() {
    const response = await axios.get(`https://www.duckdns.org/update?domains=${domain}&token=${token}&verbose=true&ip=`);
    const status = response.status;
    const state = response.data.split('\n')[3]; //UPDATED or NOCHANGE

    console.log(new Date().toLocaleString(), `| ${status} | ${state}`);
}

console.log("Starting job...")
updateIp()

cron.schedule(schedule, () => {
    updateIp();
});