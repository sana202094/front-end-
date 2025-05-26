import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { FaUserEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    etat: '',
    email: '',
    phone: '',
    password: '',
    post: '',
    isAdmin: false,
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const openModal = (user = null) => {
    setEditingUser(user);
    setFormData(
      user
        ? { ...user, password: '' }
        : { name: '', age: '', etat: '', email: '', phone: '', password: '', isAdmin: false }
    );
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      age: Number(formData.age),
    };
    try {
      if (editingUser) {
        await axios.put(`/users/profile/${editingUser._id}`, updatedFormData);
        await fetchUsers();
        setModalOpen(false);
      } else {
        await axios.post('/users/register', updatedFormData);
        await fetchUsers();
        setModalOpen(false);
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      try {
        await axios.delete(`/users/profile/${id}`);
        fetchUsers();
      } catch (err) {
        console.error('Erreur de suppression', err);
      }
    }
  };
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/admin/users/${id}`);
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-700">Liste des utilisateurs </h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-lg transition"
        >
          <FaPlus /> Ajouter
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border border-black">
          <thead className="bg-black-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Âge</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Poste</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-700">État</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Téléphone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Rôle</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-black-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-black-50">
                <td className="px-6 py-4 text-sm text-black-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-black-500">{user.age}</td>
                <td className="px-6 py-4 text-sm text-black-500">{user.post}</td>
                <td className="px-6 py-4 text-sm text-black-500">{user.etat}</td>
                <td className="px-6 py-4 text-sm text-black-500">{user.email}</td>
                <td className="px-6 py-4 text-sm text-black-500">{user.phone}</td>
                <td className="px-6 py-4 text-sm text-black-500">
                  {user.isAdmin ? 'Admin' : 'Utilisateur'}
                </td>
                <td className="px-6 py-4 text-sm text-black-500">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(user)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <FaUserEdit /> Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <FaTrash /> Supprimer
                    </button>
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
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4"
          >
            <h2 className="text-lg font-semibold text-center text-blue-700">
              {editingUser ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}
            </h2>
            {['name', 'email', 'phone', 'etat', 'age', 'post'].map((field) => (
              <div key={field} className="relative">
                <input
                  name={field}
                  type={field === 'email' ? 'email' : field === 'age' ? 'number' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder=" "
                  required={!['etat', 'age'].includes(field)}
                  className="peer w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <label className="absolute left-4 top-2 text-gray-400 text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all duration-200">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}
            {!editingUser && (
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="peer w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <label className="absolute left-4 top-2 text-gray-400 text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all duration-200">
                  Mot de passe
                </label>
              </div>
            )}
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
              />
              Administrateur
            </label>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div className="flex justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Enregistrer
              </button>
            </div>
          </form>

        </div>
      )}
    </div>
  );
};

export default ManageUsers;
