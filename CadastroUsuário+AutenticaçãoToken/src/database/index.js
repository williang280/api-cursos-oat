const mongoose = require("mongoose");
const connect = () => {
    mongoose.connect("mongodb+srv://user01:10132912@cluster01.vmzrn1a.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true
    })
    
    const connection = mongoose.connection

    connection.on("error", () => {
        console.error("Erro na conexão com o mongodb")
    });
    connection.on("open", () => {
        console.log("Conexão com mongodb bem sucedida")
    });
}

connect();

module.exports = mongoose;