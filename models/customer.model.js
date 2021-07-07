module.exports = (sequelize, Sequelize) => {
    const customer = sequelize.define("customers", {
        name: {
            type: Sequelize.STRING
        },
        customer_type: {
            type: Sequelize.STRING
        },
        dato: {
            type: Sequelize.STRING
        }
    });

    return customer;
};