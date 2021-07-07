const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/user/addCustomer", [authJwt.verifyToken], controller.addCustomer);
    app.post("/api/user/findCustomers", [authJwt.verifyToken], controller.findCustomers);
    app.post("/api/user/findCustomers/:key", [authJwt.verifyToken], controller.findCustomersByKey);

    app.delete("/api/user/removeCustomer/:id", [authJwt.verifyToken], controller.removeCustomer);
};