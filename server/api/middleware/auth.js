const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token) 
        return res.status(401).json({message: 'No auth token, authorization has been denied for this request.'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        req.user = decoded;
        next();
    } catch (e) {
        req.status(400).json({ message: 'Tokne is not valid'});
    }
};