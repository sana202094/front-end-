import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import HotelList from '../components/HotelList';
import Footer from '../components/Footer';
import axios from '../api/axios';

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filters, setFilters] = useState({
    destination: '',
    startDate: '',
    endDate: '',
  });
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get('/hotel/hotels');
        setHotels(res.data);
        setFilteredHotels(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des hôtels:', err);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    const { destination } = filters;

    const filtered = hotels.filter(hotel =>
      hotel.nomh?.toLowerCase().includes(destination.toLowerCase())
    );

    setFilteredHotels(filtered);
  }, [filters.destination, hotels]);

  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <SearchBar filters={filters} setFilters={setFilters} />
     
      <HotelList hotels={filteredHotels} />
      <Footer />
    </div>
  );
};

export default Home;