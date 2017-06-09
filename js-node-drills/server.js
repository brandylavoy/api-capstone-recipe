'use strict';

// Request and response object drills
// ==================================

const express = require('express');
const bodyParser = required('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const doMadLib = (params) => {
        const {
            adjective1, adjective2, adjective3, adverb, name, pronoun, noun, place
        } = params;
        return (
            `There's a ${adjective1} new ${name} in ${place} and ${pronoun} has everybody` +
            `talking. Stunningly ${adjective2} and ${adverb} ${adjective3}, all the cool kids know it.` +
            `However, ${name} has a secret - ${name}'s a vile vampire. \n` +
            `Will it end with a bite, or with a stake through the ${noun}?`);

        app.get('/', (req, res) => res.send(doMadLib(req.query)));





        // listen for requests :)
        app.listen(process.env.PORT || 8080, () => console.log(
            `Your app is listening on port ${process.env.PORT || 8080}`));


        // a way to listen for HTTP requests over a port
        // a way to inspect and interact with HTTP request and response objects
        // a way to route HTTP requests from clients to the right request handlers
        // a way to serve static assets to client browsers (e.g., our route for /)
        // a way to serve data to clients (e.g., our route for /the-count)