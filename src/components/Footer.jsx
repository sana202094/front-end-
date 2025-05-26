const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white text-center py-6 mt-12">
        <p>&copy; {new Date().getFullYear()} Miha Travel - Tous droits réservés.</p>
        <div className="space-x-4 text-gray-600">
          <a href="#" className="hover:text-violet-500">facebook<p>:Miha Travel Agency</p></a>
          <a href="#" className="hover:text-violet-500">instagramme<p>:Miha Travel Agency</p></a>
          <a href="#" className="hover:text-violet-500">tik tok<p>:Miha Travel Agency</p></a>
          <a href="#" className="hover:text-violet-500 inline-flex">Téléphone<p>:57093791</p></a>
          <a href="#" className="hover:text-violet-500">Email<p>:commercialmihatravelagency@gmail.com</p></a>
        </div>
      </footer>
    );
  };
  export default Footer;