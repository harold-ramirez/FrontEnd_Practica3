import { useState } from "react";
import Modal from "./modal";
import Seats from "../Data/seats"

export default function SeatSelect({ onClose }) {
  const seats = Seats;
  const [showModal, setShowModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState();

  return (
    <div className="bg-green-700 w-full h-full absolute top-0 left-0 flex flex-row gap-2 p-2 justify-center">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white h-1/2 text-black flex flex-col gap-2 justify-center p-4"
      >
        <span className="flex flex-row gap-2">
          <div className="bg-blue-500 w-8 h-8 border border-black" />
          Libre
        </span>
        <span className="flex flex-row gap-2">
          <div className="bg-orange-300 w-8 h-8 border border-black" />
          Reservado
        </span>
        <span className="flex flex-row gap-2">
          <div className="bg-green-500 w-8 h-8 border border-black" />
          Vendido
        </span>
        <span className="flex flex-row gap-2">
          <div className="bg-red-500 w-8 h-8 border border-black" />
          Devuelto
        </span>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white flex-1 h-full flex flex-col text-black p-2"
      >
        <div className="flex justify-around">
          <span className="flex gap-1 items-center justify-center">
            <label htmlFor="">Clase Ejecutiva:</label>$
            <input
              type="text"
              readOnly
              value={20}
              className=" w-1/5 text-left"
            />
          </span>
          <span className="flex gap-1 items-center justify-center">
            <label htmlFor="">Clase Turística:</label>$
            <input
              type="text"
              readOnly
              value={20}
              className="w-1/5 text-left"
            />
          </span>
          <button onClick={onClose} className="text-white">
            X
          </button>
        </div>
        <p className="text-left">Seleccione su Asiento...</p>
        <div className="flex-1 border border-black flex flex-wrap gap-2 p-2 items-center justify-center">
          {seats.map((seat) => (
            <div
              key={seat.id}
              onClick={() => {
                setSelectedSeat(seat);
                setShowModal(true);
              }}
              className={`${
                seat.status === "Libre"
                  ? `bg-blue-500`
                  : seat.status === "Reservado"
                  ? `bg-orange-300`
                  : seat.status === "Vendido"
                  ? `bg-green-500`
                  : seat.status === "Devuelto"
                  ? `bg-red-500`
                  : ``
              } w-8 h-8 rounded-lg border border-black cursor-pointer`}
            />
          ))}
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} seat={selectedSeat} />
      )}
    </div>
  );
}
