let musicaAtual = null;
let audio = null;

async function carregarMusica() {

    try {

        const resposta =
            await fetch("/musica");

        musicaAtual =
            await resposta.json();

        console.log(
            "Música carregada:",
            musicaAtual
        );

    } catch (erro) {

        console.error(
            "Erro ao carregar música:",
            erro
        );

    }

}

function normalizarTexto(texto) {

    return texto
        .toLowerCase()

        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")

        .replace(/\(.*?\)/g, "")
        .replace(/\[.*?\]/g, "")

        .replace(/remastered/gi, "")
        .replace(/live/gi, "")
        .replace(/remix/gi, "")

        .replace(/\b\d{4}\b/g, "")

        .replace(/\s+/g, " ")

        .trim();

}

carregarMusica();

document
.getElementById("playBtn")
.addEventListener(
"click",
async () => {

    try {

        if (!musicaAtual) {

            alert(
                "Nenhuma música carregada."
            );

            return;

        }

        const resposta =
            await fetch(
                `/preview/${musicaAtual.deezerId}`
            );

        const dados =
            await resposta.json();

        console.log(
            "Preview:",
            dados.preview
        );

        if (audio) {

            audio.pause();
            audio.currentTime = 0;

        }

        audio =
            new Audio(
                dados.preview
            );

        audio.play();

    } catch (erro) {

        console.error(
            "Erro ao tocar música:",
            erro
        );

    }

});

document
.getElementById("enviarBtn")
.addEventListener(
"click",
() => {

    const respostaUsuario =
        normalizarTexto(
            document
            .getElementById("resposta")
            .value
        );

    const respostaCorreta =
        normalizarTexto(
            musicaAtual.titulo
        );

    console.log(
        "Usuário:",
        respostaUsuario
    );

    console.log(
        "Correta:",
        respostaCorreta
    );

    if (
        respostaUsuario ===
        respostaCorreta
    ) {

        alert("Acertou!");

    } else {

        alert(
            `Errou!\n\nA resposta era:\n${musicaAtual.titulo}`
        );

    }

    document
        .getElementById("resposta")
        .value = "";

    carregarMusica();

});