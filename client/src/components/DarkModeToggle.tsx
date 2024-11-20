import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative w-14 h-8 600px:w-16 flex items-center rounded-full p-1 border-2 border-gray-400 transition-colors duration-300 ${
        darkMode ? 'bg-gray-800' : 'bg-gray-300'
      }`}
      aria-label="Toggle dark mode"
    >
      <div
        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          darkMode ? 'translate-x-6 600px:translate-x-8' : 'translate-x-0'
        }`}
      >
        {darkMode ? (
          <FaMoon className="text-gray-800 w-full h-full p-1" />
        ) : (
          <FaSun className="text-yellow-500 w-full h-full p-1" />
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;
