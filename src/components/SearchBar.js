import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search for construction bids (e.g., roofing repair, foundation work)..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}
