import React, { useState, useEffect } from 'react';

// Hooks pokemon
// hasError if 

function PokemonList(props) {
    const { api, onClick, pokedex } = props;
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        api
        // After the pokedex is selected, get the name
          .getPokedexByName(pokedex)
          // Res = result of the name and set to the pokemon entries
          .then((res) => {
            setPokemon(res.pokemon_entries);
          })
          .catch((e) => {
            console.error(e);
          });
    }, [api, pokedex]); // Loads the api and the selection of pokedex once

    return (
        <>
            <div>
                <button onClick={props.goBack}>Back</button>
                <button onClick={props.homePage}>Home</button>
            </div>

            <h1>Select a Pokemon!</h1>

            <ol>
                {pokemon.map((pokemon) => (
                    <li key={pokemon.pokemon_species.name}
                        className={pokemon.pokemon_species.name}>

                    {pokemon.pokemon_species.name}
                    <button onClick={() => onClick(pokemon.pokemon_species.name)}>View Stats</button>
                    </li>
                ))}
            </ol>
        </>
    );
}

export default PokemonList;