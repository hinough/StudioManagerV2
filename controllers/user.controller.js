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

//Find customer by ID or Name
exports.findCustomersByKey = (req, res) => {
    Customer.findAll({
        where: {
            [or]: {
                id: req.params.key,
                name: req.params.key
            },
            userId: req.userId
        }
    }).then(customers => {
        if(customers.length === 0) {
            res.status(404).send({ message: "Specified customer not found"})
        }
        else {
            res.status(200).json(customers);
        }
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
};

//Find all customers tied to userId (Requires valid token)
exports.findCustomers = (req, res) => {
    Customer.findAll({
        where: {
            userId: req.userId
        }
    }).then(customers => {
        if(customers.length === 0) {
            res.status(404).send({ message: "User has no customers!"})
        }
        else {
            res.status(200).json(customers);
        }
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
};

//Remove one customer from ID (Requires valid token and unique ID)
exports.removeCustomer = (req, res) => {
    Customer.destroy({
        where: {
            id: req.params.id,
            userId: req.userId
        }
    }).then(amount => {
        if(amount === 0) {
            res.status(404).send({ message: "Specified customer not found"})
        }
        else {
            res.status(200).send({ message: "ok"});
        }
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
};