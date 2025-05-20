const fs = require("fs");
const path = require("path");

const fileName = path.join("logs", "logs.txt");

const logApiCalls = () => (req, res, next) => {
    const { method, url } = req
    let logData = `API call triggered at ${new Date().toLocaleString()} => Method: ${method}, URL: ${url} \n`;

    fs.appendFile(fileName, logData, (err) => {
        if (err) throw err;
    });

    next();
};

const validatePostUser = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    next();
};

const validateGetUser = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) return res.status(400).send({ error: error.details[0].message });

    next();
};



module.exports = {
    logApiCalls,
    validatePostUser,
    validateGetUser
};
