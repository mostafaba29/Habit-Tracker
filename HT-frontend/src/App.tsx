import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import MainPage from './pages/MainPage'; 
import Habits from './pages/Habits';

const App: React.FC = () => {
 return (
    <Router>
      <Routes>
        <Route path="/home" element={<MainPage />} />
        <Route path="/habits" element={<Habits />} />
      </Routes>
    </Router>
 );
};

export default App;
