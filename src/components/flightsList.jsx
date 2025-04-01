import FlightCard from "./flightCard";

export default function FlightsList() {
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
          <FlightCard flight={flight}/>
        ))
      )}
    </div>
  );
}
