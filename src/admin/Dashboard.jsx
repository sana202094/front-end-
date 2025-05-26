
import React, { useState } from 'react';
import ManageHotels from './ManageHotels';
import ManageUsers from './ManageUsers';
import ManageReservations from './ManageReservations';
import Sidebar from './Sidebar';
import ManageChambres from './ManageChambres';
const Dashboard = () => {
const [activeTab, setActiveTab] = useState('hotels');
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex-1 p-6">
        <div className="bg-violet shadow-lg rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Admin Miha</h1>
          <div className="space-y-6">
            {activeTab === 'hotels' && <ManageHotels />}
            {activeTab === 'users' && <ManageUsers />}
            {activeTab === 'reservations' && <ManageReservations />}
            {activeTab === 'chambres' && <ManageChambres />}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;