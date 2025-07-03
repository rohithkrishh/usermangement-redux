const User = require('../models/userModel')



const userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) {
            return res.send(404).json({ message: 'user not found' })
        }

        res.status(200).json({ user })
    } catch {
        res.status(500).json({ message: 'server error' })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { username, email, phone } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updateData = {
            username: username || user.username,
            email: email || user.email,
            phone: phone || user.phone
        };

        if (req.file) {
            updateData.profileImage = '/uploads/' + req.file.filename;
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });

        res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const logoutUser = (req, res) => {
    res.clearCookie('userToken')
    res.status(200).json({ message: 'Logged out successfully' })
}




module.exports = {
    userProfile,
    updateProfile,
    logoutUser
}