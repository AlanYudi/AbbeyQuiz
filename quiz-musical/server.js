require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const Musica = require("./src/models/musica");

const {
    buscarMusica
} = require("./src/services/deezerService");

const app = express();


app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.static("public"));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB conectado");
})
.catch(err => {
    console.error("Erro MongoDB:", err);
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/jogo", (req, res) => {
    res.render("jogo");
});


app.get("/admin", (req, res) => {
    res.render("admin");
});


app.post("/admin", async (req, res) => {

    try {

        const nome = req.body.nome;

        const musica = await buscarMusica(nome);

        if (!musica) {

            return res.redirect("/admin");

        }

        const existente =
            await Musica.findOne({
                deezerId: musica.id
            });

        if (existente) {

            return res.redirect("/admin");

        }

        await Musica.create({

            titulo: musica.title,

            artista:
                musica.artist.name,

            deezerId:
                musica.id

        });

        return res.redirect("/admin");

    } catch (erro) {

        console.error(erro);

        return res.redirect("/admin");

    }

});
app.get("/musica", async (req, res) => {

    const musicas = await Musica.find();

    const sorteada =
        musicas[
            Math.floor(
                Math.random() * musicas.length
            )
        ];

    res.json(sorteada);

});

app.get("/preview/:id", async (req, res) => {

    try {

        const resposta = await axios.get(
            `https://api.deezer.com/track/${req.params.id}`
        );

        res.json({
            preview: resposta.data.preview
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Falha ao buscar preview"
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `Servidor rodando em http://localhost:${PORT}`
    );
});