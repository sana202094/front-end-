import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [hotelSuggestions, setHotelSuggestions] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔁 Fetch all hotels when component mounts
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/hotel/hotels');
        setAllHotels(response.data);
      } catch (error) {
        console.error('Erreur de chargement des hôtels:', error);
      }
    };
    fetchHotels();
  }, []);

  // ✏️ Handle input change and generate suggestions
  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 1) {
      const filtered = allHotels.filter(hotel =>
        hotel.nomh.toLowerCase().includes(value.toLowerCase())
      );
      setHotelSuggestions(filtered);
    } else {
      setHotelSuggestions([]);
    }
  };

  // 🔍 Search button filters hotels by name
  const handleSearchHotels = () => {
    const results = allHotels.filter(hotel =>
      hotel.nomh.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredHotels(results);
  };

  return (
    <div>
      <div className="bg-white shadow p-4 -mt-12 mx-12 md:mx-32 rounded-lg relative z-10">
        <div className="grid md:grid-cols-4 gap-3">
          <div className="relative col-span-3">
            <input
              type="text"
              placeholder="📍 Où allez-vous ?"
              value={query}
              onChange={handleQueryChange}
              className="w-full border p-2 rounded"
            />
            {hotelSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border rounded-lg mt-1 w-full shadow-lg max-h-60 overflow-auto">
                {hotelSuggestions.map((hotel) => (
                  <li
                    key={hotel._id}
                    className="p-3 hover:bg-gray-100 cursor-pointer flex gap-3 items-start"
                  >
                    <FaMapMarkerAlt className="text-blue-500 mt-1" />
                    <div>
                      <Link
                        to={`/hotel/${hotel._id}`}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {hotel.nomh}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={handleSearchHotels}
            disabled={!query.trim()}
            className={`font-bold px-4 py-2 rounded ${query.trim()
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
          >
            🔍 Rechercher
          </button>
        </div>
      </div>

      {/* 🏨 Results */}
      <div className="mt-6 mx-12 md:mx-32">
        {loading ? (
          <p className="text-center text-gray-500">Chargement...</p>
        ) : filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="p-4 border rounded mb-2 shadow hover:bg-gray-50 transition"
            >
              <Link
                to={`/hotel/${hotel._id}`}
                className="text-xl font-bold text-blue-600 hover:underline"
              >
                {hotel.nomh}
              </Link>
            </div>
          ))
        ) : (
          query && (
            <p className="text-center text-gray-500 mt-4">
              Aucun hôtel trouvé pour cette destination.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;
