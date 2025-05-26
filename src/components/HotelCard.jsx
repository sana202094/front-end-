import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  const {
    nomh,
    description,
    numTelephone,
    localisation,
    categories = '',
    images = [],
    _id
  } = hotel;

  const imageUrl = images[0] || 'https://via.placeholder.com/400x250?text=Hotel';
  const locationString = localisation
    ? [localisation.address, localisation.city, localisation.country]
        .filter(Boolean)
        .join(', ')
    : 'Localisation non disponible';
  const starCount = parseInt(categories.match(/\d+/)?.[0]) || 0;

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={imageUrl}
        alt={`Image de l'hôtel ${nomh}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold text-gray-800">{nomh}</h2>
        <div className="flex text-yellow-500 text-sm">
          {Array.from({ length: starCount }).map((_, index) => (
            <span key={index}>★</span>
          ))}
          {starCount === 0 && <span className="text-gray-400">Non classé</span>}
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">
          {description || 'Aucune description disponible.'}
        </p>

        {numTelephone && (
          <p className="text-sm text-gray-500">
            📞 <span className="ml-1">{numTelephone}</span>
          </p>
        )}

        <p className="text-sm text-gray-500">
          📍 <span className="ml-1">{locationString}</span>
        </p>

        <div className="pt-2">
          <Link
            to={`/hotel/${_id}`}
            className="inline-block text-sm font-medium bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition"
          >
            Voir les détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
