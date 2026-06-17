const mongoose = require("mongoose");

const rankingSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },

    pontos: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Ranking", rankingSchema);