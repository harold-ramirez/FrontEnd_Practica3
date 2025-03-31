import Countries from "../Data/countries.json";
import { useState } from "react";

export default function ServerSelect() {
  const [countryId, setCountryId] = useState(null);

  return (
    <div className="border-3 border-white p-5 flex justify-around">
      <span className="flex flex-row gap-3 items-center">
        <label htmlFor="currentCity">Estoy comprando desde:</label>
        <select
          id="currentCity"
          value={countryId}
          onChange={(e) => {
            setCountryId(e.target.value);
          }}
          className="bg-gray-700 border border-white text-center p-1"
        >
          <option hidden value="0">
            Selecciona un país...
          </option>
          {Countries.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </span>
      <span className="flex flex-row gap-3 items-center">
        <label htmlFor="">Servidor Óptimo Seleccionado:</label>
        <input
          type="text"
          readOnly
          className="border border-white text-center p-1"
          placeholder="Seleccione un país..."
        />
      </span>
    </div>
  );
}
