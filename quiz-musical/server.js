const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado com sucesso ao MongoDB!"))
    .catch((erro) => console.error("❌ Erro ao ligar ao MongoDB:", erro));

// ROTA 1: Tela Inicial do AbbeyQuiz
app.get('/', (req, res) => {
    res.render('index');
});

// ROTA 2: O Jogo (Buscando músicas da API do Deezer)
app.get('/jogar', async (req, res) => {
    try {
        // 🍏 Alterado para puxar a playlist oficial "The Beatles Essentials" do Deezer
        const resposta = await axios.get('https://api.deezer.com/playlist/1210884241');
        const musicas = resposta.data.tracks.data;

        // Sorteia a música correta
        const musicaCorreta = musicas[Math.floor(Math.random() * musicas.length)];

        // Cria a lista de opções com a correta inclusa
        let opcoes = [musicaCorreta.title];
        
        // Sorteia mais 3 músicas erradas da mesma lista
        while (opcoes.length < 4) {
            const musicaAleatoria = musicas[Math.floor(Math.random() * musicas.length)];
            if (!opcoes.includes(musicaAleatoria.title)) {
                opcoes.push(musicaAleatoria.title);
            }
        }

        // Embaralha as opções
        opcoes = opcoes.sort(() => Math.random() - 0.5);

        // Renderiza a tela do jogo passando os dados
        res.render('jogo', {
            musica: musicaCorreta,
            opcoes: opcoes
        });

    } catch (erro) {
        console.error("Erro ao buscar músicas da API:", erro);
        res.status(500).send("Erro ao carregar o jogo.");
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});