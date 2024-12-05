import api from '../lib/axios';

export const reservationService = {
  createReservation: (data) => api.post('/reservations', data),
  getUserReservations: () => api.get('/reservations/me'),
  cancelReservation: (id) => api.put(`/reservations/${id}/cancel`),
  checkAvailability: (params) => api.get('/reservations/check-availability', { params })
};