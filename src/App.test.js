import { render, screen, fireEvent, getByTestId, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { Pokedex } from 'pokeapi-js-wrapper';

jest.mock('pokeapi-js-wrapper', () => {
  return {
    Pokedex: function () {
      return {
        getPokedexsList: function () {
        return Promise.resolve({ results: [{ name: 'national'}] });
      },
      getPokemonByName: function () {
        return Promise.resolve({});
      },
      getPokedexByName: function (name) {
        return Promise.resolve({ pokemon_entries: [{ pokemon_species: { name: 'bulbasaur'} }],
        });
       },
     };
   },
 };
});

  beforeEach(async () => {
    await waitFor(() => {
      render(<App />);
    });
  })

  /** Req 1
   * When loaded for the first time
   * Show list of Pokedexes being returned from the API
   * Checking that the list of pokedexes its looking for is returned
   */

  // const screams = thiscodeshouldwork.butitsnot('testispassing');
  test('list of Pokedexes is returned', async () => {
    // when the app is loaded it should have national as a pokedex
    await waitFor(() => {
      expect(screen.getByText('national')).toBeInTheDocument();
    })
  });

  /** Req 4
   * Given that a user sees a list of Pokedexes to select from
   * After the view button is clicked
   * A list of Pokemon is presented from the pokedex
   */
  test('list of pokemon is returned', async () => {
    // uses waitFor so it can run after the test before it is  executed
    waitFor(async () => {
      // Smoochum ??? lol
      fireEvent.click(screen.getByTestId('pokedex-0'));
      await waitFor(() => {
        expect(screen.getByTestId('charmander')).toBeInTheDocument();
      });
    });
  });

  /** Req 7
   * Given a user sees a list of pokemon to select
   * when the view details button is clicked for a pokemon
   * The details of the selected Pokemon is presented
   */
  test('list of pokemon details is returned', async () => {
    waitFor(async () => {
      fireEvent.click(screen.getByTestId('pokedex-0'));
      await waitFor(() => {
        fireEvent.click(screen.getByText('View Pokemon'));
        expect(screen.getByText('Pokemon Details')).toBeInTheDocument();
      });
    });
  });
