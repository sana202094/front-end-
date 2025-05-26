import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Destination() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/api/hotels')
      .then(response => {
        setHotels(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Erreur lors du chargement des hôtels');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des hôtels...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Liste des Hôtels</h2>
      <ul>
        {hotels.map(hotel => (
          <li key={hotel.id}>
            <strong>{hotel.name}</strong> - {hotel.location} - Note : {hotel.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Destination;
