import React from "react";

const TypeFilter = ({ selectedType, setSelectedType }) => {
  const types = [
    "All", "Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting",
    "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost",
    "Dark", "Dragon", "Steel", "Fairy"
  ];

  return (
    <select
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
      className="type-filter"
    >
      {types.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default TypeFilter;
