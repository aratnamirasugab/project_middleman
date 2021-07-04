const express = require('express');
const app = express();
const envs = require('./config');
app.use(
    express.urlencoded({
        extended : true
    })
);
app.use(express.json());

let routes = require('./src/routes');
routes(app);

port = process.env.PORT || envs.PORT;

app.listen(port);
console.log(`Server is up on port ${port}`);