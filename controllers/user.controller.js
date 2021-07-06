exports.allAccess = (req, res) => {
    res.status(200).send("user.controller.js: Return Public content here");
};

exports.userBoard = (req, res) => {
    res.status(200).send("user.controller.js: Return User content here");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("user.controller.js: Return Admin content here");
};