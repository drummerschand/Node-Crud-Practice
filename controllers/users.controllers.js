const userModel = require("../models/users.model");
const logger = require("../logs/logger");
const bcrypt = require("bcrypt");
const { client } = require("../config/redisClient");

const postUserData = async (req, res) => {
    let payload = req.body;
    let user = await userModel.upsertSingleDocument({ user_id: payload.user_id, email: payload.email }, { $set: payload });
    res.status(201).json(user);
};

const getUser = async (req, res) => {
    let userData = [],
        condition = {},
        projection = {
            _id: 1,
            user_id: 1,
            name: 1,
            age: 1,
            email: 1,
            createdAt: 1,
            updatedAt: 1,
        };

    if (req.query.user_id) {
        const cachedItem = await client.get(`user_id:${req.query.user_id}`);

        if (cachedItem) {
            console.log(`✅ Served from Redis cache - KEY => user_id:${req.query.user_id}`);
            // Return cached response
            return res.json(JSON.parse(cachedItem));
        }
        condition = { user_id: req.query.user_id };
        userData = await userModel.findOneDocument(condition, projection);
        // Cache the data for 10 minutes (600 seconds)
        await client.setEx(`user_id:${req.query.user_id}`, 600, JSON.stringify(userData));
        if(!userData){
          res.status(200).json({message: 'No user found'})
        }
        res.status(200).json(userData);
    } else {

        userData = await userModel.findDocuments(condition, projection);
        res.status(200).json(userData);

    }
    
};

const updateUser = async (req, res) => {
    try {
        const payload = { ...req.body };

        const checkUser = await userModel.findOneDocument({
            $or: [{ user_id: payload.user_id }, { email: payload.email }],
        });

        if (!checkUser) {
            return res.status(404).json({
                message: "User with this user_id or email doesn't exist. If you want to register a new user, then try /api/users/register.",
            });
        }

        if (!payload.password) {
            // delete payload.password;
        } else if (await bcrypt.compare(payload.password, checkUser.password)) {
            delete payload.password;
        } else {
            payload.password = await bcrypt.hash(payload.password, 10);
        }

        await userModel.updateOneDocument({ user_id: payload.user_id }, { $set: payload });

        const updatedUser = await userModel.findOneDocument({
            user_id: payload.user_id,
        });

        if (updatedUser?.password) delete updatedUser.password;

        res.status(200).json({
            data: updatedUser,
            message: "User updated successfully ✅",
        });
    } catch (error) {
        console.log("error_update_user::", error);
        res.status(500).json({ error: "User update failed ❌" });
    }
};

module.exports = {
    postUserData,
    getUser,
    updateUser,
};
