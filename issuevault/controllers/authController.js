const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.register = async(req,res) => {
    try{
        const { name, hostelId, password, role } = req.body;

        // check if user already exist
        const existingUser = await User.findOne({hostelId});
        if(existingUser){
            return res.status(400).json({ message: "User already exists"});
        }

        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // save user
        const user = new User({ name, hostelId, password: hashedPassword, role});
        await user.save();

        res.status(201).json({message: "User registered successfully"});
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", error: error.message});
    }
};

// Login
exports.login = async(req,res) => {
    try{
        const { hostelId, password } = req.body;

        // check if user exists
        const user = await User.findOne({ hostelId });
        if(!user) {
            return res.status(400).json({ message: "Invalid credentials"});
        }

        // checks pass
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials"});
        }

        // generate jwt token
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.status(200).json({message: "Login successful", token, role: user.role});
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
};