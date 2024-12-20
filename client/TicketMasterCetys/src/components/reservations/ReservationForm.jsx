import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reservationService } from "../../services/reservationService";

export default function ReservationForm({ room, onSuccess, onCancel }) {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  // Configuración de la mutación para crear una reserva
  const mutation = useMutation({
    mutationFn: reservationService.createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries(["rooms"]); // Actualiza las queries relacionadas
      reset(); // Limpia el formulario
      onSuccess?.(); // Llama a la función onSuccess proporcionada
    },
    onError: (error) => {
      alert(
        `Error: ${
          error.response?.data?.message || "No se pudo crear la reserva."
        }`
      );
    },
  });

  // Manejo del envío del formulario
  const onSubmit = (data) => {
    mutation.mutate({
      roomId: room._id,
      ...data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Fecha y Hora Inicio</label>
        <input
          type="datetime-local"
          {...register("startTime", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Fecha y Hora Fin</label>
        <input
          type="datetime-local"
          {...register("endTime", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Razón</label>
        <textarea
          {...register("reason", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Reservar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
