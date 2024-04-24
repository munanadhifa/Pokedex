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

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

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
        />

        <div>
          <div className="flex mt-[-100px]">
            <div className="px-4 py-5 sm:px-6 bg-fuchsia-500 flex rounded-r-sm">
              <img
                src={pokemonData.sprites.other.showdown.front_default}
                alt={pokemonData.name}
                className="w-7 h-7 mr-10"
              />
              <h1 className="text-lg mt-0"> No {pokemonData.id} </h1>
            </div>
            <div className=" px-4 py-5 sm:px-6 bg-black rounded-l-sm text-lg w-52">
              {pokemonData.name}
            </div>
          </div>

          <div className="mt-10">
            <div className="px-3 py-3 sm:px-5 bg-gray-200 flex rounded-r-sm text-black place-content-center">
              <h1>Detail Pokémon</h1>
            </div>

            <div className="mt-1 px-3 py-3 sm:px-5 bg-gray-200 flex rounded-r-sm text-black place-content-center">
              <h1>Detail Pokémon</h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PokemonPage;
