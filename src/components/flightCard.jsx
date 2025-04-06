import { useState } from "react";
import SeatSelect from "./seatSelect";
import arrowImg from "../assets/arrowImg.png";

export default function FlightCard({ flight }) {
  const [showSeats, setShowSeats] = useState(false);

  return (
    <>
      <div
        key={flight.id_programacion}
        onClick={() => setShowSeats(true)}
        className="w-4/5 border border-white rounded-lg p-7 flex flex-row hover:bg-gray-700 cursor-pointer"
      >
        <span className="flex-1 flex flex-row gap-2">
          <span className="flex flex-col">
            <span>{flight.fecha_salida.slice(0, 10)}</span>
            <span className="font-bold text-3xl">
              {flight.fecha_salida.slice(11, 16)}
            </span>
          </span>
          <span className="flex flex-1 items-center justify-center">
            {flight.aeropuerto_origen}
            <br />
            ----- {flight.pais_origen} -----
          </span>
        </span>

        <div>
          <strong>VUELO: {flight.codigo_vuelo}</strong>
          <img src={arrowImg} width={100} alt="arrow Img" />
        </div>

        <span className="flex-1 flex flex-row gap-2">
          <span className="flex flex-1 items-center justify-center">
            {flight.aeropuerto_destino}
            <br />
            ----- {flight.pais_destino} -----
          </span>
          <span className="flex flex-col">
            <span>{flight.fecha_llegada.slice(0, 10)}</span>
            <span className="font-bold text-3xl">
              {flight.fecha_llegada.slice(11, 16)}
            </span>
          </span>
        </span>
      </div>
      {showSeats && (
        <SeatSelect
          flightId={flight.id_programacion}
          onClose={() => setShowSeats(false)}
        />
      )}
    </>
  );
}
