const jwt = require ("jsonwebtoken");
const authConfig = require("../config/auth.json");

//neste arquivo é feita a validação do token, se ele é inválido, se está com formatação incorreta ou até mesmo expirada.

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            error: true,
            message: "Token inválida."
        })
    }

    const parts = authHeader.split(" ");

    if(parts.length !== 2) {
        return res.status(401).json({
            error: true,
            message:"Tipo de Token inválido."
        })
    }

    const [scheme, token] = parts;
    if(scheme.indexOf("Bearer") !== 0){
        return res.status(401).json({
            error: true,
            message: "Token com formatação incorreta."
        })
    }

    return jwt.verify(token, authConfig.secret, (err, decoded) => {

        if(err){
            return res.status(401).json({
                error: true,
                message: "Token Inválida ou Expirada."
            })
        }

        req.userLogged = decoded;

        console.log(err);
        console.log(decoded); 

        return next();
    })

}