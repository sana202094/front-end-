import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const res = await axios.post('/users/login', { email, password });
    localStorage.setItem('user', JSON.stringify(res.data));

    // Redirection selon le rôle
    if (res.data.isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Erreur de connexion');
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 via-white to-teal-100 flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-md py-10 px-6 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Miha Travel Logo" className="w-32 h-32 mb-4" />
          <h2 className="text-3xl font-bold text-violet-700 mb-2">Bienvenue chez Miha Travel</h2>
          <p className="text-gray-500 mb-6 text-center">Connectez-vous pour explorer le monde 🌍</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Adresse Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Se connecter
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <p className="mt-6 text-center text-sm text-gray-500">
          Vous n'avez pas de compte ? <a href="/register" className="text-violete-600 hover:underline">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default Login;