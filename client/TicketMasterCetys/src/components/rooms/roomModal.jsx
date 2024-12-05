import ReservationForm from '../reservations/ReservationForm';

export default function RoomModal({ room, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Reservar Salón {room.roomNumber}</h2>
        </div>
        <ReservationForm 
          room={room} 
          onSuccess={onClose}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}