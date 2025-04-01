import { useState } from "react";
import CountriesJson from "../Data/countries.json";
import CitiesJson from "../Data/cities.json";
import arrowImg from "../assets/arrowImg.png";

export default function DestinationSelect() {
  const [countryOrigin, setCountryOrigin] = useState(0);
  const [cityOrigin, setCityOrigin] = useState(0);

  const [countryDestination, setCountryDestination] = useState(0);
  const [cityDestination, setCityDestination] = useState(0);
  
  const [date, setDate] = useState("");

  // Filtrar las ciudades según los countries seleccionados
  const filteredCitiesOrigin = CitiesJson.filter(
    (city) => city.id_country === Number(countryOrigin)
  );
  const filteredCitiesDestination = CitiesJson.filter(
    (city) => city.id_country === Number(countryDestination)
  );

  return (
    <div className="w-2/3 flex flex-row justify-between gap-2">
      <span className="flex flex-row">
        <span className="flex flex-col gap-2 justify-evenly">
          <span className="flex flex-row gap-3 items-center justify-between">
            <label htmlFor="countryOrigin">País Origen:</label>
            <select
              id="countryOrigin"
              className="border border-white text-center p-1 bg-gray-700 w-3/5"
              value={countryOrigin}
              onChange={(e) => {
                setCountryOrigin(e.target.value);
              }}
            >
              <option hidden value="0">
                Selecciona un país...
              </option>
              {CountriesJson.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </span>
          <span className="flex flex-row gap-3 items-center justify-between">
            <label htmlFor="cityOrigin">Ciudad Origen:</label>
            <select
              id="cityOrigin"
              className="border border-white text-center p-1 bg-gray-700 w-3/5"
              value={cityOrigin}
              onChange={(e) => {
                setCityOrigin(e.target.value);
              }}
            >
              <option hidden value="0">
                ...
              </option>
              {filteredCitiesOrigin.length > 0 ? (
                filteredCitiesOrigin.map((city) => (
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

        <span className="flex items-center p-2">
          <img src={arrowImg} alt="arrow" width={100} />
        </span>

        <span className="flex flex-col gap-2 justify-evenly">
          <span className="flex flex-row gap-3 items-center justify-between">
            <label htmlFor="countryDestination">País Destino:</label>
            <select
              id="countryDestination"
              className="border border-white text-center p-1 bg-gray-700 w-3/5"
              value={countryDestination}
              onChange={(e) => {
                setCountryDestination(e.target.value);
              }}
            >
              <option hidden value="0">
                Selecciona un país...
              </option>
              {CountriesJson.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </span>
          <span className="flex flex-row gap-3 items-center justify-between">
            <label htmlFor="cityDestination">Ciudad Destino:</label>
            <select
              id="cityDestination"
              className="border border-white text-center p-1 bg-gray-700 w-3/5"
              value={cityDestination}
              onChange={(e) => {
                setCityDestination(e.target.value);
              }}
            >
              <option hidden value="0">
                ...
              </option>
              {filteredCitiesDestination.length > 0 ? (
                filteredCitiesDestination.map((city) => (
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
      </span>

      <span className="flex flex-row gap-3 items-center">
        <label htmlFor="date">Fecha de Vuelo: </label>
        <input
          type="date"
          id="date"
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
