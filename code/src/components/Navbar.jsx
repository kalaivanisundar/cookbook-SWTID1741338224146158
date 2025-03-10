import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">CookBook</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/category/indian">Indian</Link>
        <Link to="/category/continental">Continental</Link>
      </div>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;