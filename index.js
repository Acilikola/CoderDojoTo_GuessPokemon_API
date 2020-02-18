// Import stylesheets
import "./style.css";

const pokeApiUrl = "https://pokeapi.co/api/v2/";
const shImg = document.getElementById("shadowImg");
const guessInp = document.getElementById("guess");
const wrongGuessList = document.getElementById("wrongGuessList");
const pokedexVersion = 2; //all Pokemons = 1, original Pokemons = 2
const cheat = false; //false
var pokemon;
var pokedex = [];
var wrongGuesses = [];

function getPokemonDetails(pokeId) {
  fetch(pokeApiUrl + 'pokemon/' + pokeId)
  .then(response => {
    return response.json();
  })
  .then(pokeJson => {
    pokemon = pokeJson;
    //console.log(pokemon);
    //TODO handle weirdly named pokemon (nidoran_f, nidoran_m and mr-mime. others?
    shImg.src = pokemon.sprites.front_default;
    if(cheat) {
      document.getElementById("cheatTxt").innerHTML = pokemon.name;
    }
  });
}

function verifyPokemon() {
  var guessVal = guessInp.value;
  if (guessVal.toLowerCase() === pokemon.name.toLowerCase()) {
    shImg.classList.add("reveal");
    wrongGuesses = [];
    alert("Correct!");
    getNewRandomPokemon();
  } else {
    wrongGuesses.push(guessVal);
    console.log("Wrong Guess: " + guessVal);
  }
  guessInp.value = '';
  printGuesses();
}

function printGuesses() {
  wrongGuessList.innerHTML = "";
  for(var i = 0; i < wrongGuesses.length; i++) {
    wrongGuessList.innerHTML += "<li>" + wrongGuesses[i] + "</li>";
  }
}

function initPokedex(version) {
    fetch(pokeApiUrl + "pokedex/" + pokedexVersion + "/")
      .then(response => {
        return response.json();
      })
      .then(pokedexJson => {
        pokedex = pokedexJson.pokemon_entries;
        //console.log(pokedex);
      });
}

function getNewRandomPokemon() {
  shImg.classList.remove("reveal");
  wrongGuesses = [];
  printGuesses();
  if(pokedex == null || pokedex.length <= 0) {
  	initPokedex(pokedexVersion);
  } else {
    //console.log(pokedex);
    var randomPokemon = pokedex[Math.floor(Math.random() * pokedex.length)];
    //console.log(randomPokemon);
    getPokemonDetails(randomPokemon.entry_number);
  }
}

getNewRandomPokemon();

window.verifyPokemon = verifyPokemon;
window.getNewRandomPokemon = getNewRandomPokemon;