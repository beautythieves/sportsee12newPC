import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import AsideNav from './components/AsideNav/AsideNav';
import UserPage from './components/UserPage/UserPage';

function App() {
  return (
    <div>
      <Header />
      <AsideNav />
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/user/0" />} />
          <Route  path="/user/:userId" element={<UserPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
