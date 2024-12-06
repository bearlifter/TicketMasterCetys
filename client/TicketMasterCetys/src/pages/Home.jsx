import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación

export default function Home() {
  const { user } = useAuth(); // Obtiene el usuario actual del contexto

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">CETYS Reservaciones</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Bienvenido al Sistema de Reservaciones
        </h2>
        <p className="text-gray-600 mb-4">
          Reserva salones para tus actividades académicas de forma rápida y
          sencilla.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/rooms"
            className="p-4 border rounded hover:border-blue-500 transition-colors"
          >
            <h3 className="font-semibold mb-2">Reserva un Salón</h3>
            <p className="text-sm text-gray-500">
              Selecciona el salón y horario que necesites.
            </p>
          </Link>
          <Link
            to="/reservations"
            className="p-4 border rounded hover:border-blue-500 transition-colors"
          >
            <h3 className="font-semibold mb-2">Gestiona tus Reservaciones</h3>
            <p className="text-sm text-gray-500">
              Revisa y administra tus reservaciones activas.
            </p>
          </Link>

          {/* Enlace visible solo para usuarios con rol de profesor */}
          {user?.role === "profesor" && (
            <Link
              to="/manage-rooms"
              className="p-4 border rounded hover:border-blue-500 transition-colors"
            >
              <h3 className="font-semibold mb-2">Administrar Salones</h3>
              <p className="text-sm text-gray-500">
                Agrega o elimina salones disponibles para reservación.
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
