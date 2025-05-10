import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';

const TunisiePage = () => {
  const [hotelsTunisie, setHotelsTunisie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelsTunisie = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/hotel/hotels');
        const hotelsFiltered = res.data.filter(
          h => h.localisation?.country?.toLowerCase() !== 'tunisie'
        );
        setHotelsTunisie(hotelsFiltered);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des hôtels de Tunisie :", error);
        setLoading(false);
      }
    };

    fetchHotelsTunisie();
  }, []);

  return (
    <div className="font-sans bg-white min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-violet-800">Hôtels etranger</h1>
          <p className="text-gray-600 text-lg">Sélection d'hôtels uniquement etranger</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-violet-500"></div>
          </div>
        ) : hotelsTunisie.length === 0 ? (
          <p className="text-center text-gray-500">Aucun hôtel trouvé en Tunisie pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hotelsTunisie.map(h => (
              <HotelCard key={h._id} hotel={h} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TunisiePage;