import { useState } from 'react';

const Reservation = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: 1,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Réservation envoyée :', form);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Réservation</h2>
        {submitted ? (
          <p className="text-green-600 text-center">Votre réservation a bien été envoyée !</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nom"
              className="input"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="date"
              className="input"
              value={form.date}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="time"
              className="input"
              value={form.time}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="guests"
              min="1"
              max="20"
              className="input"
              value={form.guests}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn-primary">Réserver</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Reservation;
