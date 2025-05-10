import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/hotel');
        setHotels(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des hôtels:', error);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="font-sans bg-gradient-to-br from-violet-50 to-cyan-100 min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-violet-700 mb-2">Découvrez nos Hôtels ✨</h1>
          <p className="text-gray-600 text-lg">Les meilleurs endroits pour rendre vos séjours inoubliables</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-violet-500"></div>
          </div>
        ) : hotels.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">Aucun hôtel trouvé pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hotels.map(h => (
              <HotelCard
                key={h._id}
                hotel={{
                  idH: h._id,
                  nomH: h.nomh,
                  descriptionH: h.description,
                  adresseH: h.adresse || "Adresse à ajouter",
                  telephoneH: h.numTelephone,
                  image: h.images?.[0] || '/images/default-hotel.jpg',
                }}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Hotels;
