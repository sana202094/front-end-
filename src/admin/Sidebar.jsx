import React from 'react';

const Sidebar = ({ setActiveTab }) => {
  return (
    <div className="w-60 bg-blue-700 text-white h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">Admin miha</h2>
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => setActiveTab('hotels')}
            className="w-full text-left text-lg hover:bg-gray-700 p-2 rounded-md"
          >
            Hotels
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('users')}
            className="w-full text-left text-lg hover:bg-gray-700 p-2 rounded-md"
          >
            Client
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('reservations')}
            className="w-full text-left text-lg hover:bg-gray-700 p-2 rounded-md"
          >
            Reservations
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('chambres')}
            className="w-full text-left text-lg hover:bg-gray-700 p-2 rounded-md"
          >
            Chambres
          </button>
        </li>
      </ul>
    </div>
    
  );
};

export default Sidebar;