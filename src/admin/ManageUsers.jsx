import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    isAdmin: false,
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const openModal = (user = null) => {
    setEditingUser(user);
    setFormData(
      user
        ? { ...user, password: '' }
        : { name: '', email: '', phone: '', password: '', isAdmin: false }
    );
    setModalOpen(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (editingUser) {
        await axios.put(`/users/${editingUser._id}`, formData);
      } else {
        await axios.post('/users/register', formData);
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      console.error('Save error:', err.response?.data || err.message);
    }
  };

  const handleDelete = async id => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Client</h2>
        <button onClick={() => openModal()} className="bg-blue-600 text-white px-4 py-2 rounded">+ Ajouter un utilisateur</button>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Téléphone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.isAdmin ? 'Admin' : 'User'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button onClick={() => openModal(user)} className="bg-yellow-400 text-white px-2 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded space-y-4 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold">{editingUser ? 'Edit User' : 'Add User'}</h2>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 w-full" required />
            <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} className="border p-2 w-full" required />
            <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="border p-2 w-full" required />
            {!editingUser && (
              <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="border p-2 w-full" required />
            )}
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} />
              Is Admin
            </label>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setModalOpen(false)} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
              <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;