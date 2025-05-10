import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservationModal from '../components/ReservationModal';
const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedChambre, setSelectedChambre] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/hotel/${id}`);
        setHotel(res.data);
      } catch (err) {
        console.error('Erreur chargement hôtel:', err);
        setError("Impossible de charger les détails de l'hôtel.");
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  const handleReserve = (chambre) => {
    setSelectedChambre(chambre);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedChambre(null);
  };

  const handleReservationSubmit = async ({ checkInDate, checkOutDate }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;
  
  
    if (!userId) {
      navigate('/login')
     
      return;
    }
  
    try {
      await axios.post('http://localhost:5001/api/reservation', {
        userId,
        hotelId: hotel._id,
        chambreId: selectedChambre._id,
        checkInDate,
        checkOutDate,
      });
      alert('Réservation réussie !');
      handleModalClose();
    } catch (err) {
      console.error('Erreur lors de la réservation:', err);
      alert(err.response?.data?.message || 'Erreur pendant la réservation.');
    }
  };
  

  const handleVoirDetails = (chambreId) => {
    navigate(`/chambre/${chambreId}`);
  };

  if (loading) return <p className="text-center p-10">Chargement...</p>;
  if (error) return <p className="text-center p-10 text-red-500">{error}</p>;
  if (!hotel) return <p className="text-center p-10">Hôtel introuvable.</p>;

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Header />

      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">{hotel.nomh}</h1>
        <p className="text-gray-600 mb-4">{hotel.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotel.chambres?.map((chambre) => (
            <div key={chambre._id} className="bg-white p-4 rounded shadow">
              <img
                src={chambre.imageCh}
                alt={chambre.numCh}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-2">Chambre {chambre.numCh}</h3>
              <p>Type: {chambre.typeCh}</p>
              <p>Tarif: {chambre.tarif} €</p>
              <button
                onClick={() => handleReserve(chambre)}
                className="mt-2 w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
              >
                Réserver
              </button>
              <button
                onClick={() => handleVoirDetails(chambre._id)}
                className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Voir détails
              </button>
            </div>
          ))}
        </div>
      </main>

      {isModalOpen && selectedChambre && (
        <ReservationModal
          isOpen={isModalOpen}
          chambre={selectedChambre}
          hotelId={hotel._id}
          userId={localStorage.getItem('userId')}
          onClose={handleModalClose}
          onSubmit={handleReservationSubmit}
        />
      )}

      <Footer />
    </div>
  );
};

export default HotelDetails;
