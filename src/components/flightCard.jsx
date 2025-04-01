import { useState } from "react";
import SeatSelect from "./seatSelect";
import arrowImg from "../assets/arrowImg.png";

export default function FlightCard({ flight }) {
  const [showSeats, setShowSeats] = useState(false);

  return (
    <>
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
      {showSeats && <SeatSelect onClose={() => setShowSeats(false)} />}
    </>
  );
}
