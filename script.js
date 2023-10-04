function scrollToCharacterInfo() {
    const characterInfoSection = document.querySelector(".infoPersonagens");
    characterInfoSection.scrollIntoView({ behavior: 'smooth' });
}
document.addEventListener("DOMContentLoaded", function() {
    const characterList = document.getElementById("personagemSelecionado");
    const characterName = document.getElementById("nome");
    const characterVision = document.getElementById("visao");
    const characterImage = document.getElementById("personagemImagem");

    // Função para carregar as informações do personagem
    function carregarInformacoesDoPersonagem(personagem) {
        fetch(`https://api.genshin.dev/characters/${personagem}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Não foi possível obter os dados do personagem.");
                }
                return response.json();
            })
            .then(data => {
                characterName.textContent = data.name;
                characterVision.textContent = data.vision;
                characterImage.src = `https://api.genshin.dev/characters/${personagem}/card`;
                scrollToCharacterInfo();
            })
            .catch(error => {
                console.error("Erro ao acessar a API:", error);
            });
    }

    // Adicione um ouvinte de eventos para o clique em um item da lista
    characterList.addEventListener("click", event => {
        const listItem = event.target.closest("li");
        if (listItem) {
            const selectedCharacter = listItem.getAttribute("data-value");
            carregarInformacoesDoPersonagem(selectedCharacter);
        }
    });

    // Carregue as informações do personagem predefinido ao carregar a página
    const personagemPredefinido = characterList.querySelector("li").getAttribute("data-value");
    carregarInformacoesDoPersonagem(personagemPredefinido);
});

window.addEventListener("load", function() {
    const characterList = document.getElementById("personagemSelecionado");
    const personagemPredefinido = characterList.querySelector("li").getAttribute("data-value");
    carregarInformacoesDoPersonagem(personagemPredefinido);
});
function scrollDown() {
    window.scrollBy({
        top: window.innerHeight, // Você pode ajustar a quantidade de rolagem aqui
        left: 0,
        behavior: 'smooth' // Isso cria uma animação suave de rolagem
    });
}