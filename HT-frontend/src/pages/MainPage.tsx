import React from 'react';
import Navbar from '../components/Navbar'; // Assuming Navbar component is in the same directory
import '../assets/styles/MainPageStyle.css';
const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <h1>Welcome to Habit Tracker App</h1>
        <p>Here you can track your habits and stay organized!</p>
      </div>
    </div>
  );
};

export default HomePage;
