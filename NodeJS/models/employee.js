const mongoose = require('mongoose');

// Create a mongoose model named Employee.
var Employee = mongoose.model('Employee', {
    name: { type: String},
    position: { type: String},
    office: {type: String},
    salary: { type: Number }
}, 'emp');

// Export Employee as an object.
module.exports = { Employee };