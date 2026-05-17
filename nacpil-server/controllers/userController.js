const User = require('../models/User');
const bcrypt = require('bcryptjs'); // for password hashing
const jwt = require('jsonwebtoken'); // for generating tokens

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // exclude the password field
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        // ensure the password is included in the request body
        if (!req.body.password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10); // hash the password

        const user = await User.create({ ...req.body, password: hashedPassword }); // create the user with the hashed password

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        // check if the password is being updated
        if (req.body.password) {
            // hash the new password
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        // update the user with the new data
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // check if the user is active
        if (!user.isActive) {
            return res.status(403).json({ message: 'Your account is inactive. Please contact support.' });
        }

        const userType = String(user.type || '').trim().toLowerCase();
        if (userType === 'viewer') {
            return res.status(403).json({ message: 'Viewers are not allowed to log in.' });
        }

        // compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, type: userType }, // include type in the token
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token, type: userType, firstName: user.firstName, username: user.username  }); // include type in the response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, loginUser };
