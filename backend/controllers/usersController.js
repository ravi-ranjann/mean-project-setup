const User = require('../models/Users');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if(!users?.length) {
        return res.status(400).json({ message: "No user available." });
    }
    res.json(users)
});

const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;
    if(!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required." });
    }
    
    const duplicate = await User.findOne({ username }).lean().exec();
    if(duplicate) {
        return res.status(400).json({ message: "Duplicate username" });
    }

    const hashedPwd = await bcrypt.hash(password, 10); // salt round

    const userObject = { username, "password": hashedPwd, roles };

    // Create and store new user
    const user = await User.create(userObject);

    if(user) {
        res.status(201).json({ message: `New user ${username} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data received.' });
    }
;})

const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password, roles, active } = req.body;

    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const user = await User.findById(id).exec();

    if(!user) {
        return res.status(400).json({ message: 'User not found.' })
    }

    const duplicate = await User.findOne({ username }).lean().exec();

    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    user.username = username;
    user.roles = roles;
    user.active = active;

    if(password) {
        // Hash Password
        user.password = await bcrypt.hash(password, 10); //salt round
    }

    const updatedUser = await user.save();

    res.json({ message: `${updatedUser} updated.`})
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if(!id) {
        return res.status(400).json({ message: 'User ID Required' });
    }

    const notes = await Note.findOne({ user: id }).lean().exec();
    if(notes?.length) {
        return res.status(400).json({ message: 'User has assigned notes' });
    }

    const user = await User.findById(id).exec();
    if(!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const result = await User.deleteOne();

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json(reply);
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}