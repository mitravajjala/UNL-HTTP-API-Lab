// TODO: Create this function
async function getPokemon() {
    const pokemon = retrieveInputs();
    /**https://pokeapi.co/api/v2/ability/{id or name}/**/
    for(let i = 0; i < pokemon.length; i++){
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+pokemon[i])
        const obj = await response.json()
        const types = obj.types
        var hp = obj.stats[0].base_stat
        var attack = obj.stats[1].base_stat
        var defense = obj.stats[2].base_stat
        var special_attack = obj.stats[3].base_stat
        var special_defence = obj.stats[4].base_stat
        var height = obj.height
        var weight = obj.weight
        var image_url = obj.sprites.front_default
        var speed = obj.stats[5].base_stat
        const abilities = obj.abilities
        buildCard(pokemon[0], types, hp, attack, defense, special_attack, special_defence, speed, abilities, height, weight, image_url)
    }
    
}

/**
 * A function to build the display cards on the website
 * @param {string} name - the name of the pokemon
 * @param {array} types - the "types" array that corresponds to the pokemon's types
 * @param {number} hp - the base HP value of the pokemon
 * @param {number} attack - the base attack value of the pokemon
 * @param {number} defense - the base defense value of the pokemon
 * @param {number} special_attack - the base special attack value of the pokemon
 * @param {number} special_defense - the base special defense value of the pokemon
 * @param {number} speed - the base speed value of the pokemon
 * @param {array} abilities - the "abilities" array that corresponds to the pokemon's abilities
 * @param {number} height - the height of the pokemon
 * @param {number} weight - the weight of the pokemon
 * @param {string} image_url - the url to an in-game sprite used for the pokemon
 */
function buildCard(name, types, hp, attack, defense, special_attack, special_defense, speed, abilities, height, weight, image_url) {
    const card = document.createElement("div");
    card.className = "card";

    const cardImage = document.createElement("img");
    cardImage.src = image_url;
    card.placeholder = `Image of the pokemon: "${name.toUpperCase()}"`;
    card.appendChild(cardImage);

    const cardName = document.createElement("h1");
    cardName.innerHTML = name.toUpperCase();
    card.appendChild(cardName);

    const cardTypeTitle = document.createElement("h2");
    cardTypeTitle.innerHTML = `<strong>Types</strong>`;
    card.appendChild(cardTypeTitle);
    const cardTypesList = document.createElement("ul");
    for(let i = 0; i < types.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = types[i].type.name
        cardTypesList.appendChild(li);
    }
    card.appendChild(cardTypesList);

    const cardAbilitiesListTitle = document.createElement("h2");
    cardAbilitiesListTitle.innerHTML = "<strong>Abilities<strong>";
    card.appendChild(cardAbilitiesListTitle);
    const cardAbilitiesList =  document.createElement("ul");
    for(let i = 0; i < abilities.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = abilities[i].ability.name;
        cardAbilitiesList.appendChild(li);
    }
    card.appendChild(cardAbilitiesList);

    const cardStatisticsTitle = document.createElement("h2");
    cardStatisticsTitle.innerHTML = "<strong>Stats<strong>";
    card.appendChild(cardStatisticsTitle);

    const cardStatisticsTable = document.createElement("table");
    const tr1 = document.createElement("tr");
    tr1.innerHTML = `<td><strong>Attack: <strong>${attack}</strong></td>
    <td><strong>Defense: <strong>${defense}</strong></td>`;
    cardStatisticsTable.appendChild(tr1);

    const tr2 = document.createElement("tr");
    tr2.innerHTML = `<td><strong>Sp. Atk: <strong>${special_attack}</strong></td>
    <td><strong>Sp. Def: <strong>${special_defense}</strong></td>`;
    cardStatisticsTable.appendChild(tr2);

    const tr3 = document.createElement("tr");
    tr3.innerHTML = `<td><strong>HP: <strong>${hp}</strong></td>
    <td><strong>Speed: <strong>${speed}</strong></td>`;
    cardStatisticsTable.appendChild(tr3);

    card.appendChild(cardStatisticsTable);

    const cardMiscStatsContainer = document.createElement("div");
    const cardHeight = document.createElement("caption");
    cardHeight.innerHTML = `<strong>Height: </strong>${Math.round((height * 10)) / 100} m`;
    cardMiscStatsContainer.appendChild(cardHeight);
    const cardWeight = document.createElement("caption");
    cardWeight.innerHTML = `<strong>Weight: </strong>${Math.round(weight * 10) / 100} kg`;
    cardMiscStatsContainer.appendChild(cardWeight);

    card.appendChild(cardMiscStatsContainer);

    const cardContainer = document.getElementById("cardContainer");
    cardContainer.append(card);
}

function retrieveInputs() {
    const inputs = [];
    for(let i = 1; i < 6; i++) {
        const currInput = document.getElementById(`pkmn ${i}`);
        console.log(currInput.value);
        console.log(currInput.value === "")
        if(!(currInput.value === "")) {
            inputs.push(currInput.value);
            currInput.value = "";
        }
    }
    console.log(inputs);
    return inputs;
}

// function to be used in the "get pokemon button". Do not modify this function
function onClick() {
    getPokemon();
}

["pkmn 1", "pkmn 2", "pkmn 3", "pkmn 4", "pkmn 5"].forEach((id) => {
    document.getElementById(id).addEventListener("keyup", (e) => {
        if(e.code === "Enter") {
            document.getElementById("submit").click();
        }
    });
})
