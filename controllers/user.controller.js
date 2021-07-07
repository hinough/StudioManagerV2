const db = require('../models');
const config = require('../config');

const Customer = db.customer;

exports.allAccess = (req, res) => {
    res.status(200).send({
        status: "ok",
        message: "Public content here!"
    });
};

exports.userBoard = (req, res) => {
    res.status(200).send({
        status: "ok",
        message: "User content here!"
    });
};

exports.adminBoard = (req, res) => {
    res.status(200).send({
        status: "ok",
        message: "Admin content here!"
    });
};

exports.addCustomer = (req, res) => {
    Customer.create({
        name: req.body.name,
        customer_type: req.body.customer_type,
        dato: req.body.dato,
        userId: req.userId
    }).then(customer => {
        res.status(200).send({message: "Customer " + customer.name + " added!"});
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};