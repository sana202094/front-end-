import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001',
});

const ManageChambre = () => {
  const [chambres, setChambres] = useState([]);
  const [form, setForm] = useState({
    numCh: '',
    typeCh: '',
    imageCh: '',
    tarif: '',
    description: '',
    nbLits : '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchChambres = async () => {
    try {
      const res = await api.get('/api/chambre/chambres');
      setChambres(res.data);

    } catch (error) {
      console.error('Erreur lors du chargement des chambres:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/api/chambre/chambre/${editingId}`, form);
      } else {
        await api.post('/api/chambre/chambres', form);
      }
      fetchChambres();
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/chambre/chambre/${id}`);
      fetchChambres();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleEdit = (chambre) => {
    setForm({
      numCh: chambre.numCh,
      typeCh: chambre.typeCh,
      imageCh: chambre.imageCh,
      tarif: chambre.tarif,
      description: chambre.description,
      nbLits: chambre.nbLits,
    });
    setEditingId(chambre._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setForm({
      numCh: '',
      typeCh: '',
      imageCh: '',
      tarif: '',
      description: '',
    nbLits: '',
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchChambres();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-violet-700">
        {editingId ? 'Modifier une chambre' : 'Ajouter une chambre'}
      </h2>

     
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="numCh"
            value={form.numCh}
            onChange={handleChange}
            placeholder="Numéro de chambre"
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            name="typeCh"
            value={form.typeCh}
            onChange={handleChange}
            placeholder="Type de chambre"
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            name="nbLits"
            value={form.nbLits}
            onChange={handleChange}
            placeholder="Nombre de lits"
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            name="imageCh"
            value={form.imageCh}
            onChange={handleChange}
            placeholder="URL de l'image"
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="number"
            name="tarif"
            value={form.tarif}
            onChange={handleChange}
            placeholder="Tarif (DT)"
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <div className="flex justify-between items-center">
          <button type="submit" className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-700">
            {editingId ? 'Modifier' : 'Ajouter'}
          </button>
          {editingId && (
            <button type="button" className="text-gray-500 hover:underline" onClick={resetForm}>
              Annuler
            </button>
          )}
        </div>
      </form>

    
      <h3 className="text-2xl font-semibold mb-4">Liste des chambres</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Numéro</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Lits</th>
              <th className="px-4 py-2 border">Tarif</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {chambres.map((ch) => (
              <tr key={ch._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  <img
                    src={ch.imageCh}
                    alt={`Chambre ${ch.numCh}`}
                    className="h-16 w-24 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border">{ch.numCh}</td>
                <td className="px-4 py-2 border">{ch.typeCh}</td>
                <td className="px-4 py-2 border">{ch.description}</td>
                <td className="px-4 py-2 border">{ch.nbLits }</td>
                <td className="px-4 py-2 border text-violet-600 font-semibold">{ch.tarif} DT</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleEdit(ch)}
                    className="text-yellow-500 hover:underline mr-3"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(ch._id)}
                    className="text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageChambre;
