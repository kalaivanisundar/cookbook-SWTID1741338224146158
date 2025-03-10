import React from 'react';

const Hero = ({ onGetStarted }) => {
  return (
    <div className="hero">
      <h1>Explore Culinary Delights</h1>
      <p>Discover recipes that inspire your kitchen adventures.</p>
      <button onClick={onGetStarted} className="btn">Get Started</button>
    </div>
  );
};

export default Hero;