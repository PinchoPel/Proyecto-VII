const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
    nickname: {type: String, required: true},
    password: {type: String, required: true},
    rol: {type: String, required: true, enum: ["admin", "contributor"]}
},{
    timestamps: true,
    collection: "users",
    versionKey: false
});

userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("user", userSchema, "users");

module.exports = User;