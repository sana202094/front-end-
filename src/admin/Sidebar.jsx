import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Hotel, Users, BedDouble, CalendarCheck, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';

const Sidebar = ({ setActiveTab }) => {
  const navigate = useNavigate(); 

  const tabs = [
    { key: 'hotels', label: 'Hôtels', icon: Hotel },
    { key: 'users', label: 'Utilisateurs', icon: Users },
    { key: 'reservations', label: 'Réservations', icon: CalendarCheck },
    { key: 'chambres', label: 'Chambres', icon: BedDouble },
    { key: 'logout', label: 'Déconnexion', icon: LogOut },
  ];

  const [active, setActive] = React.useState('hotels');

  const handleTabClick = (tabKey) => {
    if (tabKey === 'logout') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/', { replace: true });
 
      return;
    }

    setActive(tabKey);
    setActiveTab(tabKey);
  };

  return (
    <div className="w-64 min-h-screen bg-blue shadow-lg border-r p-5">
      <img src={logo} alt="Miha Travel Logo" className="w-64 h-32 mb-2" />
      <h2 className="text-xl font-bold text-blue-800 mb-8">Tableau de bord</h2>
      <nav className="space-y-2">
        {tabs.map(({ key, label, icon: Icon }) => (
          <div
            key={key}
            onClick={() => handleTabClick(key)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              active === key
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'text-blue-700 hover:bg-blue-100'
            }`}
          >
            <Icon size={20} />
            {label}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
