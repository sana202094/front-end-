import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    etat: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Register the user
      const res = await axios.post('/users/register', form);

      // Auto-login after registration
      localStorage.setItem('user', JSON.stringify(res.data));
      window.dispatchEvent(new Event('userChanged'));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l’inscription');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-cyan-100 to-white flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-90 p-8 rounded-3xl shadow-2xl w-full max-w-md backdrop-blur-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-blue-700">Bienvenue à Miha Travel 🌍</h2>
          <p className="text-gray-600 text-sm mt-2">Inscrivez-vous pour commencer votre aventure</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom complet"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Téléphone"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Âge"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="État"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={form.etat}
            onChange={(e) => setForm({ ...form, etat: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            S'inscrire
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <p className="text-center text-sm text-gray-500 mt-6">
          Déjà un compte ? <a href="/login" className="text-blue-600 hover:underline">Connectez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default Register;