import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import HotelDetails from './pages/HotelDetails';
import TunisiePage from './pages/TunisiePage';
import EtrangerPage from './pages/EtrangerPage';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import About from './pages/About';
import Dashboard from './admin/Dashboard';
import ManageHotels from './admin/ManageHotels';
import ManageReservations from './admin/ManageReservations';
import ManageUsers from './admin/ManageUsers';
import ChambreDetails from './pages/ChambreDetails';
import MesReservations from './pages/MesReservations';
import AdminRoute from './components/AdminRoute'; // 👈 import
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/chambre/:chambreId" element={<ChambreDetails />} />
        <Route path="/tunisie" element={<TunisiePage />} />
        <Route path="/etranger" element={<EtrangerPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/MesReservations" element={<MesReservations />} />

        {/* Routes admin protégées */}
        <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/hotels" element={<AdminRoute><ManageHotels /></AdminRoute>} />
        <Route path="/admin/reservations" element={<AdminRoute><ManageReservations /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
        
      </Routes>
    </Router>
  );
};
export default App;
