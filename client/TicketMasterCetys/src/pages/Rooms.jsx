import { useQuery } from "@tanstack/react-query";
import { roomService } from "../services/roomService";

export default function Rooms() {
  const { data: rooms = [], isLoading, isError, error } = useQuery({
    queryKey: ["rooms"],
    queryFn: roomService.getAllRooms, // Llama a la función que obtiene todos los salones
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Filtrar salones activos
  const activeRooms = rooms.filter((room) => room.isActive);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600">
        Error al cargar los salones: {error.message}
      </div>
    );
  }

  if (activeRooms.length === 0) {
    return (
      <div className="text-center text-gray-600">
        No hay salones disponibles para mostrar.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Salones Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeRooms.map((room) => (
          <div key={room._id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{room.roomNumber}</h2>
            <p className="text-gray-600 mb-4">{room.area}</p>
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => alert(`Reservar salón: ${room.roomNumber}`)}
            >
              Reservar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
