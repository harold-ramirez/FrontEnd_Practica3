import { useState, useEffect } from "react";
import AirplaneMap1 from "./airplaneMaps/airplaneMap1";
import axios from "axios";
import { API_BASE_URL } from "../constants.js";

export default function SeatSelect({ flightId, onClose }) {
  const [seats, setSeats] = useState([]);
  const [executivePrice, setExecutivePrice] = useState(0);
  const [turistPrice, setTuristPrice] = useState(0);

  const fetchSeats = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/reservas/reserva-detalle/${flightId}`
      );
      // console.table(response.data);
      setSeats(response.data);
      setExecutivePrice(response.data[0].precio_usd);
      setTuristPrice(response.data[response.data.length - 1].precio_usd);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  return (
    <div className="bg-green-700 w-full h-full absolute top-0 left-0 flex flex-row gap-2 p-2 justify-center">
      <div className="bg-white h-1/2 text-black flex flex-col gap-2 justify-center p-4">
        <span className="flex flex-row gap-2">
          <div className="bg-blue-500 w-6 h-6 border border-black" />
          Libre
        </span>
        <span className="flex flex-row gap-2">
          <div className="bg-orange-300 w-6 h-6 border border-black" />
          Reservado
        </span>
        <span className="flex flex-row gap-2">
          <div className="bg-green-500 w-6 h-6 border border-black" />
          Vendido
        </span>
        <span className="flex flex-row gap-2">
          <div className="bg-red-500 w-6 h-6 border border-black" />
          Devuelto
        </span>
        <span className="flex flex-row gap-2">
          <div className="border-4 border-black w-6 h-6" />
          Clase Ejecutiva
        </span>
      </div>

      <div className="bg-white flex-1 h-full flex flex-col text-black p-2">
        <div className="flex items-center justify-between">
          <label htmlFor="">Clase Ejecutiva: ${executivePrice}</label>
          <label htmlFor="">Clase Turista: ${turistPrice}</label>
          <button onClick={onClose} className="text-white">
            X
          </button>
        </div>
        <p className="text-left">Seleccione su Asiento por favor...</p>

        <div className="p-4 flex-1 flex flex-col justify-center">
          <AirplaneMap1 seats={seats} />
        </div>
      </div>
    </div>
  );
}
