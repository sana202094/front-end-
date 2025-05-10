import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

  // Close dropdown when clicking outside
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
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 32L62 2L42 62L30 34L2 32Z" fill="#3498db" stroke="#2c3e50" strokeWidth="2" strokeLinejoin="round" />
              <path d="M30 34L42 62" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h1 className="text-2xl font-bold text-violet-900">Miha Travel</h1>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8 text-violet-900 font-medium items-center">
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
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
                    <Link to="/account" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 text-violet-900">Mon compte</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Déconnexion</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/register" className="text-green-700 hover:text-green-900 transition">Inscription</Link>
                <Link to="/login" className="text-violet-700 hover:text-violet-900 transition">Connexion</Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
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

      {/* Mobile menu */}
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
