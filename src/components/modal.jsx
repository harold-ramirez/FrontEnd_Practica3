import { useState } from "react";

export default function Modal({ onClose, seat }) {
  const [passenger, setPassenger] = useState("");
  const [passport, setPassport] = useState("");

  return (
    <div
      onClick={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      className="flex items-center justify-center w-full h-full fixed top-0 left-0 text-black z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl h-1/3 flex flex-col justify-center p-5 border-8 ${
          seat.status === "Libre"
            ? `border-blue-500`
            : seat.status === "Reservado"
            ? `border-orange-300`
            : seat.status === "Vendido"
            ? `border-green-500`
            : seat.status === "Devuelto"
            ? `border-red-500`
            : ``
        }`}
      >
        <span className="flex flex-row justify-between items-center flex-1 gap-1">
          <span className="flex flex-col gap-2">
            <span className="flex flex-row gap-1 justify-center">
              <label htmlFor="" className="w-2/5">
                Asiento:
              </label>
              <input
                type="text"
                readOnly
                value={seat.seatNumber}
                className="border border-black w-2/5 p-1 rounded text-center"
              />
            </span>

            <span className="flex flex-row gap-1 justify-center">
              <label htmlFor="" className="w-2/5">
                Clase:
              </label>
              <input
                type="text"
                readOnly
                value={seat.class}
                className="border border-black w-2/5 p-1 rounded text-center"
              />
            </span>

            <span className="flex flex-row gap-1 justify-center">
              <label htmlFor="" className="w-2/5">
                Precio:
              </label>
              <input
                type="text"
                readOnly
                value={seat.price}
                className="border border-black w-2/5 p-1 rounded text-center"
              />
            </span>
          </span>

          <span className="flex flex-col gap-2">
            <span className="flex flex-row gap-2">
              <label htmlFor="" className="w-2/5">
                Pasajero:
              </label>
              <input
                type="text"
                readOnly={seat.status !== "Libre"}
                value={passenger}
                placeholder="Ingrese su nombre"
                className="border border-black p-1 rounded text-center"
                onChange={(e) => {
                  setPassenger(e.target.value);
                }}
              />
            </span>

            <span className="flex flex-row gap-2">
              <label htmlFor="" className="w-2/5">
                Pasaporte:
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="X X X X X"
                readOnly={seat.status !== "Libre"}
                value={passport}
                className="border border-black p-1 rounded text-center"
                onChange={(e) => {
                  setPassport(e.target.value.replace(/[^0-9]/g, ""));
                }}
              />
            </span>
          </span>
        </span>
        <span className="flex flex-row justify-around items-center p-1">
          {(() => {
            switch (seat.status) {
              case "Libre":
                return (
                  <>
                    <input
                      type="button"
                      value="Reservar"
                      className="border border-black w-1/3 rounded-lg p-2 hover:bg-blue-800 hover:text-white"
                    />
                    <input
                      type="button"
                      value="Comprar"
                      className="border border-black w-1/3 rounded-lg p-2 hover:bg-green-800 hover:text-white"
                    />
                  </>
                );
              case "Reservado":
                return (
                  <>
                    <input
                      type="button"
                      value="Devolver"
                      className="border border-black w-1/3 rounded-lg p-2 hover:bg-red-800 hover:text-white"
                    />
                    <input
                      type="button"
                      value="Comprar"
                      className="border border-black w-1/3 rounded-lg p-2 hover:bg-green-800 hover:text-white"
                    />
                  </>
                );
              case "Vendido":
                return (
                  <p className="italic text-red-600">
                    No se aceptan devoluciones
                  </p>
                );
              default:
                return null;
            }
          })()}
        </span>
      </div>
    </div>
  );
}
