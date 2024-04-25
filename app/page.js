/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

function Page() {
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortData, setSortData] = useState("asc");
  const [selectedType, setSelectedType] = useState("");
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
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
        );
        const data = await res.json();

        const pokemonDetailsPromises = data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const pokemonDetails = await response.json();
          return pokemonDetails;
        });

        const completePokemonData = await Promise.all(pokemonDetailsPromises);
        setPokemonData(completePokemonData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const filteredSortedPokemon = pokemonData
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((pokemon) =>
      selectedType
        ? pokemon.types.some((type) => type.type.name === selectedType)
        : true
    )
    .sort((a, b) => {
      if (sortData === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const handleSort = () => {
    const newSortOrder = sortData === "asc" ? "desc" : "asc";
    setSortData(newSortOrder);
  };

  if (error) return <div>Error: {error.message}</div>;
  if (!pokemonData) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-fuchsia-400 p-20">
      <div className="w-full items-center font-mono text-sm">
        <h1 className="text-center text-2xl mb-10">POKEDEX</h1>

        <div className="flex">
          <form className="max-w-md mx-auto w-full mb-10">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white  "
                placeholder="Search Pokemon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
            </div>
          </form>

          <select
            className=" w-full h-[50px] ml-[30px] block  p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Types</option>
            {Object.keys(colors).map((type, index) => (
              <option key={index} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          <button
            className="w-full h-[50px] ml-[30px]  mt-[5px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSort}
          >
            Sort by Name ({sortData === "asc" ? "A-Z" : "Z-A"})
          </button>
        </div>
        <div>
          <ul className="grid grid-cols-4 gap-4">
            {filteredSortedPokemon
              .filter((pokemon) =>
                pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
              )

              .map((pokemon, index) => (
                <li key={index}>
                  <div
                    className="rounded overflow-hidden shadow-lg max-w-sm bg-white pb-5 h-[100%]"
                    style={{ textAlign: "-webkit-center" }}
                  >
                    <Link href={`pokemon/${pokemon.name}`}>
                      <div className="p-6">
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                          alt={pokemon.name}
                          className="w-35 h-30 mr-4"
                        />
                        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                          {pokemon.name}
                        </h5>
                        <ul className="flex justify-evenly mt-5 font-semibold ">
                          {pokemon.types.map((type, typeIndex) => (
                            <li
                              key={typeIndex}
                              className="w-[100px] h-[25px] p-1 text-xs text-white rounded overflow-hidden shadow-lg max-w-sm"
                              style={{
                                backgroundColor: colors[type.type.name],
                              }}
                            >
                              {type.type.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Link>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Page;
