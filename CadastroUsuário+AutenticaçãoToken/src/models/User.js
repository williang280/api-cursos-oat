const mongoose = require("../database");
const bcryptjs = require("bcryptjs");
//aqui mostra como cada dado de User é tratado durante o processo
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },

});

//criptografia de senha
UserSchema.pre("save", async function(next) {
    const hash = await bcryptjs.hash(this.password, 15);
    this.password = hash;
})

const User = mongoose.model("User", UserSchema);

module.exports = User;