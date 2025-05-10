import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();

  const user = {
    name: 'Jean Dupont',
    email: 'jean@example.com'
  };

  const handleDelete = () => {
    if (window.confirm('Supprimer ce profil ?')) {
      console.log('Profil supprimé');
      // Suppression via API ici
    }
  };

  return (
    <div>
      <h2>Profil</h2>
      <p>Nom : {user.name}</p>
      <p>Email : {user.email}</p>
      <button onClick={() => navigate('/profile/edit')}>Éditer</button>
      <button onClick={handleDelete}>Supprimer</button>
    </div>
  );
}

export default ProfilePage;
