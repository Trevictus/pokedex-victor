const API_URL = "https://pokeapi.co/api/v2/pokemon/";

const input = document.getElementById("campoDeTexto");
const output = document.getElementById("pokemonImg");
const output2 = document.getElementById("nombrePokemon");
const button = document.getElementById("buscar");

button.addEventListener("click", async() => {
  const nombre = input.value.trim().toLowerCase();
  const response = await fetch(`${API_URL}/${nombre}`);
  const json = await response.json();

  const nombrePokemon = json.name
  const imgFrontal = json.sprites.front_default;

  output2.textContent = nombrePokemon;
  output.innerHTML = `<img src=${imgFrontal}>`;


})
