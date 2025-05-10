
import React, { useState } from 'react';
import ManageHotels from './ManageHotels';
import ManageUsers from './ManageUsers';
import ManageReservations from './ManageReservations';
import Sidebar from './Sidebar';
import ManageChambres from './ManageChambres';
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('hotels');

  return (
    <div className="flex">
     
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Admin miha</h1>
        {activeTab === 'hotels' && <ManageHotels />}
        {activeTab === 'users' && <ManageUsers />}
        {activeTab === 'reservations' && <ManageReservations />}
        {activeTab === 'chambres' && <ManageChambres />}
      </div>
    </div>
  );
};

export default Dashboard;