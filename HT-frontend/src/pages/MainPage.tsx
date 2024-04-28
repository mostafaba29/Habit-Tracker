import React from 'react';
import SideBar from '../components/SideBar'; 
import QuoteSection from '../components/QuoteSection';
import '../assets/styles/MainPageStyle.css';
const HomePage: React.FC = () => {
  return (
    <div>
      <QuoteSection />
      <SideBar />
    </div>
  );
};

export default HomePage;
