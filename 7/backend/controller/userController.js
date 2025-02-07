const jwt = require('jsonwebtoken');
const User = require('../model/usermodel');
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

// Signup
const signup = async (req, res, next) => {
    const { username, password, role } = req.body;
    try {
        const user = new User({ username, password, role });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        next(error);
    }
};

// Login
const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token,role:user.role,_id:user._id });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { signup, login };
