import { useState } from "react";
import Modal from "./modal";
import Seats from "../Data/seats";

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
          <div className="bg-blue-500 w-6 h-6 border border-black" />
          Libre
        </span>
        <span className="flex flex-row gap-2">
          <div className="bg-orange-300 w-6 h-6 border border-black" />
          Reservado
        </span>
        <span className="flex flex-row gap-2">
          <div className="bg-green-500 w-6 h-6 border border-black" />
          Vendido
        </span>
        <span className="flex flex-row gap-2">
          <div className="bg-red-500 w-6 h-6 border border-black" />
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

        <div className="p-4 flex-1 flex flex-col justify-center">
          <div className="flex flex-col gap-2 p-2 items-center justify-center rounded-2xl border-3 border-black">
            {/* Sección izquierda */}
            <div className="flex flex-col gap-2">
              {["A", "B", "C"].map((letter) => (
                <div key={letter} className="flex gap-2 items-center">
                  {/* Agregar letra antes de la fila */}
                  <span className="w-4 text-right text-gray-600">{letter}</span>
                  {seats
                    .filter((seat) => seat.seatNumber.includes(letter))
                    .sort((a, b) => a.seatNumber.localeCompare(b.seatNumber)) // Ordenar por número
                    .map((seat) => (
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
                        } w-6 h-6 rounded-lg border border-black cursor-pointer`}
                      />
                    ))}
                </div>
              ))}
            </div>

            {/* Pasillo */}
            <div className="h-8 w-13/14 italic text-gray-600 flex gap-2 justify-center">
              <span className="w-4"/>
              <span className="w-6">01</span>
              <span className="w-6">02</span>
              <span className="w-6">03</span>
              <span className="w-6">04</span>
              <span className="w-6">05</span>
              <span className="w-6">06</span>
              <span className="w-6">07</span>
              <span className="w-6">08</span>
              <span className="w-6">09</span>
              <span className="w-6">10</span>
              <span className="w-6">11</span>
              <span className="w-6">12</span>
              <span className="w-6">13</span>
              <span className="w-6">14</span>
              <span className="w-6">15</span>
              <span className="w-6">16</span>
              <span className="w-6">17</span>
              <span className="w-6">18</span>
              <span className="w-6">19</span>
              <span className="w-6">20</span>
              <span className="w-6">21</span>
            </div>

            {/* Sección derecha */}
            <div className="flex flex-col gap-2">
              {["D", "E", "F"].map((letter) => (
                <div key={letter} className="flex gap-2 items-center">
                  {/* Agregar letra antes de la fila */}
                  <span className="w-4 text-right text-gray-600">{letter}</span>
                  {seats
                    .filter((seat) => seat.seatNumber.includes(letter))
                    .sort((a, b) => a.seatNumber.localeCompare(b.seatNumber)) // Ordenar por número
                    .map((seat) => (
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
                        } w-6 h-6 rounded-lg border border-black cursor-pointer`}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} seat={selectedSeat} />
      )}
    </div>
  );
}
