require('dotenv').config()
const express = require('express');
const app = express();
const helmet = require('helmet');
const port = process.env.PORT || 3000;

app.use(helmet());

console.log("masukk");
let routes = require('./src/routes');
routes(app);

app.listen(port);
console.log(`Server is up on port : ${port}`);