require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Configurações
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexão com MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB conectado!");
    })
    .catch((err) => {
        console.error("Erro ao conectar:", err);
    });

// Rotas
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/jogo", (req, res) => {
    res.render("jogo");
});

// Inicialização
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});