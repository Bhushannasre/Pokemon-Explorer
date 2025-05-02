import React from "react";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="card">
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <p>Type: {pokemon.types.join(", ")}</p>
    </div>
  );
};

export default PokemonCard;
