//modulo de controle para adm

const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
    console.log('controller')
    return res.json({
        error:false,
        message: 'Token de Admin Validada.'
    });
})


module.exports = router;