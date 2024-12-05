import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reservationService } from '../../services/reservationService';

export default function ReservationCard({ reservation }) {
  const queryClient = useQueryClient();

  const cancelMutation = useMutation({
    mutationFn: reservationService.cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries(['reservations']);
    }
  });

  const formatDate = (date) => new Date(date).toLocaleString();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">Salón {reservation.roomId.roomNumber}</h3>
          <p className="text-sm text-gray-600">{reservation.reason}</p>
          <p className="text-xs text-gray-500">
            {formatDate(reservation.startTime)} - {formatDate(reservation.endTime)}
          </p>
        </div>
        <button
          onClick={() => cancelMutation.mutate(reservation._id)}
          className="text-red-600 hover:text-red-800"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}