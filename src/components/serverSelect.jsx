import { useState, useEffect } from "react";
import axios from "axios";
import Servers from "../Data/countries-servers.json";
import { API_BASE_URL } from "../constants";

export default function ServerSelect() {
  const [countriesList, setCountriesList] = useState([]);
  const [countryId, setCountryId] = useState(0);
  const [selectedServer, setSelectedServer] = useState("");

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/paises/paises`);
      setCountriesList(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleServer = (idCountry) => {
    setSelectedServer("Conectando...");
    setTimeout(() => {
      const selectedCountry = countriesList.find(
        (country) => country.id === parseInt(idCountry)
      );

      if (selectedCountry) {
        const countryName = selectedCountry.nombre;
        let continent = null;
        for (const [key, countries] of Object.entries(Servers)) {
          if (countries.includes(countryName)) {
            continent = key;
            break;
          }
        }

        if (continent) {
          setSelectedServer(continent);
        } else {
          setSelectedServer("Servidor no encontrado");
        }
      } else {
        setSelectedServer("País no encontrado");
      }
    }, 1000);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="border-3 border-white bg-teal-900 p-5 flex justify-around">
      <span className="flex flex-row gap-3 items-center">
        <label htmlFor="currentCity">Estoy comprando desde:</label>
        <select
          id="currentCity"
          value={countryId}
          onChange={(e) => {
            setCountryId(e.target.value);
            handleServer(e.target.value);
          }}
          className="bg-gray-700 border border-white text-center p-1"
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

      <span className="flex flex-row gap-3 items-center">
        <label htmlFor="">Servidor Óptimo Seleccionado:</label>
        <input
          type="text"
          readOnly
          value={selectedServer}
          className="border border-white text-center p-1"
          placeholder="Seleccione un país..."
        />
      </span>
    </div>
  );
}
