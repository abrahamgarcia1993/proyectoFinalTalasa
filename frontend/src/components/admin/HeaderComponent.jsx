import { useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import ProtectedRoute from '../../routes/ProtectedRoute';

export const HeaderComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, role } = useAuthStore();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header style={{ background: 'white' }} className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-gray-700">
        Dashboard
      </div>

      {/* User Profile and Dropdown */}
      <div className="relative">
        <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
          <img
            className="w-10 h-10 rounded-full"
            src="https://i.pravatar.cc/100" // Este es un avatar genérico, puedes usar el que desees
            alt="User Avatar"
          />
          <span className="text-gray-800 font-medium">{user?.username || "Usuario"}</span>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
            <div className="px-4 py-2 text-gray-900">
              {user?.username || "Usuario"} ( {role.toUpperCase()} )
            </div>
            <div className="border-t border-gray-200"></div>
            <ProtectedRoute>
              <Link to={`/perfil/user/${user.id}`} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Mi Perfil
              </Link>
            </ProtectedRoute>
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
