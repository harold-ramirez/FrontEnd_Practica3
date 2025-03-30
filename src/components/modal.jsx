import { useState } from "react";

export default function Modal({ seat }) {
  const [passenger, setPassenger] = useState("");
  const [passport, setPassport] = useState("");

  return (
    <div className="bg-black flex items-center justify-center w-full h-full fixed top-0 left-0 z-50">
      <div className="bg-white rounded-xl flex flex-col p-2">
        <span className="flex flex-row justify-between items-center">
          <span className="flex flex-col">
            <span className="flex flex-row gap-2">
              <label htmlFor="">Asiento:</label>
              <input type="text" readOnly value={seat.seatNumber} />
            </span>

            <span className="flex flex-row gap-2">
              <label htmlFor="">Clase:</label>
              <input type="text" readOnly value={seat.class} />
            </span>

            <span className="flex flex-row gap-2">
              <label htmlFor="">Precio:</label>
              <input type="text" readOnly value={seat.price} />
            </span>
          </span>
          <span className="flex flex-col">
            <span className="flex flex-row gap-2">
              <label htmlFor="">Pasajero:</label>
              <input
                type="text"
                readOnly={seat.status !== "Libre"}
                value={passenger}
                onChange={(e) => {
                  setPassenger(e.target.value);
                }}
              />
            </span>

            <span className="flex flex-row gap-2">
              <label htmlFor="">Pasaporte:</label>
              <input
                type="text"
                readOnly={seat.status !== "Libre"}
                value={passport}
                onChange={(e) => {
                  setPassport(e.target.value);
                }}
              />
            </span>
          </span>
        </span>
        <span className="flex flex-row justify-around items-center">
          {(() => {
            switch (seat.status) {
              case "Libre":
                return (
                  <>
                    <input type="button" value="Reservar" />
                    <input type="button" value="Comprar" />
                  </>
                );
              case "Reservado":
                return (
                  <>
                    <input type="button" value="Devolver" />
                    <input type="button" value="Comprar" />
                  </>
                );
              case "Vendido":
                return <p>No se aceptan devoluciones</p>;
              default:
                return null;
            }
          })()}
        </span>
      </div>
    </div>
  );
}
