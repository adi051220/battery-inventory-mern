const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing credentials' });
    }

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = {
    login,
    verifyToken
};