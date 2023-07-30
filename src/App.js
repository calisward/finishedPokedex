import React, { useState } from 'react';
import './App.css';
import PokedexList from './pokedexList'
import PokemonList from './pokemonList';
import PokemonDetails from './pokemonDetails';

const Poke = require('pokeapi-js-wrapper');
const Pokedex = new Poke.Pokedex();

function App() {
  
/** Req 1
 * After the applicatin is loaded present a list of pokedexes returned from the api
 */
  const [selectedPokedex, setSelectedPokedex] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Setting the selected Pokedex to whatever name is being selected from the pokedex list
  const theSelectedPokedex = (pokedexName) => {
    setSelectedPokedex(pokedexName);
  }

  const theSelectedPokemon = (pokemonName) => {
    setSelectedPokedex(pokemonName);
  }

  const goBack = () => {
    if (selectedPokemon) {
      setSelectedPokemon(null);
    } else {
      setSelectedPokedex(null);
    }
  }

  // On the initial home page these selections should be set to null meaning it will reset to the default state of the page
  const homePage = () => {
    setSelectedPokedex(null); 
    setSelectedPokemon(null);
  }

  // No back/home page rendered bc this is the default page
  if (selectedPokedex === null) {
    // return pokedexList;
    return <PokedexList api={Pokedex} onClick={theSelectedPokedex}/>
  }

  /** Req 4
   * Given that a user sees a list of Pokedexes to select from
   * After the view button is clicked
   * A list of Pokemon is presented from the pokedex
   */
  if (selectedPokemon === null) {
    return (
      <PokemonList api={Pokedex} onClick={theSelectedPokemon} pokedex={selectedPokedex} homePage={homePage} goBack={goBack}/>
    )
  }

  /** Req 7
   * Given a user sees a list of pokemon to select
   * when the view details button is clicked for a pokemon
   * The details of the selected Pokemon is presented
   */

   // return pokemonList;
  //  return pokemonDetails;
  return (
    <PokemonDetails api={Pokedex} pokemon={selectedPokemon} homePage={homePage} goBack={goBack}/>
    )
// No html element rendered because everything is already rendered though the api then more is called after selections
}

export default App;
