import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';  

import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaBed, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaAlignLeft } from 'react-icons/fa';

const ChambreDetails = () => {
  const { chambreId } = useParams();
  const [chambre, setChambre] = useState(null);
  const [reservedDates, setReservedDates] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChambre = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/chambre/chambre/${chambreId}`);

        const { chambre, reservedDates } = res.data;
        setChambre(chambre);
        setReservedDates(reservedDates);
      } catch (err) {
        console.error('Erreur chargement chambre:', err);
        setError('Impossible de charger les détails de la chambre.');
      } finally {
        setLoading(false);
      }
    };
    fetchChambre();
  }, [chambreId]);

  if (loading) {
    return <p className="text-center py-20 text-gray-500 text-lg">Chargement des données...</p>;
  }

  if (error) {
    return <p className="text-center py-20 text-red-500">{error}</p>;
  }

  if (!chambre) {
    return <p className="text-center py-20 text-gray-400">Chambre introuvable.</p>;
  }
  const isDateReserved = (date) => {
    return reservedDates.some(({ checkInDate, checkOutDate }) => {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      return date >= checkIn && date < checkOut;
    });
  };
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (isDateReserved(date)) {
        return 'reserved-date'; 
      }
      return 'available-date';
    }
    return null;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <img
              src={chambre.imageCh}
              alt={`Chambre ${chambre.numCh}`}
              className="rounded-lg w-full h-80 object-cover shadow-lg"
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">Chambre {chambre.numCh}</h1>
            <p className="text-gray-600 text-lg">{chambre.typeCh}</p>

            <div className="flex items-center gap-3 text-gray-700">
              <FaAlignLeft className="text-violet-600" />
              <span><strong>Description :</strong> {chambre.description}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaBed className="text-violet-600" />
              <span><strong>Nombre de lits :</strong> {chambre.nbLits}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaMoneyBillWave className="text-green-600" />
              <span><strong>Tarif :</strong> {chambre.tarif} DT / nuit</span>
            </div>

            
            <div>
              <h2 className="text-xl font-semibold mb-4">Disponibilité</h2>
              <Calendar
                tileClassName={tileClassName}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        .reserved-date {
          background: #f87171 !important;  /* red-400 */
          color: white !important;
          border-radius: 50%;
        }
        .available-date {
          background: #a7f3d0 !important;  /* green-200 */
          color: black !important;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default ChambreDetails;
