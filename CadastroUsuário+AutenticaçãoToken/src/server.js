const express = require('express');
const AuthController = require("./controllers/AuthController");
const AdminController = require("./controllers/AdminController");
const authenticateMiddleware = require("./middlewares/authenticate");

//OBS: token de ADM no arquivo AUTH.JSON => o arquivo não aceita adicionar o comentário lá dentro
//aqui direcionamos a configuração com os devidos caminhos como /auth e o /admin

const app = express();
app.use(express.json());


app.use("/auth", AuthController);
app.use("/admin", authenticateMiddleware , AdminController);
//além de imprimir se o servidor está funcionando
app.listen(3009, () => {
    console.log('Servidor Funcionando');
});
