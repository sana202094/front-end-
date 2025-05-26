import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { FaUserEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import Footer from '../components/Footer';
import Header from '../components/Header';

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
        phone: storedUser.telephone,
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100">
     <Header />
      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-blue-800 mt-20">Mon Profil</h2>
            <p className="text-gray-600 mt-1">
              {editing ? 'Modifier vos informations personnelles' : `Bienvenue, ${user.nom}`}
            </p>
          </div>

          {editing ? (
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['name', 'email', 'phone', 'age', 'etat'].map((field) => (
                <div key={field} className="relative">
                  <input
                    type={field === 'email' ? 'email' : field === 'age' ? 'number' : 'text'}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    required
                    placeholder=" "
                    className="peer w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm">
                    {field === 'etat' ? 'État' : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                </div>
              ))}

              <div className="col-span-full flex flex-col sm:flex-row gap-4 mt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-xl font-semibold"
                >
                  Annuler
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-lg text-gray-700">
              <p><strong>Nom :</strong> {user.name}</p>
              <p><strong>Email :</strong> {user.email}</p>
              <p><strong>Téléphone :</strong> {user.phone}</p>
              <p><strong>Âge :</strong> {user.age}</p>
              <p><strong>État :</strong> {user.etat}</p>
              <p><strong>Rôle :</strong> {user.isAdmin ? 'Admin' : 'Utilisateur'}</p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold"
                >
                  <FaUserEdit /> Modifier
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold"
                >
                  <FaTrash /> Supprimer le compte
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg font-medium text-center">
              {error}
            </div>
          )}
        </div>
      </main>

    
       <Footer />
    </div>
  );
};

export default Account;
