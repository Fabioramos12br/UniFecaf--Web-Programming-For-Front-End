# Rick and Morty — Galeria de personagens

Uma página web responsiva que consulta a API pública de *Rick and Morty* e monta uma galeria de personagens dinamicamente. O projeto foi desenvolvido com HTML, CSS e JavaScript puro, sem frameworks ou dependências de instalação.

## Sobre o projeto

O site apresenta uma galeria temática com personagens de *Rick and Morty*. Ao abrir a página, o JavaScript consulta a API, recebe os dados e cria um card para cada personagem retornado. Cada card mostra a imagem, o nome, o status e a espécie.

O projeto foi desenvolvido como trabalho de Front-End e demonstra:

- Estruturação de conteúdo com HTML semântico;
- Estilização e adaptação do layout para diferentes tamanhos de tela com CSS;
- Requisições HTTP com `fetch`;
- Criação e inserção de elementos no DOM com JavaScript;
- Uso de `localStorage` para guardar temporariamente os dados recebidos da API.

## Funcionalidades

- Consulta dos personagens pelo endpoint público da API Rick and Morty;
- Criação automática dos cards a partir dos dados recebidos;
- Exibição do nome, da imagem, do status e da espécie;
- Tradução dos status mais comuns para português: vivo, morto e desconhecido;
- Botão de favorito com alternância visual entre os estados selecionado e não selecionado;
- Cache dos resultados no navegador por um minuto;
- Uso dos últimos dados guardados quando a consulta à API falha;
- Mensagem de carregamento e mensagem de erro quando não há dados disponíveis;
- Imagem alternativa quando a imagem de um personagem não carrega;
- Layout responsivo para telas grandes, tablets e celulares.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- [Rick and Morty API](https://rickandmortyapi.com/)

O projeto não usa bibliotecas, frameworks, gerenciadores de pacotes nem processo de compilação.

## Estrutura de arquivos

```text
.
├── index.html
├── README.md
├── assets/
│   └── imagens/
│       ├── fundo.jpg
│       └── logo.png
├── css/
│   └── style.css
└── js/
    └── script.js
```

- `index.html`: estrutura da página e elemento que recebe a galeria;
- `css/style.css`: identidade visual, estilos dos cards e regras responsivas;
- `js/script.js`: consulta à API, cache e criação dos cards;
- `assets/imagens/`: imagens usadas na identidade visual da página.

## Como executar

É necessário ter um navegador atualizado. Não é preciso instalar dependências.

### Usando um servidor local

Na pasta raiz do projeto, abra um terminal e execute:

```powershell
py -m http.server 8000
```

Depois, acesse [http://localhost:8000](http://localhost:8000) no navegador. Para encerrar o servidor, volte ao terminal e pressione `Ctrl+C`.

Também é possível usar a extensão Live Server no Visual Studio Code. Abrir o `index.html` diretamente pode funcionar, mas um servidor local é recomendado para executar a página em uma origem HTTP.

## Como os dados são carregados

O JavaScript consulta este endpoint:

```text
https://rickandmortyapi.com/api/character
```

A API é pública e este endpoint não exige token de acesso. A resposta contém informações de paginação e uma lista `results` com os personagens. O projeto usa os resultados dessa lista e os campos:

| Campo da API | Uso na página |
| --- | --- |
| `name` | Nome exibido no card |
| `image` | Endereço da imagem do personagem |
| `status` | Status, apresentado em português |
| `species` | Espécie do personagem |

A API organiza os personagens em páginas. Como o projeto consulta o endpoint inicial sem parâmetros adicionais, a galeria mostra os personagens retornados nessa primeira resposta; atualmente, não há controles de paginação ou busca.

### Etapas no JavaScript

1. Ao iniciar, `carregarPersonagens()` verifica se há dados recentes no `localStorage`.
2. Se o cache tiver menos de um minuto, os cards são montados a partir desses dados.
3. Caso contrário, o código usa `fetch` para consultar a API.
4. A resposta é validada e os resultados são salvos no cache.
5. Para cada personagem, `criarCard()` monta os elementos com `document.createElement`.
6. Os elementos são agrupados em um `DocumentFragment` e inseridos na galeria com `appendChild`.
7. Se a consulta falhar, o projeto tenta mostrar os dados previamente armazenados; sem cache disponível, exibe uma mensagem de erro.

O cache utiliza a chave `rickMortyCharacters` e tem duração de um minuto. O botão de favorito altera o estado visual do card, mas essa seleção não é armazenada e é perdida ao atualizar a página.

## Layout e acessibilidade

O CSS define uma grade de quatro colunas em telas maiores, reduz o número de colunas em telas menores e apresenta um card por linha em celulares. A página também inclui textos alternativos nas imagens, rótulos acessíveis nos botões de favorito e uma mensagem alternativa para imagens que não carregam.

## Publicação

O projeto é estático e pode ser hospedado em qualquer serviço que publique arquivos HTML, CSS e JavaScript. Para publicá-lo no GitHub Pages:

1. Envie os arquivos do projeto para um repositório no GitHub;
2. Abra as configurações do repositório e acesse **Pages**;
3. Selecione a branch e a pasta raiz como origem da publicação;
4. Salve a configuração e aguarde o GitHub Pages disponibilizar o endereço do site.

Após a publicação, teste o endereço em uma janela anônima e confirme que os cards carregam. A consulta depende de conexão com a internet e de a API estar disponível.

## Relação com os requisitos do trabalho

A implementação atende aos requisitos práticos de utilizar HTML, CSS e JavaScript sem frameworks, consumir uma API com `fetch` e gerar dinamicamente cards que incluem nome, imagem e informação adicional do personagem.

Os entregáveis externos ao código — PDF teórico, arquivo compactado, link do projeto publicado e vídeo pitch — devem ser preparados e enviados conforme as instruções da atividade.
