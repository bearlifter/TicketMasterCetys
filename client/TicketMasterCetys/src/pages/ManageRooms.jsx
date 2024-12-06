import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roomService } from "../services/roomService";

export default function ManageRooms() {
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({ roomNumber: "", area: "" });

  // Fetch all rooms, including inactive ones
  const {
    data: rooms = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: roomService.getAllRooms, // Updated to fetch all rooms
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Create room mutation
  const createRoomMutation = useMutation({
    mutationFn: roomService.createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries(["rooms"]);
      setFormState({ roomNumber: "", area: "" });
    },
    onError: (error) => {
      alert(
        `Error: ${
          error.response?.data?.message || "No se pudo crear el salón."
        }`
      );
    },
  });

  // Toggle room status mutation
  const toggleRoomStatusMutation = useMutation({
    mutationFn: roomService.toggleRoomStatus,
    onSuccess: () => queryClient.invalidateQueries(["rooms"]),
    onError: (error) => {
      alert(
        `Error: ${
          error.response?.data?.message ||
          "No se pudo cambiar el estado del salón."
        }`
      );
    },
  });

  // Delete room mutation
  const deleteRoomMutation = useMutation({
    mutationFn: roomService.deleteRoom,
    onSuccess: () => queryClient.invalidateQueries(["rooms"]),
    onError: (error) => {
      alert(
        `Error: ${
          error.response?.data?.message || "No se pudo eliminar el salón."
        }`
      );
    },
  });

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    createRoomMutation.mutate(formState);
  };

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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Administrar Salones</h1>

      {/* Formulario para agregar salones */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Número de Salón</label>
          <input
            type="text"
            value={formState.roomNumber}
            onChange={(e) =>
              setFormState({ ...formState, roomNumber: e.target.value })
            }
            required
            className="mt-1 block w-full rounded-md border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Área</label>
          <input
            type="text"
            value={formState.area}
            onChange={(e) =>
              setFormState({ ...formState, area: e.target.value })
            }
            required
            className="mt-1 block w-full rounded-md border-gray-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Agregar Salón
        </button>
      </form>

      {/* Lista de salones */}
      <div className="space-y-4">
        {rooms.map((room) => (
          <div key={room._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{room.roomNumber}</h2>
                <p className="text-gray-600">{room.area}</p>
                <p className="text-sm text-gray-500">
                  Estado: {room.isActive ? "Activo" : "Inactivo"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleRoomStatusMutation.mutate(room._id)}
                  className={`text-white py-1 px-4 rounded ${
                    room.isActive
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {room.isActive ? "Desactivar" : "Activar"}
                </button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `¿Estás seguro de que deseas eliminar el salón ${room.roomNumber}?`
                      )
                    ) {
                      deleteRoomMutation.mutate(room._id);
                    }
                  }}
                  className="bg-gray-600 text-white py-1 px-4 rounded hover:bg-gray-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
