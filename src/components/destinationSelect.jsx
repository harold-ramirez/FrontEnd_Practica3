import { useState, useEffect } from "react";
import arrowImg from "../assets/arrowImg.png";
import axios from "axios";
import { API_BASE_URL } from "../constants.js";

export default function DestinationSelect({ setAirportOrigin, setAirportDestination, setDate }) {
  const [countriesList, setCountriesList] = useState([]);
  const [airportsOriginList, setAirportsOriginList] = useState([]);
  const [airportsDestinationList, setAirportsDestinationList] = useState([]);
  
  const [countryOrigin, setCountryOrigin] = useState(0);
  const [countryDestination, setCountryDestination] = useState(0);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/paises/paises`
      );
      setCountriesList(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchAirports = async (countryId, isOrigin) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/paises/paises-aeropuertos`
      );
      if (isOrigin) {
        setAirportsOriginList(
          response.data.filter(
            (airport) => airport.id_pais === parseInt(countryId)
          )
        );
      } else {
        setAirportsDestinationList(
          response.data.filter(
            (airport) => airport.id_pais === parseInt(countryId)
          )
        );
      }
    } catch (error) {
      console.log("Error getting airports: ", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

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
                fetchAirports(e.target.value, true);
              }}
            >
              <option hidden value="0">
                Selecciona un país...
              </option>
              {countriesList.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.nombre}
                </option>
              ))}
            </select>
          </span>
          <span className="flex flex-row gap-3 items-center justify-between">
            <label htmlFor="cityOrigin">Aeropuerto Origen:</label>
            <select
              id="cityOrigin"
              className="border border-white text-center p-1 bg-gray-700 w-3/5"
              onChange={(e) => {
                setAirportOrigin(e.target.value);
              }}
            >
              <option hidden value="0">
                ...
              </option>
              {airportsOriginList.length > 0 ? (
                airportsOriginList.map((airport) => (
                  <option
                    key={airport.id_aeropuerto}
                    value={airport.id_aeropuerto}
                  >
                    {airport.nombre_aeropuerto}
                  </option>
                ))
              ) : (
                <option disabled>No hay aeropuertos disponibles</option>
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
                fetchAirports(e.target.value, false);
              }}
            >
              <option hidden value="0">
                Selecciona un país...
              </option>
              {countriesList.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.nombre}
                </option>
              ))}
            </select>
          </span>
          <span className="flex flex-row gap-3 items-center justify-between">
            <label htmlFor="cityDestination">Aeropuerto Destino:</label>
            <select
              id="cityDestination"
              className="border border-white text-center p-1 bg-gray-700 w-3/5"
              onChange={(e) => {
                setAirportDestination(e.target.value);
              }}
            >
              <option hidden value="0">
                ...
              </option>
              {airportsDestinationList.length > 0 ? (
                airportsDestinationList.map((airport) => (
                  <option
                    key={airport.id_aeropuerto}
                    value={airport.id_aeropuerto}
                  >
                    {airport.nombre_aeropuerto}
                  </option>
                ))
              ) : (
                <option disabled>No hay aeropuertos disponibles</option>
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
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </span>
    </div>
  );
}
