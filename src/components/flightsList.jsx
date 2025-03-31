import { useState } from "react";
import SeatSelect from "./seatSelect";
import arrowImg from "../assets/arrowImg.png";

export default function FlightsList() {
  const [showSeats, setShowSeats] = useState(false);
  const flights = [
    {
      id: 1,
      origin: "Sao Paulo, Brasil",
      destination: "La Paz, Bolivia",
      originDate: "2023-10-01 04:30",
      destinationDate: "2023-10-01 22:30",
    },
    {
      id: 2,
      origin: "Sao Paulo, Brasil",
      destination: "La Paz, Bolivia",
      originDate: "2023-10-02 04:30",
      destinationDate: "2023-10-02 22:30",
    },
    {
      id: 3,
      origin: "Sao Paulo, Brasil",
      destination: "La Paz, Bolivia",
      originDate: "2023-10-03 04:30",
      destinationDate: "2023-10-03 22:30",
    },
    {
      id: 4,
      origin: "Sao Paulo, Brasil",
      destination: "La Paz, Bolivia",
      originDate: "2023-10-04 04:30",
      destinationDate: "2023-10-04 22:30",
    },
    {
      id: 5,
      origin: "Sao Paulo, Brasil",
      destination: "La Paz, Bolivia",
      originDate: "2023-10-05 04:30",
      destinationDate: "2023-10-05 22:30",
    },
  ];

  return (
    <div className="w-2/3 relative flex-1 border vorder-white p-2 flex flex-col gap-4 items-center">
      <span className="text-left w-full p-2">Vuelos Disponibles:</span>
      {flights.length === 0 ? (
        <span className="flex flex-1 items-center justify-center">
          No hay vuelos disponibles...
        </span>
      ) : (
        flights.map((flight) => (
          <div
            key={flight.id}
            onClick={() => setShowSeats(true)}
            className="w-4/5 border border-white rounded-lg px-5 py-2 flex flex-row hover:bg-gray-700 cursor-pointer"
          >
            <span className="flex-1 flex flex-row gap-2">
              <span className="flex flex-col">
                <span>{flight.originDate.split(" ")[0]}</span>
                <span className="font-bold text-3xl">
                  {flight.originDate.split(" ")[1]}
                </span>
              </span>
              <span className="flex flex-1 items-center justify-center">
                {flight.origin}
              </span>
            </span>

            {/* <span className="flex items-center">{"-->"}</span> */}
            <img src={arrowImg} width={100} alt="arrow Img" />
            <span className="flex-1 flex flex-row gap-2">
              <span className="flex flex-1 items-center justify-center">
                {flight.destination}
              </span>
              <span className="flex flex-col">
                <span>{flight.destinationDate.split(" ")[0]}</span>
                <span className="font-bold text-3xl">
                  {flight.destinationDate.split(" ")[1]}
                </span>
              </span>
            </span>
          </div>
        ))
      )}
      {showSeats && <SeatSelect onClose={() => setShowSeats(false)} />}
    </div>
  );
}
