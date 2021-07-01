require('dotenv').config()
const express = require('express');
const app = express();
app.use(
    express.urlencoded({
        extended : true
    })
);
app.use(express.json());

let routes = require('./src/routes');
routes(app);

app.listen(process.env.PORT || 3000);
console.log(`Server is up on whatever port`);