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
          seat.estado === "reservado"
            ? `bg-orange-300`
            : seat.estado === "comprado"
            ? `bg-green-500`
            : seat.disponible === true
            ? `bg-blue-500`
            : seat.estado === "devuelto"
            ? `bg-red-500`
            : ``
        } ${seat.clase === "Ejecutiva" ? `border-4` : `border`}`}
      />
      {showModal && <Modal onClose={() => setShowModal(false)} seat={seat} />}
    </>
  );
}
