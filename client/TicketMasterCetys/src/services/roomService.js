import api from "../lib/axios";

export const roomService = {
  getRooms: async () => {
    const response = await api.get("/rooms");
    return Array.isArray(response.data) ? response.data : []; // Asegúrate de devolver un array
  },
  getAllRooms: async () => {
    const response = await api.get("/rooms"); // Devuelve todos los salones
    return Array.isArray(response.data) ? response.data : [];
  },
  getRoom: (id) => api.get(`/rooms/${id}`),
  createRoom: (data) => api.post("/rooms", data),
  updateRoom: (id, data) => api.put(`/rooms/${id}`, data),
  deactivateRoom: (id) => api.delete(`/rooms/${id}`),
  toggleRoomStatus: (id) => api.patch(`/rooms/${id}/toggle-status`),
  deleteRoomPermanently: (id) => api.delete(`/rooms/${id}/permanent`), // Nuevo endpoint
};
