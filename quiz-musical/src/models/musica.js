const mongoose = require("mongoose");

const musicaSchema = new mongoose.Schema({

    titulo: {
        type: String,
        required: true
    },

    artista: {
        type: String,
        required: true
    },

    deezerId: {
        type: Number,
        required: true
    }

});

module.exports =
    mongoose.model(
        "Musica",
        musicaSchema
    );