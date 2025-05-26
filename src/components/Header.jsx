import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleUserChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("userChanged", handleUserChange);
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("userChanged"));
    navigate("/login");
  };
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
           <img src={logo} alt="Miha Travel Logo" className="w-16 h-16" />
            <h1 className="text-2xl font-bold text-violet-900">Miha Travel</h1>
          </Link>
          <nav className="hidden md:flex items-center justify-end space-x-6 text-violet-900 font-medium pr-8">
            <Link to="/tunisie" className="hover:text-yellow-500 transition">Hôtels en Tunisie</Link>
            <Link to="/etranger" className="hover:text-yellow-500 transition">Hôtels à l'étranger</Link>
            <Link to="/about" className="hover:text-yellow-500 transition">À propos</Link>
            <Link to="/contact" className="hover:text-yellow-500 transition">Contact</Link>
            <Link to="/MesReservations" className="hover:text-yellow-500 transition">Mes réservations</Link>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="font-semibold hover:text-yellow-500 transition"
                >
                  {user.name}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                    <Link
                      to="/account"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100 text-violet-900"
                    >
                      Mon compte
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/register"
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-md border border-gray-200 text-black hover:text-violet-900 hover:bg-violet-50 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Inscription
                </Link>
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-md border border-gray-200 text-black hover:text-violet-900 hover:bg-violet-50 transition-all ml-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Connexion
                </Link>
              </>
            )}
          </nav>
          <button onClick={toggleMenu} className="md:hidden focus:outline-none">
            <svg className="w-6 h-6 text-violet-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-violet-900 text-white py-6 px-4 space-y-4 absolute top-16 left-0 w-full shadow-md transition-all duration-300 z-40">
          <Link to="/tunisie" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-400">Hôtels en Tunisie</Link>
          <Link to="/etranger" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-400">Hôtels à l'étranger</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-400">À propos</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-400">Contact</Link>
          <Link to="/MesReservations" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-400">Mes réservations</Link>

          {user ? (
            <div className="space-y-2">
              <span className="block font-semibold text-yellow-300">{user.name}</span>
              <Link to="/account" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-400">Mon compte</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block text-red-300 hover:text-red-500">Déconnexion</button>
            </div>
          ) : (
            <>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="block hover:text-green-300">Inscription</Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block hover:text-violet-300">Connexion</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
export default Header;
