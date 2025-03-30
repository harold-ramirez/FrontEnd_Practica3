import { useState } from "react";

export default function DestinationSelect() {
  const [origin, setOrigin] = useState(0);
  const [destination, setDestination] = useState(0);
  const [date, setDate] = useState("");
  const cities = [
    { id: 1, name: "Bolivia" },
    { id: 2, name: "Argentina" },
    { id: 3, name: "Brasil" },
    { id: 4, name: "Perú" },
  ];

  return (
    <div className="w-2/3 flex flex-row justify-between gap-8">
      <span className="flex-1 flex flex-row items-center justify-between">
        <span className="flex flex-row gap-3 items-center">
          <label htmlFor="">Origen:</label>
          <select
            name=""
            id=""
            className="border border-white text-center p-1 bg-gray-700"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
            }}
          >
            <option hidden value="0">
              Selecciona una ciudad...
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </span>

        <p>{"-->"}</p>

        <span className="flex flex-row gap-3 items-center">
          <label htmlFor="">Destino:</label>
          <select
            name=""
            id=""
            className="border border-white text-center p-1 bg-gray-700"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
          >
            <option hidden value="0">
              Selecciona una ciudad...
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </span>
      </span>

      <span className="flex flex-row gap-3 items-center">
        <label htmlFor="">Fecha de Vuelo: </label>
        <input
          type="date"
          name=""
          id=""
          className="border border-white text-center p-1"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </span>
    </div>
  );
}
