// Build a router from express with employee data...
// then export router.

const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');

// => localhost:3000/employees/
router.get('/', (req, res) => {
    Employee.find((err, docs) => {

        if(!err){ 
            res.send(docs); 
        }
        else{
            console.log('Error in Retrieving Employees : ' + JSON.stringify(err, undefined, 2))
        }
    });
});

// localhost:3000/employees/[id number]
router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record of the given id : ${ req.param.id }`);
    }
    Employee.findById(req.params.id, (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Retrieving Employee : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// request all properties of the employee
router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save((err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Cannot save Employee : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id : ${ req.params.id }`);
    }

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };

    // { new: true } ensures that the doc variable contains the updated data.
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log(`Cannot update employee id : ${req.params.id}` + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send(`No record with given id: ${req.params.id}`);
    }

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log(`Cannot delete employee id : ${req.params.id}` + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;