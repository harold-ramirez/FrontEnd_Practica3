import Modal from "./modal";
import { useState } from "react";

export default function FlightSeat({ seat }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setShowModal(true);
        }}
        className={`w-6 h-6 rounded-md cursor-pointer border-black ${
          seat.estado === "libre"
            ? `bg-blue-500`
            : seat.estado === "Reservado"
            ? `bg-orange-300`
            : seat.estado === "Vendido"
            ? `bg-green-500`
            : seat.estado === "Devuelto"
            ? `bg-red-500`
            : ``
        } ${
          seat.clase_viaje === "Ejecutiva"
            ? `border-4`
            : `border`
        }`}
      />
      {showModal && <Modal onClose={() => setShowModal(false)} seat={seat} />}
    </>
  );
}
