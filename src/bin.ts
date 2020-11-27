#!/usr/bin/env node
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
process.env.ENV='production';
import {startServer} from './index';
if (argv.apikey && argv.apitoken) {
    process.env.API_TOKEN= argv.apitoken;
    process.env.API_PATH='https://api.trello.com/1';
    process.env.API_KEY= argv.apikey
    process.env.ENV='production';
    startServer();
} else {
    console.log('please provide apikey and apitoken to run server');
    console.log(`sample command to run this is :
    from commandline
    jsstudio-trello  --apikey=XXXXX --apitoken=XXXXX
    api key and api token you can be captured from trello apis`);
}