import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
const Contact = () => {
  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
            Contactez-Nous
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Nous sommes disponibles pour toute demande d'information, de partenariat ou de devis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form className="bg-white p-10 rounded-2xl shadow-lg border border-gray-300 space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Nom et prénom</label>
              <input
                type="text"
                placeholder="Jean Dupont"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#005f8d] focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Adresse email</label>
              <input
                type="email"
                placeholder="votre.email@entreprise.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#005f8d] focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Votre message</label>
              <textarea
                rows="5"
                placeholder="Merci de nous fournir plus d'informations..."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#005f8d] focus:outline-none transition resize-none"
              >
              </textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#005f8d] text-white py-3 font-semibold rounded-md hover:bg-[#00406a] transition"
            >
              Envoyer votre message
            </button>
          </form>
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-300 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Nos Coordonnées</h2>
              <p className="text-gray-700">📍 32 rue Mongi Slim, Gabès, Tunisie</p>
              <p className="text-gray-700">📞 +216 57 093 791</p>
              <p className="text-gray-700">✉ commercialmihatravelagency@gmail.com</p>
              <p className="text-sm text-gray-500 mt-2">Nos horaires : Du lundi au samedi, de 9h à 18h</p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300">
              <iframe
                title="Carte de notre agence"
                src="https://www.google.com/maps?q=32+rue+Mongi+slim+Gabes,+Tunisie&output=embed"
                className="w-full h-64 border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default Contact;
