import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-gray-900 text-black dark:text-white py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-400 dark:border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-start font-Josefin">
          <Link to="/" className="text-3xl font-bold">Belaja.</Link>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Platform pembelajaran interaktif untuk meningkatkan keterampilan Anda.
          </p>
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Navigasi</h2>
          <Link to="/about" className="text-gray-700 dark:text-gray-300 dark:hover:text-white hover:text-black mb-2">Tentang Kami</Link>
          <Link to="/courses" className="text-gray-700 dark:text-gray-300 dark:hover:text-white hover:text-black mb-2">Kursus</Link>
          <Link to="/contact" className="text-gray-700 dark:text-gray-300 dark:hover:text-white hover:text-black">Kontak</Link>
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Kontak</h2>
          <p className="flex items-center mb-2">
            <BsEnvelope className="mr-2" />
            support@belaja.com
          </p>
          <p className="flex items-center">
            <span className="mr-2">+62 123 456 789</span>
          </p>
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Ikuti Kami</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-gray-700 dark:text-gray-300 dark:hover:text-white hover:text-black">
              <FaFacebookF size={24} />
            </a>
            <a href="https://twitter.com" className="text-gray-700 dark:text-gray-300 dark:hover:text-white hover:text-black">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" className="text-gray-700 dark:text-gray-300 dark:hover:text-white hover:text-black">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" className="text-gray-700 dark:text-gray-300 dark:hover:text-white hover:text-black">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-gray-700 dark:text-gray-300 text-sm">&copy; 2024 Belaja. Semua Hak Dilindungi.</p>
      </div>
    </footer>
  );
};

export default Footer;
