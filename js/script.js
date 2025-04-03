document.addEventListener("DOMContentLoaded", () => {
    const apiURL = "https://hp-api.onrender.com/api/characters";
    const container = document.getElementById("characters-container");
    const searchInput = document.getElementById("search");

    // Mapeamento de cores das casas
    const houseColors = {
        "Gryffindor": "#ae0001",  
        "Slytherin": "#2a623d",   
        "Ravenclaw": "#222f5b",   
        "Hufflepuff": "#ecb939",  
        "Desconhecida": "#aaaaaa" 
    };

    async function fetchCharacters() {
        try {
            const response = await fetch(apiURL);
            const characters = await response.json();
            displayCharacters(characters);

            searchInput.addEventListener("input", () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredCharacters = characters.filter(character => 
                    character.name.toLowerCase().includes(searchTerm)
                );
                displayCharacters(filteredCharacters);
            });
        } catch (error) {
            console.error("Erro ao buscar personagens:", error);
        }
    }

    function displayCharacters(characters) {
        container.innerHTML = "";
        characters.forEach(character => {
            const house = character.house || "Desconhecida"; 
            const textColor = houseColors[house]; 

            const card = document.createElement("div");
            card.classList.add("character-card");
            card.style.borderLeftColor = textColor; 

            card.innerHTML = `
                <img src="${character.image || 'https://via.placeholder.com/200'}" alt="${character.name}">
                <h3 style="color: ${textColor}">${character.name}</h3>
                <p style="color: ${textColor}"><strong>Casa:</strong> ${house}</p>
                <p><strong>Patrono:</strong> ${character.patronus || "Desconhecido"}</p>
            `;

            container.appendChild(card);
        });
    }

    fetchCharacters();
});
