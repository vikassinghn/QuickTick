const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const userCheck = await User.findOne({ email });
        if (userCheck) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({ email, username, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: "User Registered Successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Please Sign Up First" });
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password is Not Correct" });
        }
        const { password: _, ...others } = user._doc;
        return res.status(200).json({ user: others });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;
