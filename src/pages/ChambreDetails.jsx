import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ChambreDetails = () => {
  const { chambreId } = useParams();
  const [chambre, setChambre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChambre = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/chambre/chambre/${chambreId}`);
        setChambre(res.data);
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
    return <p className="text-center p-10 text-gray-600">Chargement des données...</p>;
  }

  if (error) {
    return <p className="text-center p-10 text-red-500">{error}</p>;
  }

  if (!chambre) {
    return <p className="text-center p-10 text-gray-500">Chambre introuvable.</p>;
  }

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Header />

      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{chambre.numCh}</h1>
        <p className="text-lg text-gray-500 mb-6">{chambre.typeCh}</p>
        <img
          src={chambre.imageCh}
         
          className="w-full h-80 object-cover rounded-lg shadow-md mb-6"
        />

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Détails de la chambre</h3>
          <p className="text-gray-600 text-sm">Prix: {chambre.tarif}DT</p>
        <p className="text-gray-600 text-sm"> {chambre.tarif}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChambreDetails;