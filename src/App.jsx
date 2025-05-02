import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TypeFilter from "./components/TypeFilter";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=150");
        const pokemonData = await Promise.all(
          res.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.front_default,
              types: details.data.types.map((type) => type.type.name),
            };
          })
        );
        setPokemons(pokemonData);
        setLoading(false);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to fetch Pokémon data.");
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || pokemon.types.includes(selectedType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div>
      <Header />
      <div className="controls">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>

      {loading && <p className="status">Loading Pokémon...</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && filteredPokemons.length === 0 && <p className="status">No Pokémon found.</p>}

      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
