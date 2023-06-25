const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const UserModel = require("../models/User");

const router = express.Router();
//gera a token para o usuário
const generateToken = (user = {}) => {
    return jwt.sign({
        id: user.id,
        name: user.name
    }, authConfig.secret , {
        expiresIn: 604800   //token expira em 1 semana
    });
}

//validar se o email já existe no banco
router.post("/register", async(req, res) => {

    const {email} = req.body;
    if(await UserModel.findOne({email})){
        return res.status(400).json({
            error:true,
            message:"Este Email já foi cadastrado!"
        })
    }

    const user = await UserModel.create(req.body);


    //oculta a senha
    user.password = undefined;

    return res.json({
        user,
        token: generateToken(user)
    });
})

//validar se email e senha estão corretos
router.post("/authenticate", async(req, res) => {
    
    const {email, password} = req.body;

    const user = await UserModel.findOne({email}).select("+password");

    console.log;(user);

    if(!user){
        return res.status(400).json({
            error: true,
            message: 'Usuário não encontrado.'
        })
    }

    if(!await bcryptjs.compare(password, user.password)){
        return res.status(400).send({
            error:true,
            message: 'Senha Inválida'
        })
    }

    user.password = undefined;

    return res.json({
        user,
        token: generateToken(user)
    });


})


module.exports = router;