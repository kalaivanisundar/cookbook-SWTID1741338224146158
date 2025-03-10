import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './features/recipes/Home';
import Category from './features/recipes/Category';
import RecipeDetails from './features/recipes/RecipeDetails';
import SearchResults from './features/recipes/SearchResults';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;