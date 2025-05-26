import axios from '../api/axios';
import React, { useEffect, useState } from 'react';

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [allChambres, setAllChambres] = useState([]);
  
  const [formData, setFormData] = useState({
    nomh: '',
    localisation: {
      address: '',
      city: '',
      country: '',
      latitude: '',
      longitude: ''
    },
    numTelephone: '',
    categories: '3 étoiles',
    description: '',
    images: '',
    chambres: []
  });

  const fetchHotels = async () => {
    try {
      const res = await axios.get('/hotel/hotels');
      setHotels(res.data);
    } catch (err) {
      console.error('Error fetching hotels:', err);
    }
  };

  const fetchChambres = async () => {
    try {
      const res = await axios.get('/chambre/chambres'); 
      setAllChambres(res.data);
    } catch (err) {
      console.error('Error fetching chambres:', err);
    }
  };
  useEffect(() => {
    fetchHotels();
    fetchChambres();
  }, 
  []);
  const handleChange = e => {
    const { name, value } = e.target;
    if (name.startsWith('localisation.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        localisation: {
          ...prev.localisation,
          [key]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleChambreChange = (id) => {
    setFormData(prev => {
      const isSelected = prev.chambres.includes(id);
      return {
        ...prev,
        chambres: isSelected
          ? prev.chambres.filter(cid => cid !== id)
          : [...prev.chambres, id]
      };
    });
  };
  const openModal = (hotel = null) => {
    setEditingHotel(hotel);
    setFormData(
      hotel
        ? {
            ...hotel,
            localisation: hotel.localisation || {
              address: '',
              city: '',
              country: '',
              latitude: '',
              longitude: ''
            },
            images: Array.isArray(hotel.images) ? hotel.images.join(', ') : hotel.images,
            chambres: hotel.chambres || []
          }
        : {
            nomh: '',
            localisation: {
              address: '',
              city: '',
              country: '',
              latitude: '',
              longitude: ''
            },
            numTelephone: '',
            categories: '3 étoiles',
            description: '',
            images: '',
            chambres: []
          }
    );
    setModalOpen(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const processedData = {
      ...formData,
      localisation: {
        ...formData.localisation,
        latitude: parseFloat(formData.localisation.latitude),
        longitude: parseFloat(formData.localisation.longitude)
      },
      images: typeof formData.images === 'string'
        ? formData.images.split(',').map(img => img.trim())
        : formData.images
    };

    try {
      if (editingHotel) {
        await axios.put(`/hotel/${editingHotel._id}`, processedData);
      } else {
        await axios.post('/hotel', processedData);
      }
      setModalOpen(false);
      fetchHotels();
    } catch (err) {
      console.error('Save error:', err.response?.data || err.message);
    }
  };

  const handleDelete = async id => {
    if (confirm('Are you sure you want to delete this hotel?')) {
      try {
        await axios.delete(`/hotel/${id}`);
        fetchHotels();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Gérer les hôtels</h2>
        <button onClick={() => openModal()} className="bg-violet-600 text-white px-4 py-2 rounded">+ Ajouter un hôtel</button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border border-black-200 bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-black-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Téléphone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Localisation</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(hotel => (
              <tr key={hotel._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-black-900">{hotel.nomh}</td>
                <td className="px-6 py-4 text-sm text-black-500">{hotel.numTelephone}</td>
                <td className="px-6 py-4 text-sm text-black-500">{hotel.categories}</td>
                <td className="px-6 py-4 text-sm text-black-500">{hotel.description}</td>
                <td className="px-6 py-4 text-sm text-black-500">
                  {hotel.localisation?.address}, {hotel.localisation?.city}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button onClick={() => openModal(hotel)} className="bg-yellow-400 text-white px-2 py-1 rounded">Modifier</button>
                    <button onClick={() => handleDelete(hotel._id)} className="bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 overflow-y-auto rounded-lg w-full max-w-lg max-h-[90vh] shadow-xl space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {editingHotel ? 'Modifier un hôtel' : 'Ajouter un hôtel'}
      </h2>

      {/* Nom */}
      <div>
        <label className="block text-sm font-medium mb-1">Nom de l'hôtel</label>
        <input
          name="nomh"
          placeholder="Nom de l'hôtel"
          value={formData.nomh}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Localisation */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-2">Localisation</h3>
        <div className="space-y-2">
          <input
            name="localisation.address"
            placeholder="Adresse"
            value={formData.localisation.address}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="localisation.city"
            placeholder="Ville"
            value={formData.localisation.city}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            name="localisation.country"
            placeholder="Pays"
            value={formData.localisation.country}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            name="localisation.latitude"
            placeholder="Latitude"
            value={formData.localisation.latitude}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            name="localisation.longitude"
            placeholder="Longitude"
            value={formData.localisation.longitude}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
      </div>

      {/* Numéro de téléphone */}
      <div>
        <label className="block text-sm font-medium mb-1">Numéro de téléphone</label>
        <input
          name="numTelephone"
          placeholder="Ex: +33 6 12 34 56 78"
          value={formData.numTelephone}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Catégorie */}
      <div>
        <label className="block text-sm font-medium mb-1">Catégorie</label>
        <select
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          {['1 étoile', '2 étoiles', '3 étoiles', '4 étoiles', '5 étoiles', 'Boutique', 'Luxueux'].map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          placeholder="Décrivez l'hôtel ici..."
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium mb-1">URL des images (séparées par des virgules)</label>
        <input
          name="images"
          placeholder="https://... , https://..."
          value={formData.images}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Chambres */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-2">Chambres disponibles</h3>
        <div className="max-h-32 overflow-y-auto border p-2 rounded space-y-1">
          {allChambres.map(chambre => (
            <label key={chambre._id} className="block text-sm">
              <input
                type="checkbox"
                checked={formData.chambres.includes(chambre._id)}
                onChange={() => handleChambreChange(chambre._id)}
                className="mr-2"
              />
              {chambre.nom || chambre.numCh || chambre._id}
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-sm"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
        >
          Sauvegarder
        </button>
      </div>
    </form>
  </div>
)}

    </div>
  );
};

export default ManageHotels;
