import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          CETYS Reservaciones
        </Link>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link to="/rooms" className="text-gray-600 hover:text-gray-900">
                Salones
              </Link>
              <Link
                to="/reservations"
                className="text-gray-600 hover:text-gray-900"
              >
                Mis Reservaciones
              </Link>
              {/* Verifica si el usuario es maestro */}
              {user.role === "profesor" && (
                <Link
                  to="/manage-rooms"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Administrar Salones
                </Link>
              )}
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
