import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { FaUserEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';

const Account = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', age: '', etat: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
      setForm({
        name: storedUser.name,
        email: storedUser.email,
        phone: storedUser.phone,
        age: storedUser.age,
        etat: storedUser.etat,
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userChanged'));
    navigate('/login');
  };

  const handleDelete = async () => {
    if (confirm('Voulez-vous vraiment supprimer votre compte ?')) {
      try {
        await axios.delete('/users/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        handleLogout();
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors de la suppression');
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('/users/profile', form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      setEditing(false);
      window.dispatchEvent(new Event('userChanged'));
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-cyan-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-xl p-8 space-y-6 border border-blue-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-700">Mon Profil</h2>
          <p className="text-gray-500 mt-1">
            {editing ? 'Modifier vos informations' : `Bienvenue, ${user.name}`}
          </p>
        </div>

        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            {['name', 'email', 'phone', 'age', 'etat'].map((field) => (
              <div key={field} className="relative">
                <input
                  type={field === 'email' ? 'email' : field === 'age' ? 'number' : 'text'}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  placeholder=" "
                  required
                  className="peer w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <label className="absolute left-4 top-2 text-gray-400 text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all duration-200">
                  {field === 'etat' ? 'État' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}

            <div className="flex justify-between gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="space-y-2 text-gray-700 text-sm">
              <p><span className="font-medium">Nom :</span> {user.name}</p>
              <p><span className="font-medium">Email :</span> {user.email}</p>
              <p><span className="font-medium">Téléphone :</span> {user.phone}</p>
              <p><span className="font-medium">Âge :</span> {user.age}</p>
              <p><span className="font-medium">État :</span> {user.etat}</p>
              <p><span className="font-medium">Rôle :</span> {user.isAdmin ? 'Admin' : 'Utilisateur'}</p>
            </div>

            <div className="pt-6 flex flex-col gap-3">
              <button
                onClick={() => setEditing(true)}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                <FaUserEdit /> Modifier
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
              >
                <FaTrash /> Supprimer le compte
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
              >
                <FaSignOutAlt /> Se déconnecter
              </button>
            </div>
          </>
        )}

        {error && (
          <p className="text-center text-red-500 text-sm pt-4">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Account;
