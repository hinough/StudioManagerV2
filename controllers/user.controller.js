const db = require('../models');
const config = require('../config');

const Customer = db.customer;

const {or} = db.Sequelize.Op;

exports.allAccess = (req, res) => {
    res.status(200).send({
        status: "ok",
        message: "Public content here!"
    });
};

exports.adminBoard = (req, res) => {
    res.status(200).send({
        status: "ok",
        message: "Admin content here!"
    });
};

exports.userBoard = (req, res) => {
    res.status(200).send({
        status: "ok",
        message: "User content here!"
    });
};


//Adds new customer (Requires valid token)
exports.addCustomer = (req, res) => {
    Customer.create({
        name: req.body.name,
        customer_type: req.body.customer_type,
        dato: req.body.dato,
        userId: req.userId
    }).then(customer => {
        res.status(200).send({message: "ok"});
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

//Find spesific customer from ID or Name
exports.findCustomersById = (req, res) => {
    Customer.findAll({
        where: {
            id: req.params.id
        }
    }).then(customers => {
        res.json(customers);
    }).catch(err => {
        res.send({ message: err.message});
    });
};

exports.findCustomersByName = (req, res) => {
    Customer.findAll({
        where: {
            name: req.params.name
        }
    }).then(customers => {
        res.json(customers);
    }).catch(err => {
        res.send({ message: err.message});
    });
};

//Find all customers tied to userId (Requires valid token)
exports.findCustomers = (req, res) => {
    Customer.findAll({
        where: {
            userId: req.userId
        }
    }).then(customers => {
        res.json(customers);
    }).catch(err => {
        res.send({ message: err.message});
    });
};