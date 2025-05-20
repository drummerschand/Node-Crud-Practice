const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const userModel = require("../models/users.model");

const JWT_secret = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const register = async (req, res) => {
    try {
        const payload = req.body;

        const checkUser = await userModel.findOneDocument({ $or: [{ user_id: payload.user_id }, { email: payload.email }] }, {});
        if (checkUser) {
            return res.status(200).json({ message: "User with this user_id or email already exists. If you want to update the user data then try /api/users/updateUser." });
        }

        const hashedPwd = await bcrypt.hash(payload.password, 10);
        payload.password = hashedPwd;
        const userData = await userModel.createManyDocument([payload]);

        res.status(201).json({ data: userData, message: "User registered successfully ✅" });
    } catch (error) {
        console.log("error_register::", error);
        res.status(500).json({ error: "User registeration failed ❌" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOneDocument({ email: email }, {});

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials ❌" });
        }

        const token = JWT.sign({ user_id: user.user_id }, JWT_secret, { expiresIn: JWT_EXPIRES_IN });
        res.json({ token, message: "Login successful ✅" });
    } catch (error) {
        res.status(500).json({ error: "User Login failed ❌" });
    }
};

module.exports = {
    register,
    login,
};
