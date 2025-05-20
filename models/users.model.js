const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true, unique: true },
        name: { type: String },
        age: { type: Number },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const Users = mongoose.model("users", userSchema);

const upsertSingleDocument = (condition, set) => Users.updateOne(condition, set, { upsert: true });
const findDocuments = (condition, projection) => Users.find(condition, projection);
const findOneDocument = (condition, projection) => Users.findOne(condition, projection).lean();
const createManyDocument = (data) => Users.insertMany(data);
const updateOneDocument = (condition, set) => Users.updateOne(condition, set);

module.exports = {
    Users,
    upsertSingleDocument,
    findDocuments,
    createManyDocument,
    findOneDocument,
    updateOneDocument
};
