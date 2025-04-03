import FlightCard from "./flightCard";

export default function FlightsList({flights}) {
  return (
    <div className="w-2/3 relative flex-1 border vorder-white p-2 flex flex-col gap-4 items-center">
      <span className="text-left w-full p-2">Vuelos Disponibles:</span>
      {flights.length === 0 ? (
        <span className="flex flex-1 items-center justify-center">
          No hay vuelos disponibles...
        </span>
      ) : (
        flights.map((flight) => (
          <FlightCard flight={flight}/>
        ))
      )}
    </div>
  );
}
