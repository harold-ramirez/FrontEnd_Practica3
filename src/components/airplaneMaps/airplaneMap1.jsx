import FlightSeat from "../flightSeat";

export default function AirplaneMap1({SeatsJson}) {
  return (
    <div className="flex flex-col gap-2 p-2 items-center justify-center rounded-2xl border-3 border-black">
      {/* Sección izquierda */}
      <div className="flex flex-col gap-1">
        {["A", "B", "C"].map((letter) => (
          <div key={letter} className="flex gap-2 items-center">
            {/* Agregar letra antes de la fila */}
            <span className="w-4 text-right text-gray-600">{letter}</span>
            {SeatsJson.filter((seat) => seat.seatNumber.includes(letter))
              .sort((a, b) => a.seatNumber.localeCompare(b.seatNumber)) // Ordenar por número
              .map((seat) => (
                <FlightSeat seat={seat} />
              ))}
          </div>
        ))}
      </div>

      {/* Pasillo */}
      <div className="h-8 w-full italic text-gray-600 flex gap-2 justify-center">
        <span className="w-4" />
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
      <div className="flex flex-col gap-1">
        {["D", "E", "F"].map((letter) => (
          <div key={letter} className="flex gap-2 items-center">
            {/* Agregar letra antes de la fila */}
            <span className="w-4 text-right text-gray-600">{letter}</span>
            {SeatsJson.filter((seat) => seat.seatNumber.includes(letter))
              .sort((a, b) => a.seatNumber.localeCompare(b.seatNumber)) // Ordenar por número
              .map((seat) => (
                <FlightSeat seat={seat} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
