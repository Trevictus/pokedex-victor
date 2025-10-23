const API_URL = "https://pokeapi.co/api/v2/pokemon/";

const input = document.getElementById("campoDeTexto");
const button = document.getElementById("buscar");

const contenedorAltura = document.getElementById("contenedorAltura");
const contenedorPeso = document.getElementById("contenedorPeso");

const outputs = {
  img: document.getElementById("pokemonImg"),
  name: document.getElementById("nombrePokemon"),
  height: document.getElementById("alturavalor"),
  weight: document.getElementById("pesovalor"),
}

button.addEventListener("click", async() => {
  const nombre = input.value.trim().toLowerCase();

  outputs.name.textContent = "Buscando...";
  outputs.img.innerHTML = "";
  contenedorAltura.style.display = "none";
  contenedorPeso.style.display = "none";

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

  contenedorAltura.style.display = "block";
  contenedorPeso.style.display = "block";
  }catch(err) {
      console.error("Error!!! Intentaló de nuevo!!!", err);
  }


})
