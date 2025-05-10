import React, { useState } from 'react';

function ReservationPage() {
  const [formData, setFormData] = useState({ name: '', date: '', time: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Réservation envoyée :', formData);
 
  };

  return (
    <div>
      <h2>Faire une réservation</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nom" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <input type="time" name="time" onChange={handleChange} required />
        <button type="submit">Réserver</button>
      </form>
    </div>
  );
}

export default ReservationPage;
