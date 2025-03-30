import { useState } from "react";

export default function ServerSelect() {
  const [currentCity, setCurrentCity] = useState("");
  const [server, setServer] = useState("...");
  const cities = [
    { id: 1, name: "Cochabamba - Bolivia" },
    { id: 2, name: "Buenos Aires -Argentina" },
    { id: 3, name: "Sao Paulo - Brasil" },
    { id: 4, name: "Cusco - Perú" },
  ];
  const servers = [
    { id: 1, name: "América" },
    { id: 2, name: "China" },
    { id: 3, name: "África" },
  ];
  const selectServer = (city) => {
    switch (city) {
      case "1":
        setServer(servers[0].name);
        break;
      case "2":
        setServer(servers[1].name);
        break;
      case "3":
        setServer(servers[2].name);
        break;
      default:
        setServer("...");
        break;
    }
  };

  return (
    <div className="border-3 border-white p-5 flex justify-around">
      <span className="flex flex-row gap-3 items-center">
        <label htmlFor="">Estoy comprando desde:</label>
        <select
          name=""
          id=""
          className="border border-white text-center p-1"
          value={currentCity}
          onChange={(e) => {
            setCurrentCity(e.target.value);
            selectServer(e.target.value);
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
      <span className="flex flex-row gap-3 items-center">
        <label htmlFor="">Servidor Óptimo Seleccionado:</label>
        <input
          type="text"
          readOnly
          className="border border-white text-center p-1"
          value={server}
        />
      </span>
    </div>
  );
}
