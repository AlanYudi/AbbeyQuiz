const axios = require("axios");

async function buscarMusica(nome) {

    const resposta =
        await axios.get(
            `https://api.deezer.com/search?q=${encodeURIComponent(nome)}`
        );

    return resposta.data.data[0];
}

module.exports = {
    buscarMusica
};