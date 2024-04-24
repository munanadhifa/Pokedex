/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

function Page() {
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(null);
  const limit = 30;

  const colors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}}`
        );
        const data = await res.json();

        // Fetch additional details for each Pokémon (including types)
        const pokemonDetailsPromises = data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const pokemonDetails = await response.json();
          return pokemonDetails;
        });

        // Resolve all promises and update state with the complete Pokémon data
        const completePokemonData = await Promise.all(pokemonDetailsPromises);
        setPokemonData(completePokemonData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!pokemonData) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-fuchsia-400 p-20">
      <div className="w-full items-center font-mono text-sm">
        <h1 className="text-center text-2xl mb-10">POKEDEX</h1>
        <div>
          <ul className="grid grid-cols-4 gap-4">
            {pokemonData.map((pokemon, index) => (
              <li key={index}>
                <Link href={`pokemon/${pokemon.name}`}>
                  <div
                    className="rounded overflow-hidden shadow-lg max-w-sm bg-white pb-5 h-[100%]"
                    style={{ textAlign: "-webkit-center" }}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        index + 1
                      }.png`}
                      alt={pokemon.name}
                      className="w-35 h-30 mr-4"
                    />
                    <span className="text-black text-base pb-10">
                      {pokemon.name}
                    </span>
                    <div>
                      <ul className="flex justify-evenly mt-5 font-semibold ">
                        {pokemon.types.map((type, typeIndex) => (
                          <li
                            key={typeIndex}
                            className="w-[50px] h-[25px] p-1  text-xs text-white rounded overflow-hidden shadow-lg max-w-sm"
                            style={{
                              backgroundColor: colors[type.type.name],
                            }}
                          >
                            {type.type.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Page;
