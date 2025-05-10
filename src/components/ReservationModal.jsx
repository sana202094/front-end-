import { useState } from 'react';

const ReservationModal = ({ isOpen, onClose, onSubmit, chambre, hotelId, userId }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleSubmit = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Veuillez remplir les deux dates.");
      return;
    }

    onSubmit({
      userId,
      hotelId,
      chambreId: chambre._id,
      checkInDate,
      checkOutDate,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Réserver la chambre {chambre.numCh}
        </h2>

        <div className="mb-4">
          <label className="block mb-1">📅 Date d'arrivée:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">📅 Date de départ:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
