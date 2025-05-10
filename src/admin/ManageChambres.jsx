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
  });
  const [editingId, setEditingId] = useState(null);

  const fetchChambres = async () => {
    try {
      const res = await api.get('/api/chambre/chambres');
      setChambres(res.data);
    } catch (error) {
      console.error('Erreur lors du chargement', error);
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
      console.error('Erreur de soumission', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/chambre/chambre/${id}`);
      fetchChambres();
    } catch (error) {
      console.error('Erreur de suppression', error);
    }
  };

  const handleEdit = (chambre) => {
    setForm(chambre);
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
  <h2 className="text-2xl font-bold mb-6 text-center">
    {editingId ? 'Modifier une chambre' : 'Ajouter une chambre'}
  </h2>
  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-10 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="numCh"
        value={form.numCh}
        onChange={handleChange}
        placeholder="Numéro de chambre"
        required
      />
       
      <input
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="typeCh"
        value={form.typeCh}
        onChange={handleChange}
        placeholder="Type de chambre"
        required
      />
        <input
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="nombrelits"
        value={form.nombrelits}
        onChange={handleChange}
        placeholder="Nombre de lits"
        required
      />
      <input
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="imageCh"
        value={form.imageCh}
        onChange={handleChange}
        placeholder="URL de l'image"
        required
      />
      <input
  type="number"
  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  name="tarif"
  value={form.tarif}
  onChange={handleChange}
  placeholder="Tarif (DT)"
  required
/>

    </div>
    <textarea
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      name="description"
      value={form.description}
      onChange={handleChange}
      placeholder="Description"
      required
    />
    <div className="flex justify-between items-center">
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        {editingId ? 'Modifier' : 'Ajouter'}
      </button>
      {editingId && (
        <button type="button" className="text-gray-500 hover:underline" onClick={resetForm}>
          Annuler
        </button>
      )}
    </div>
  </form>
  <h3 className="text-xl font-semibold mb-4">Liste des chambres</h3>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300 rounded">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="px-4 py-2 border">Image</th>
          <th className="px-4 py-2 border">Numéro</th>
          <th className="px-4 py-2 border">Type</th>
          <th className="px-4 py-2 border">Description</th><th className="px-4 py-2 border">Tarif (TND / nuit)</th>
          <th className="px-4 py-2 border">nombrelits</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {chambres.map((ch) => (
          <tr key={ch._id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border">
              <img src={ch.imageCh} alt={ch.typeCh} className="h-16 w-24 object-cover rounded" />
            </td>
            <td className="px-4 py-2 border">{ch.numCh}</td>
            <td className="px-4 py-2 border">{ch.typeCh}</td>
            <td className="px-4 py-2 border">{ch.description}</td>
            <td className="px-4 py-2 border text-blue-600 font-semibold">{ch.nombrelits}</td>
            <td className="px-4 py-2 border text-blue-600 font-semibold">{ch.tarif} DT</td>

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
