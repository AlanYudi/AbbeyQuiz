const btnPlay = document.getElementById("btnPlay");
const btnEnviar = document.getElementById("btnEnviar");

const resposta = document.getElementById("resposta");
const resultado = document.getElementById("resultado");

const musicaAtual = {
    nome: "Hey Jude",
    arquivo: "/audio/musica1.mp3"
};

btnPlay.addEventListener("click", () => {

    const audio = new Audio(musicaAtual.arquivo);

    audio.play();

    setTimeout(() => {
        audio.pause();
    }, 5000);

});

btnEnviar.addEventListener("click", () => {

    if (
        resposta.value.toLowerCase() ===
        musicaAtual.nome.toLowerCase()
    ) {

        resultado.textContent = "Acertou!";

    } else {

        resultado.textContent =
            "Errou! Era " + musicaAtual.nome;
    }

});