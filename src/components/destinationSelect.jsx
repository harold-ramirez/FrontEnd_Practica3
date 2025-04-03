import { useState, useEffect } from "react";
import CountriesJson from "../Data/countries.json";
import CitiesJson from "../Data/cities.json";
import arrowImg from "../assets/arrowImg.png";
import axios from "axios";


export default function DestinationSelect({setFlights}) {
  const [countryOrigin, setCountryOrigin] = useState(0);
  const [airportOrigin, setAirportOrigin] = useState(0);

  const [countryDestination, setCountryDestination] = useState(0);
  const [airportDestination, setAirportDestination] = useState(0);
  
  const [date, setDate] = useState("");

  // Filtrar las ciudades según los countries seleccionados
  const filteredCitiesOrigin = CitiesJson.filter(
    (city) => city.id_country === Number(countryOrigin)
  );
  const filteredCitiesDestination = CitiesJson.filter(
    (city) => city.id_country === Number(countryDestination)
  );

  const getFlights = async () =>{
    if(airportOrigin && airportDestination && date){
      try{
        const response = await axios.get(`http://localhost:3000/vuelos`, {
          params: {
            origen: airportOrigin,
            destino: airportDestination,
            fecha_salida: date,
          },
        });
        setFlights(response.data);
        console.log("Data received:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    getFlights();
  }, [airportOrigin, airportDestination, date])

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
            <label htmlFor="cityOrigin">Aeropuerto Origen:</label>
            <select
              id="cityOrigin"
              className="border border-white text-center p-1 bg-gray-700 w-3/5"
              value={airportOrigin}
              onChange={(e) => {
                setAirportOrigin(e.target.value);
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
            <label htmlFor="cityDestination">Aeropuerto Destino:</label>
            <select
              id="cityDestination"
              className="border border-white text-center p-1 bg-gray-700 w-3/5"
              value={airportDestination}
              onChange={(e) => {
                setAirportDestination(e.target.value);
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
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </span>
    </div>
  );
}
