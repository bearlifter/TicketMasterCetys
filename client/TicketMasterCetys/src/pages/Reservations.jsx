import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

export default function Reservations() {
  const { data: reservations, isLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: () => api.get('/reservations/me').then(res => res.data)
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mis Reservaciones</h1>
      <div className="space-y-4">
        {reservations?.map((reservation) => (
          <div key={reservation._id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">
                  Salón {reservation.roomId.roomNumber}
                </h2>
                <p className="text-gray-600">{reservation.reason}</p>
                <p className="text-sm text-gray-500">
                  {new Date(reservation.startTime).toLocaleString()} - 
                  {new Date(reservation.endTime).toLocaleString()}
                </p>
              </div>
              <button 
                className="text-red-600 hover:text-red-800"
                onClick={() => {/* Cancelar reservación */}}
              >
                Cancelar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}