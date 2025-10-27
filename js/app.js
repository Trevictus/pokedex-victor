const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const API_LIST_URL = "https://pokeapi.co/api/v2/pokemon/?limit=1000";

const dataList = document.getElementById('pokemonNombres');
const input = document.getElementById("campoDeTexto");
const button = document.getElementById("buscar");

const contenedorInfo = document.getElementById("pokemonInfo");

const outputs = {
  img: document.getElementById("pokemonImg"),
  name: document.getElementById("nombrePokemon"),
  height: document.getElementById("alturavalor"),
  weight: document.getElementById("pesovalor"),
}

async function cargarListaPokemon() {
  try {
    const response = await fetch(API_LIST_URL);

    if (!response.ok) {
      throw new Error('Error al cargar la lista de Pokémon.');
    }

    const data = await response.json();

    dataList.innerHTML = data.results.map(pokemon => {
      const nombre = pokemon.name;

      return `<option value="${nombre.charAt(0).toUpperCase() + nombre.slice(1)}">`;
    }).join('');
    console.log(`Lista de ${data.results.length} Pokémon cargada para el autocompletado.`);

  } catch (error) {
    console.error("No se pudo cargar la lista predictiva:", error);
  }
}

cargarListaPokemon();

button.addEventListener("click", async () => {
  const nombre = input.value.trim().toLowerCase();

  outputs.name.textContent = "Buscando...";
  outputs.img.innerHTML = "";
  contenedorInfo.style.display = "none";

  try {

    const response = await fetch(`${API_URL}/${nombre}`);

    if (!response.ok) {
      throw new Error(`No se ha podido encontrar ningún Pokémon ${response.status}`);
    }

    const json = await response.json();

    const nombrePokemon = json.name
    const imgFrontal = json.sprites.front_default;
    const altura = json.height
    const peso = json.weight

    outputs.name.textContent = nombrePokemon.charAt(0).toUpperCase() + nombrePokemon.slice(1);
    outputs.img.innerHTML = `<img src=${imgFrontal} alt="Sprite ${nombrePokemon}">`;
    outputs.height.textContent = (altura / 10).toString() + "m";
    outputs.weight.textContent = (peso / 10).toString() + "Kg";
    contenedorInfo.style.display = "block";

  } catch (err) {
    console.error("Error!!! Intentaló de nuevo!!!", err);
  }


})
