const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    
    try {
        const { username, email, phone, password, profileImage } = req.body;
        
        console.log("FormData",req.body)
        console.log("Ddddd",req.file)

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            phone,
            password: hashedPassword,
            profileImage: req.file ? req.file.path : null,
        });

        await newUser.save();

        res.status(201).json({
            message: 'Signup successful',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                phone: newUser.phone,
                profileImage: newUser.profileImage,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during signup', error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.cookie('userToken', token, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 1000,
            sameSite: 'strict'
        })

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};

module.exports = {
    signup,
    login
}