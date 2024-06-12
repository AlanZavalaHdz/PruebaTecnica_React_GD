import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './Components/NavbarComponent.jsx';
import Footer from './Components/FooterComponent.jsx'
import Login from './Views/LoginView.jsx';
import Dashboard from './Views/DashboardView.jsx';
import Datatable from './Views/DatatableView.jsx';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/datatable" element={<Datatable />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;