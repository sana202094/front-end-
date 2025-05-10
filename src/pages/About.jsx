import { BuildingOffice2Icon, GlobeAltIcon, UsersIcon } from '@heroicons/react/24/outline';

const About = () => {
  return (
    <div className="bg-gradient-to-br from-violet-50 to-white min-h-screen flex items-center justify-center px-4 py-20">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-center text-violet-700 mb-8">À propos de Miha Travel Agency</h2>

        <div className="text-gray-700 text-lg space-y-5 leading-relaxed">
          <p>
            <strong>Miha Travel Agency Gabès</strong> est une agence de voyage tunisienne, située entre la mer et le désert,
            qui propose des <span className="text-violet-600 font-medium">circuits personnalisés</span>, des <span className="text-violet-600 font-medium">séjours inoubliables</span> et des
            <span className="text-violet-600 font-medium"> réservations hôtelières dans toute la Tunisie</span>.
          </p>
          <p>
            Que vous voyagiez <strong>en solo, en couple, en famille ou en groupe</strong>,
            nous vous aidons à vivre une expérience authentique, ancrée dans les trésors naturels et culturels du pays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center">
          <div className="p-6 bg-violet-50 rounded-xl shadow-sm hover:shadow-md transition">
            <BuildingOffice2Icon className="w-10 h-10 mx-auto text-violet-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Basée à Gabès</h3>
            <p className="text-sm text-gray-600">Un carrefour entre la mer et le désert</p>
          </div>

          <div className="p-6 bg-violet-50 rounded-xl shadow-sm hover:shadow-md transition">
            <GlobeAltIcon className="w-10 h-10 mx-auto text-violet-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Expériences sur mesure</h3>
            <p className="text-sm text-gray-600">Circuits & séjours adaptés à vos envies</p>
          </div>

          <div className="p-6 bg-violet-50 rounded-xl shadow-sm hover:shadow-md transition">
            <UsersIcon className="w-10 h-10 mx-auto text-violet-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Une approche humaine</h3>
            <p className="text-sm text-gray-600">Proximité, conseils personnalisés & accompagnement</p>
          </div>
        </div>

        <p className="mt-10 text-center text-gray-700 text-lg">Merci de votre visite 🙌</p>
      </div>
    </div>
  );
};

export default About;
