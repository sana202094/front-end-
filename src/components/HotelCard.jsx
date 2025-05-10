import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  const localisation = hotel.localisation
    ? `${hotel.localisation.address || ''}, ${hotel.localisation.city || ''}, ${hotel.localisation.country || ''}`
    : 'Localisation non disponible';

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={hotel.images?.[0] || "https://via.placeholder.com/400x250"}
        alt={hotel.nomh}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{hotel.nomh}</h2>
        <p className="text-gray-600 text-sm mb-4">
          {hotel.description?.slice(0, 100)}...
        </p>
        <p className="text-sm text-gray-500 mb-2">
          📞 {hotel.numTelephone}
        </p>
        <p className="text-sm text-gray-500 mb-2">
          📍 {localisation}
        </p>
        <Link
          to={`/hotel/${hotel._id}`}
          className="inline-block mt-2 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition"
        >
          Voir détails
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;