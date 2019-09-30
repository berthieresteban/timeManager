const axios = require('axios');
const users = require('./users')
const teams = require('./teams')
const workingtimes = require('./workingtimes')
const managing = require('./managing')

const host = "localhost";
const port = "4000";
const route = `http://${host}:${port}`;

let adminToken = null;

const auth = async (username, password) => {
    console.log(`\n\n************Loggin as ${username}************`);
    const response = axios.post(`${route}/auth`, {
        "auth": {
            "username": username,
            "password": password
        }
    }).then(response => {
        return response;
    });
    return response;
};

const create = (apiRoute, body) => {
    const currentURL = `${route}/api/${apiRoute}`;
    const response = axios.post(currentURL, body).then(response => {
        return response;
    });
    return response;

};

const main = async () => {
    const response = await auth("admin", "admin");
    adminToken = response.data.token;
    axios.defaults.headers.common['session_jwt'] = adminToken;
    let resp = null;
    console.log("\n************Creating Users************");
    for (let j of users.users) {
        console.log("User: ", j);
        resp = await create('users', j);
    }

    const response2 = await auth("superManager1", "superManager1");
    adminToken = response2.data.token;
    axios.defaults.headers.common['session_jwt'] = adminToken;


    console.log("\n\n************Creating WorkingTimes************");
    for (let j of workingtimes.workingtimes) {
        console.log("Workingtime: ", j);

        resp = await create('workingtimes', j);
    }

    console.log("\n\n************Creating Teams************");
    for (let j of teams.teams) {
        console.log("Team: ", j);
        resp = await create('teams', j);
    }

    console.log("\n\n************Creating Managing************");
    for (let j of managing.managing) {
        console.log("Managing: ", j);
        resp = await create('managing', j);
    }
};

main();