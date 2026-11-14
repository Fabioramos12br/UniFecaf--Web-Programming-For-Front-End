
const API_URL = "https://rickandmortyapi.com/api/character";

const CACHE_KEY = "rickMortyCharacters";
const CACHE_DURATION = 60 * 1000;

const container = document.querySelector("#personagens-grid");


// Cache local

function obterCache() {

    try {

        const dadosSalvos = localStorage.getItem(CACHE_KEY);

        if (!dadosSalvos) {
            return null;
        }

        const cache = JSON.parse(dadosSalvos);

        if (!Array.isArray(cache.results)) {
            return null;
        }

        return cache;

    } catch (erro) {

        console.warn("Não foi possível ler o cache:", erro);
        return null;

    }

}


function salvarCache(personagens) {

    try {

        const cache = {
            savedAt: Date.now(),
            results: personagens
        };

        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));

    } catch (erro) {

        console.warn("Não foi possível salvar o cache:", erro);

    }

}


// Favoritos

function criarBotaoFavorito() {

    const botao = document.createElement("button");

    botao.type = "button";
    botao.classList.add("btn-favorito");

    botao.textContent = "♡";

    botao.setAttribute("aria-label", "Adicionar aos favoritos");
    botao.setAttribute("aria-pressed", "false");

    botao.addEventListener("click", () => {

        const favorito = botao.classList.toggle("ativo");

        botao.textContent = favorito ? "♥" : "♡";

        botao.setAttribute("aria-pressed", String(favorito));

        botao.setAttribute(
            "aria-label",
            favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"
        );

    });

    return botao;

}


// Imagens dos personagens

function criarImagem(personagem) {

    const areaImagem = document.createElement("div");
    areaImagem.classList.add("personagem-imagem");

    const imagem = document.createElement("img");

    imagem.alt = personagem.name;
    imagem.loading = "lazy";
    imagem.decoding = "async";

    const alternativa = document.createElement("span");

    alternativa.classList.add("imagem-fallback");
    alternativa.textContent = "Imagem indisponível";
    alternativa.hidden = true;

    imagem.addEventListener("error", () => {

        console.warn("Falha ao carregar:", personagem.name);

        imagem.hidden = true;
        alternativa.hidden = false;

    }, { once: true });

    imagem.src = personagem.image;

    areaImagem.appendChild(imagem);
    areaImagem.appendChild(alternativa);

    return areaImagem;

}


// Montagem dos cards

function criarCard(personagem) {

    const card = document.createElement("article");

    card.classList.add("personagem-card");

    const botaoFavorito = criarBotaoFavorito();

    const imagem = criarImagem(personagem);

    const informacoes = document.createElement("div");

    informacoes.classList.add("personagem-info");

    const nome = document.createElement("h2");

    nome.textContent = personagem.name;

    const statusTraduzido = {
        Alive: "Vivo",
        Dead: "Morto",
        unknown: "Desconhecido"
    };

    const statusOriginal = personagem.status || "unknown";

    const status = document.createElement("span");

    status.classList.add("status");

    status.classList.add(
        "status-" + statusOriginal.toLowerCase()
    );

    status.textContent =
        "Status: " + (statusTraduzido[statusOriginal] || "Desconhecido");

    const especie = document.createElement("p");

    especie.textContent = "Espécie: " + personagem.species;

    informacoes.appendChild(nome);
    informacoes.appendChild(status);
    informacoes.appendChild(especie);

    card.appendChild(botaoFavorito);
    card.appendChild(imagem);
    card.appendChild(informacoes);

    return card;

}


// Exibição da galeria

function exibirPersonagens(personagens) {

    container.innerHTML = "";

    const fragmento = document.createDocumentFragment();

    personagens.forEach(personagem => {

        const card = criarCard(personagem);

        fragmento.appendChild(card);

    });

    container.appendChild(fragmento);

}


// Carregamento da API

function carregarPersonagens() {

    const cache = obterCache();

    if (
        cache &&
        Date.now() - cache.savedAt < CACHE_DURATION &&
        Date.now() >= cache.savedAt
    ) {

        console.log("Personagens carregados do cache.");

        exibirPersonagens(cache.results);

        return;

    }

    container.textContent = "Carregando personagens...";

    fetch(API_URL)

        .then(resposta => {

            if (!resposta.ok) {

                throw new Error("Erro HTTP: " + resposta.status);

            }

            return resposta.json();

        })

        .then(dados => {

            if (!Array.isArray(dados.results)) {

                throw new Error("Resposta inválida da API.");

            }

            salvarCache(dados.results);

            exibirPersonagens(dados.results);

            console.log("Personagens carregados da API.");

        })

        .catch(erro => {

            console.error("Erro ao consultar a API:", erro);

            if (cache && cache.results.length > 0) {

                console.warn("Utilizando os últimos dados salvos.");

                exibirPersonagens(cache.results);

            } else {

                container.textContent =
                    "Não foi possível carregar os personagens. Tente novamente.";

            }

        });

}


// Inicialização

carregarPersonagens();
