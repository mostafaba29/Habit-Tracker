import React from 'react';
import SideBar from '../components/SideBar'; 
import QuoteSection from '../components/QuoteSection';
import GoogleAuthButton from '../components/GoogleAuthButton';
import '../assets/styles/MainPageStyle.css';
const HomePage: React.FC = () => {
  return (
    <div>
      {/* <QuoteSection />
      <SideBar /> */}
      <GoogleAuthButton />
    </div>
  );
};

export default HomePage;
