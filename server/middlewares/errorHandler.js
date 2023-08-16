const { CustomErrorAPI } = require('../customError/err');

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomErrorAPI) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
    res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;