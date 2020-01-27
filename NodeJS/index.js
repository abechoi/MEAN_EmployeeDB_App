
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import mongoose with connection data.
const { mongoose } = require('./db.js');

// Request for employees - import router with employee data.
var employeeController = require('./controllers/employeeController.js');

// Create express app.
var app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000, ()=> console.log('Server started at port : 3000')); // => localhost:3000

app.use('/employees', employeeController); // => localhost:3000/employees
