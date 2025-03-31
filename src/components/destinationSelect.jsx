import { useState } from "react";
import Cities from "../Data/cities.json";
import arrowImg from "../assets/arrowImg.png";

export default function DestinationSelect({ countryId }) {
  const [origin, setOrigin] = useState(0);
  const [destination, setDestination] = useState(0);
  const [date, setDate] = useState("");

  // Filtrar las ciudades según el countryId proporcionado
  const filteredCities = Cities.filter(
    (city) => city.id_country === Number(countryId)
  );

  return (
    <div className="w-2/3 flex flex-row justify-between gap-8">
      <span className="flex-1 flex flex-row items-center justify-between">
        <span className="flex flex-row gap-3 items-center">
          <label htmlFor="origin">Origen:</label>
          <select
            id="origin"
            className="border border-white text-center p-1 bg-gray-700"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
            }}
          >
            <option hidden value="0">
              Selecciona una ciudad...
            </option>
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))
            ) : (
              <option disabled>No hay ciudades disponibles</option>
            )}
          </select>
        </span>

        <img src={arrowImg} alt="arrow" width={50} />

        <span className="flex flex-row gap-3 items-center">
          <label htmlFor="destination">Destino:</label>
          <select
            id="destination"
            className="border border-white text-center p-1 bg-gray-700"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
          >
            <option hidden value="0">
              Selecciona una ciudad...
            </option>
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))
            ) : (
              <option disabled>No hay ciudades disponibles</option>
            )}
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
