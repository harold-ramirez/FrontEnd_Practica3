import Modal from "./modal";
import { useState } from "react";

export default function FlightSeat({ seat }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        key={seat.id}
        onClick={() => {
          setShowModal(true);
        }}
        className={`w-6 h-6 rounded-md cursor-pointer border-black ${
          seat.status === "Libre"
            ? `bg-blue-500`
            : seat.status === "Reservado"
            ? `bg-orange-300`
            : seat.status === "Vendido"
            ? `bg-green-500`
            : seat.status === "Devuelto"
            ? `bg-red-500`
            : ``
        } ${
          seat.class === "Ejecutiva"
            ? `border-4`
            : `border`
        }`}
      />
      {showModal && <Modal onClose={() => setShowModal(false)} seat={seat} />}
    </>
  );
}
