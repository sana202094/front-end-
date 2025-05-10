import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MesReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [updatedDates, setUpdatedDates] = useState({ checkInDate: '', checkOutDate: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser?._id;

    if (!userId) {
      console.error("Utilisateur non connecté.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5001/api/reservations/user/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur de l'API");
        return res.json();
      })
      .then(data => {
        setReservations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des réservations:', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (reservationId) => {
    console.log("ID envoyé pour suppression :", reservationId);

    if (!window.confirm("Voulez-vous vraiment supprimer cette réservation ?")) return;

    try {
      const res = await fetch(`http://localhost:5001/api/reservations/${reservationId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");

      setReservations(prev => prev.filter(r => r._id !== reservationId));
    } catch (err) {
      console.error("Erreur de suppression:", err);
    }
  };

  const handleEditClick = (res) => {
    setEditId(res._id);
    setUpdatedDates({
      checkInDate: res.checkInDate.split('T')[0],
      checkOutDate: res.checkOutDate.split('T')[0],
    });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDates),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      const updatedReservation = await res.json();

      setReservations(prev =>
        prev.map(r => (r._id === id ? updatedReservation : r))
      );
      setEditId(null);
    } catch (err) {
      console.error("Erreur de mise à jour:", err);
    }
  };

  if (loading) return <p>Chargement des réservations...</p>;
  if (reservations.length === 0) return <p>Vous n'avez aucune réservation.</p>;

  return (
    <div className="font-sans">
    <Header/> 
   <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🛏️ Mes Réservations</h2>
      <ul className="space-y-4">
        {reservations.map((res) => (
          <li key={res._id} className="border p-4 rounded shadow">
            {editId === res._id ? (
              <div>
                <div className="mb-2">
                  <label className="block mb-1">Date d'arrivée:</label>
                  <input
                    type="date"
                    value={updatedDates.checkInDate}
                    onChange={(e) =>
                      setUpdatedDates({ ...updatedDates, checkInDate: e.target.value })
                    }
                    className="border p-1 rounded w-full"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Date de départ:</label>
                  <input
                    type="date"
                    value={updatedDates.checkOutDate}
                    onChange={(e) =>
                      setUpdatedDates({ ...updatedDates, checkOutDate: e.target.value })
                    }
                    className="border p-1 rounded w-full"
                  />
                </div>
                <button
                  onClick={() => handleUpdate(res._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Enregistrer
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Annuler
                </button>
              </div>
            ) : (
              <div>
                <p><strong>Hôtel:</strong> {res.hotelId?.nomh}</p>
                <p><strong>Chambre:</strong> {res.chambreId?.numCh}</p>
                <p><strong>Arrivée:</strong> {new Date(res.checkInDate).toLocaleDateString()}</p>
                <p><strong>Départ:</strong> {new Date(res.checkOutDate).toLocaleDateString()}</p>
                <button
                  onClick={() => handleEditClick(res)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(res._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Supprimer
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
    <Footer />
    </div>
  );
};

export default MesReservations;
