/* eslint-disable @next/next/no-img-element */
// pages/pokemon/[name].js

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
    <div>
      <h1>{pokemonData.name}</h1>
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
    </div>
  );
}

export default PokemonPage;
