import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newReservation, setNewReservation] = useState({
    userId: '',
    hotelId: '',
    chambreId: '',
    checkInDate: '',
    checkOutDate: '',
    totalPrice: 0,
  });
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [chambres, setChambres] = useState([]);
  const fetchReservations = async () => {
    try {
      const res = await axios.get('/reservations');
      setReservations(res.data);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setError('Failed to fetch reservations.');
    } finally {
      setLoading(false);
    }
  };
  const useDropdownData = () => {
    const [users, setUsers] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [chambres, setChambres] = useState([]);
    const [error, setError] = useState(null);
    const fetchDropdownData = async () => {
      try {
        const [usersRes, hotelsRes, chambresRes] = await Promise.all([
          axios.get('/user/users'),
          axios.get('/hotel/hotels'),
          axios.get('/chambre/chambres'),
        ]);
        setUsers(usersRes.data);
        setHotels(hotelsRes.data);
        setChambres(chambresRes.data);
      } catch (err) {
        console.error('Erreur lors du chargement des données pour les menus déroulants :', err);
        setError('Échec du chargement des données.');
      }
    };
    useEffect(() => {
      fetchDropdownData();
    }, []);
    return { users, hotels, chambres, error };
  };
  useEffect(() => {
    fetchReservations();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'hotelId' || name === 'chambreId' || name === 'checkInDate' || name === 'checkOutDate') {
      calculateTotalPrice();
    }
  };
  const calculateTotalPrice = async () => {
    if (newReservation.hotelId && newReservation.chambreId && newReservation.checkInDate && newReservation.checkOutDate) {
      const hotel = hotels.find(hotel => hotel._id === newReservation.hotelId);
      const chambre = chambres.find(chambre => chambre._id === newReservation.chambreId);
      if (hotel && chambre) {
        const checkIn = new Date(newReservation.checkInDate);
        const checkOut = new Date(newReservation.checkOutDate);
        const numberOfNights = (checkOut - checkIn) / (1000 * 3600 * 24);
        const total = numberOfNights * chambre.price * hotel.pricePerNight; 
        setNewReservation(prev => ({ ...prev, totalPrice: total }));
      }
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/reservation', newReservation);
      fetchReservations();
      setShowForm(false);
    } catch (err) {
      console.error('Error creating reservation:', err);
      alert('Failed to create reservation.');
    }
  };
  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`/${id}/status`, { status });
      fetchReservations();
    } catch (err) {
      console.error('Error changing status:', err);
      alert('Failed to update reservation status.');
    }
  };
  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      try {
        await axios.delete(`/reservations/${id}`);
        fetchReservations();
      } catch (err) {
        console.error('Error deleting reservation:', err);
        alert('Failed to delete reservation.');
      }
    }
  };
  if (loading) return <div className="p-4">Chargement des réservations...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Gestion des réservations</h2>
      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 mb-6"
      >
        {showForm ? 'Cancel' : 'Ajouter  réservation'}
      </button>
      {showForm && (
        <form onSubmit={handleFormSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="userId" className="block">User ID:</label>
            <select
              id="userId"
              name="userId"
              value={newReservation.userId}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            >
              <option value="">Sélectionnez un utilisateur</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="hotelId" className="block">Hotel ID:</label>
            <select
              id="hotelId"
              name="hotelId"
              value={newReservation.hotelId}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            >
              <option value="">Sélectionnez un hôtel</option>
              {hotels.map((hotel) => (
                <option key={hotel._id} value={hotel._id}>
                  {hotel.nomh}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="chambreId" className="block">Chambre ID:</label>
            <select
              id="chambreId"
              name="chambreId"
              value={newReservation.chambreId}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            >
              <option value="">Sélectionner une chambre</option>
              {chambres.map((chambre) => (
                <option key={chambre._id} value={chambre._id}>
                  {chambre.numCh}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="checkInDate" className="block">Date d'arrivée :</label>
            <input
              type="date"
              id="checkInDate"
              name="checkInDate"
              value={newReservation.checkInDate}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="checkOutDate" className="block">Date de départ :</label>
            <input
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              value={newReservation.checkOutDate}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="totalPrice" className="block">Prix ​​total:</label>
            <input
              type="number"
              id="totalPrice"
              name="totalPrice"
              value={newReservation.totalPrice}
              readOnly
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Créer une réservation
          </button>
        </form>
      )}
      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Client</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Hotel</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Chambre</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Dates</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Total</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(reservation => (
                <tr key={reservation._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{reservation.userId?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{reservation.hotelId?.nomh || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{reservation.chambreId?.numCh || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(reservation.checkInDate).toLocaleDateString()} →{' '}
                    {new Date(reservation.checkOutDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{reservation.totalPrice} DT</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{reservation.status}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      {reservation.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleStatusChange(reservation._id, 'Confirmed')}
                          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                        >
                          Confirmer
                        </button>
                      )}
                      {reservation.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleStatusChange(reservation._id, 'Cancelled')}
                          className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                        >
                          Annuler
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(reservation._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm ml-2"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default ManageReservations;