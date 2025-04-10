import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";

export default function Modal({ onClose, seat, closeSeatSelection }) {
  const [passengerID, setPassengerID] = useState(0);
  const [passenger, setPassenger] = useState("");
  const [passport, setPassport] = useState("");
  const [passportExists, setPassportExists] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false); // Nuevo estado para controlar el procesamiento

  const handleSearchPassenger = async (pasaporte) => {
    if (pasaporte.length >= 5) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/clientes/pasajero/${pasaporte}`
        );
        if (response.data.nombre !== undefined) {
          setPassengerID(parseInt(response.data.id));
          setPassenger(response.data.nombre + " " + response.data.apellido);
          setPassportExists(true);
        } else {
          setPassenger("");
          setPassportExists(false);
        }
      } catch (error) {
        console.error("Error fetching passenger:", error);
      }
    } else {
      setPassenger("");
      setPassportExists(true);
    }
  };

  const handleComprar = async () => {
    if (passport && passenger) {
      setIsProcessing(true); // Deshabilitar botones
      if (passportExists) {
        // Pasajero existente
        try {
          if (seat.estado === "reservado") {
            // Para actualizar un asiento ya reservado
            const response = await axios.put(
              `${API_BASE_URL}/asientos/reserva/estado`,
              {
                id_cliente: seat.id_cliente,
                id_programacion: seat.id_programacion,
                id_avion: seat.id_avion,
                nombre_asiento: seat.nombre_asiento,
                estado: "comprado",
              }
            );

            if (response.status === 200) {
              alert("Compra realizada con éxito");
              closeSeatSelection();
            } else {
              console.error("Error al realizar la compra");
              alert("Error al realizar la compra");
              closeSeatSelection();
            }
          } else {
            // Asiento Libre
            //update en asientoProgramación
            const response = await axios.put(
              `${API_BASE_URL}/asientos/asiento-programacion/estado`,
              {
                id_programacion: seat.id_programacion,
                id_avion: seat.id_avion,
                nombre_asiento: seat.nombre_asiento,
                disponible: false,
              }
            );
            if (response.status === 200) {
              //insert en reserva
              await axios.post(`${API_BASE_URL}/asientos/reserva`, {
                id_cliente: passengerID,
                id_programacion: seat.id_programacion,
                id_avion: seat.id_avion,
                nombre_asiento: seat.nombre_asiento,
                precio_usd: seat.precio_usd,
                estado: "comprado",
              });
              alert("Compra realizada con éxito");
              closeSeatSelection();
            } else {
              console.error("Error en la transaccion");
              alert("Error en la transaccion");
              closeSeatSelection();
            }
          }
        } catch (error) {
          console.error("Error en la compra de asiento:", error);
        } finally {
          setIsProcessing(false); // Habilitar botones
        }
      } else {
        // Pasajero nuevo -> sí o sí asiento libre
        try {
          const response = await axios.post(
            `${API_BASE_URL}/reservas/pasajero`,
            {
              nombre: passenger.split(" ")[0],
              apellido: passenger.split(" ")[1],
              pasaporte: passport,
              id_programacion: seat.id_programacion,
              id_avion: seat.id_avion,
              nombre_asiento: seat.nombre_asiento,
              precio_usd: seat.precio_usd,
              estado: "comprado",
            }
          );
          if (response.status === 200) {
            alert("Compra realizada con éxito");
            closeSeatSelection();
          } else {
            console.error("Error en la compra de asiento");
            alert("Error en la compra de asiento");
            closeSeatSelection();
          }
        } catch (error) {
          console.error("Error en la compra de asiento:", error);
        } finally {
          setIsProcessing(false); // Habilitar botones
        }
      }
    } else {
      alert("Complete los campos requeridos");
    }
  };

  const handleReservar = async () => {
    // Solo se pueden reservar los asientos libres
    if (passport && passenger) {
      setIsProcessing(true); // Deshabilitar botones
      if (passportExists) {
        // Pasajero existente
        try {
          //update en asientoProgramación
          const response = await axios.put(
            `${API_BASE_URL}/asientos/asiento-programacion/estado`,
            {
              id_programacion: seat.id_programacion,
              id_avion: seat.id_avion,
              nombre_asiento: seat.nombre_asiento,
              disponible: false,
            }
          );
          if (response.status === 200) {
            //insert en reserva
            await axios.post(`${API_BASE_URL}/asientos/reserva`, {
              id_cliente: passengerID,
              id_programacion: seat.id_programacion,
              id_avion: seat.id_avion,
              nombre_asiento: seat.nombre_asiento,
              precio_usd: seat.precio_usd,
              estado: "reservado",
            });
            alert("Reserva realizada con éxito");
            closeSeatSelection();
          } else {
            console.error("Error en la reserva");
            alert("Error en la reserva");
            closeSeatSelection();
          }
        } catch (error) {
          console.error("Error en la compra de asiento:", error);
        } finally {
          setIsProcessing(false); // Habilitar botones
        }
      } else {
        // Pasajero nuevo
        try {
          const response = await axios.post(
            `${API_BASE_URL}/reservas/pasajero`,
            {
              nombre: passenger.split(" ")[0],
              apellido: passenger.split(" ")[1],
              pasaporte: passport,
              id_programacion: seat.id_programacion,
              id_avion: seat.id_avion,
              nombre_asiento: seat.nombre_asiento,
              precio_usd: seat.precio_usd,
              estado: "reservado",
            }
          );
          if (response.status === 200) {
            alert("Reserva realizada con éxito");
            closeSeatSelection();
          } else {
            console.error("Error en la reserva");
            alert("Error en la reserva");
            closeSeatSelection();
          }
        } catch (error) {
          console.error("Error en la compra de asiento:", error);
        } finally {
          setIsProcessing(false); // Habilitar botones
        }
      }
    } else {
      alert("Complete los campos requeridos");
    }
  };

  const handleDevolver = async () => {
    // Solo se pueden devolver los asientos reservados
    setIsProcessing(true); // Deshabilitar botones
    try {
      //update en reserva
      const response = await axios.put(
        `${API_BASE_URL}/asientos/reserva/estado`,
        {
          id_cliente: seat.id_cliente,
          id_programacion: seat.id_programacion,
          id_avion: seat.id_avion,
          nombre_asiento: seat.nombre_asiento,
          estado: "cancelado",
        }
      );

      if (response.status === 200) {
        alert("Devolución realizada con éxito");
        closeSeatSelection();
      } else {
        console.error("Error al realizar la devolución");
        alert("Error al realizar la devolución");
        closeSeatSelection();
      }
    } catch (error) {
      console.error("Error en la compra de asiento:", error);
    } finally {
      setIsProcessing(false); // Habilitar botones
    }
  };

  return (
    <div
      onClick={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      className="flex items-center justify-center w-full h-full fixed top-0 left-0 text-black z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl h-1/3 flex flex-col justify-center p-5 border-8 ${
          seat.estado === "reservado"
            ? `border-orange-300`
            : seat.estado === "comprado"
            ? `border-green-500`
            : seat.disponible === true
            ? `border-blue-500`
            : seat.estado === "cancelado"
            ? `border-red-500`
            : ``
        }`}
      >
        <span className="flex flex-row justify-between items-center flex-1 gap-1">
          <span className="flex flex-col gap-2">
            <span className="flex flex-row gap-1 justify-center">
              <label htmlFor="" className="w-2/5">
                Asiento:
              </label>
              <input
                type="text"
                readOnly
                value={seat.nombre_asiento}
                className="border border-black w-2/5 p-1 rounded text-center"
              />
            </span>

            <span className="flex flex-row gap-1 justify-center">
              <label htmlFor="" className="w-2/5">
                Clase:
              </label>
              <input
                type="text"
                readOnly
                value={seat.clase}
                className="border border-black w-2/5 p-1 rounded text-center"
              />
            </span>

            <span className="flex flex-row gap-1 justify-center">
              <label htmlFor="" className="w-2/5">
                Precio:
              </label>
              <input
                type="text"
                readOnly
                value={"$" + seat.precio_usd}
                className="border border-black w-2/5 p-1 rounded text-center"
              />
            </span>
          </span>

          <span className="flex flex-col gap-2">
            <span className="flex flex-row gap-2">
              <label htmlFor="" className="w-2/5">
                Estado:
              </label>
              <input
                type="text"
                readOnly
                value={seat.estado === null ? "Libre" : seat.estado}
                className="border border-black p-1 rounded text-center"
              />
            </span>

            <span className="flex flex-row gap-2">
              <label htmlFor="" className="w-2/5">
                Pasaporte:
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="12345"
                readOnly={seat.estado !== null} // Solo editable si el asiento está libre (estado === null)
                value={seat.estado === null ? passport : seat.pasaporte || ""} // Usa el estado passport si está libre, o el valor del asiento si no
                className="border border-black p-1 rounded text-center"
                onChange={(e) => {
                  const value = e.target.value; // Solo números
                  setPassport(value);
                  handleSearchPassenger(value); // Llama a la función si tiene al menos 5 caracteres
                }}
              />
            </span>

            <span className="flex flex-row gap-2">
              <label htmlFor="" className="w-2/5">
                Pasajero:
              </label>
              <input
                type="text"
                readOnly={seat.estado !== null || passportExists} // Solo editable si el asiento está libre y no existe el pasajero
                value={
                  seat.estado === null
                    ? passenger
                    : seat.nombre
                    ? `${seat.nombre} ${seat.apellido}`
                    : ""
                } // Usa el estado passenger si está libre, o los datos del asiento si no
                placeholder="Jhon Doe"
                className="border border-black p-1 rounded text-center"
                onChange={(e) => {
                  setPassenger(e.target.value); // Actualiza el estado passenger
                }}
              />
            </span>
          </span>
        </span>
        <span className="flex flex-row justify-around items-center p-1">
          {(() => {
            switch (seat.estado) {
              case null: // Libre
                return (
                  <>
                    <input
                      type="button"
                      value="Reservar"
                      onClick={handleReservar}
                      disabled={isProcessing} // Deshabilitar mientras se procesa
                      className={`bg-blue-300 border border-black w-1/3 rounded-lg p-2 hover:bg-blue-800 hover:text-white ${
                        isProcessing ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    />
                    <input
                      type="button"
                      value="Comprar"
                      onClick={handleComprar}
                      disabled={isProcessing} // Deshabilitar mientras se procesa
                      className={`bg-green-300 border border-black w-1/3 rounded-lg p-2 hover:bg-green-800 hover:text-white ${
                        isProcessing ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    />
                  </>
                );
              case "reservado":
                return (
                  <>
                    <input
                      type="button"
                      value="Devolver"
                      onClick={handleDevolver}
                      disabled={isProcessing} // Deshabilitar mientras se procesa
                      className={`bg-red-300 border border-black w-1/3 rounded-lg p-2 hover:bg-red-800 hover:text-white ${
                        isProcessing ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    />
                    <input
                      type="button"
                      value="Comprar"
                      onClick={handleComprar}
                      disabled={isProcessing} // Deshabilitar mientras se procesa
                      className={`bg-green-300 border border-black w-1/3 rounded-lg p-2 hover:bg-green-800 hover:text-white ${
                        isProcessing ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    />
                  </>
                );
              case "comprado":
                return (
                  <p className="italic text-red-600">
                    No se aceptan devoluciones
                  </p>
                );
              case "cancelado":
                return (
                  <p className="italic text-red-600">
                    Actualizando... en breve pasará a estado Libre
                  </p>
                );
              default:
                return null;
            }
          })()}
        </span>
      </div>
    </div>
  );
}
