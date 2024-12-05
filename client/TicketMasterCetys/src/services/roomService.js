import api from '../lib/axios';

export const roomService = {
  getRooms: () => api.get('/rooms'),
  getRoom: (id) => api.get(`/rooms/${id}`)
};