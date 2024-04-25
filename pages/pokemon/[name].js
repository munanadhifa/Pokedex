/* eslint-disable @next/next/no-img-element */
"use client";
import "../../app/globals.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function PokemonPage() {
  const router = useRouter();
  const { name } = router.query;
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);

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
    console.log("router query:", router.query);
    if (!name) return;

    async function fetchPokemonDetails() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    }

    fetchPokemonDetails();
  }, [name, router.query]);

  useEffect(() => {
    if (!pokemonData) return;

    async function fetchSpeciesDetails() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}/`
        );
        const data = await response.json();
        setSpeciesData(data);
      } catch (error) {
        console.error("Error fetching Pokémon species:", error);
      }
    }

    fetchSpeciesDetails();
  }, [pokemonData]);

  if (!pokemonData || !speciesData) {
    return <div>Loading...</div>;
  }

  const speciesDescription = speciesData.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  ).flavor_text;

  return (
    <main className="min-h-screen bg-fuchsia-400 p-20 font-mono">
      <div className="w-full items-center font-mono text-sm">
        <Link href={`/`}>
          <h1 className="text-center text-2xl mb-10">POKEDEX</h1>
        </Link>
      </div>
      <div className="mt-40 flex justify-evenly">
        <img
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
          className="w-50 h-50 mt-[50px]"
          loading="lazy"
        />

        <div>
          <div className="flex mt-[-100px]">
            <div className="px-4 py-5 sm:px-6 bg-fuchsia-500 flex rounded-r-sm">
              <img
                src={pokemonData.sprites.other.showdown.front_default}
                alt={pokemonData.name}
                className="w-7 h-7 mr-10"
                loading="lazy"
              />
              <h1 className="text-lg mt-0"> No {speciesData.id} </h1>
            </div>
            <div className=" px-4 py-5 sm:px-6 bg-black rounded-l-sm text-lg w-52">
              {pokemonData.name}
            </div>
          </div>

          <div className="mt-10">
            <div className="px-3 py-3 sm:px-5 bg-gray-200 flex rounded-r-sm text-black place-content-center">
              <h1>Detail Pokémon</h1>
            </div>

            <div className="mt-1 px-3 py-3 sm:px-5 bg-gray-200  rounded-r-sm text-black place-content-center divide-y divide-neutral-400">
              <div className="flex">
                <h1 className="mr-[100px]">Types</h1>
                <div className="flex ">
                  {pokemonData.types.map((type, typeIndex) => (
                    <p
                      key={typeIndex}
                      className=" mr-[20px] w-[100px] h-[25px] p-1  text-center text-xs text-white rounded overflow-hidden shadow-lg max-w-sm"
                      style={{
                        backgroundColor: colors[type.type.name],
                      }}
                    >
                      {type.type.name}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex mt-[15px] pt-[15px] ">
                <h1 className="mr-[100px]">Height</h1>
                <p>{pokemonData.height}</p>
              </div>

              <div className="flex mt-[15px] pt-[15px] ">
                <h1 className="mr-[100px]">Weight</h1>
                <p>{pokemonData.weight}</p>
              </div>

              <div className="flex mt-[15px] pt-[15px] ">
                <h1 className="mr-[100px]">Abilities</h1>
                <div className="flex ml-[-40px]">
                  {pokemonData.abilities.map((ability, index) => (
                    <p
                      key={index}
                      className="mr-4 px-2 py-1 text-xs text-white bg-gray-500 rounded"
                    >
                      {ability.ability.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-3 mt-1 py-3 sm:px-5 bg-gray-200 flex rounded-r-sm text-black place-content-center">
              <p className="w-[400px]">{speciesDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PokemonPage;
