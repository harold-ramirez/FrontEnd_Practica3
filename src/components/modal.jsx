import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";

export default function Modal({ onClose, seat }) {
  const [passenger, setPassenger] = useState("");
  const [passport, setPassport] = useState("");
  const [passportExists, setPassportExists] = useState(true);

  const handleSearchPassenger = async (pasaporte) => {
    if (pasaporte.length >= 5) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/clientes/pasajero/${pasaporte}`
        );
        if (response.data.nombre !== undefined) {
          setPassenger(response.data.nombre + " " + response.data.apellido);
          setPassportExists(true);
        } else {
          setPassenger("");
          setPassportExists(false);
        }
      } catch (error) {
        console.error("Error fecthing passenger:", error);
      }
    } else {
      setPassenger("");
      setPassportExists(true);
    }
  };

  const handleComprar = async () => {
    if (passport && passenger) {
      //en caso de pasajero existente
      //registrar el asiento con ese pasajero
      if (passportExists) {
        try {
          const response = await axios.put(
            `${API_BASE_URL}/asientos/asientos/comprar`,
            {
              params: {
                idAsiento: seat.idAsiento,
                pasaporte: passport,
                pasajero: passenger,
              },
            }
          );
          if (response.status === 200) {
            alert("Compra realizada con éxito");
            onClose();
          } else {
            console.error("Error al realizar la compra");
          }
        } catch (error) {
          console.error("Error en la compra de asiento:", error);
        }
      } else {
        //en caso de pasajero nuevo
        //registrar el pasajero
        //registrar el asiento con ese pasajero
        try {
          const response = await axios.post(
            `${API_BASE_URL}/reservas/pasajero`,
            {
              params: {
                nombre: passenger.split(" ")[0],
                apellido: passenger.split(" ")[1],
                pasaporte: passport,
                id_programacion: seat.id_programacion,
                id_avion: seat.id_avion,
                nombre_asiento: seat.nombre_asiento,
              },
            }
          );
          if (response.status === 200) {
            alert("Compra realizada con éxito");
            onClose();
          } else {
            console.error("Error al realizar la compra");
          }
        } catch (error) {
          console.error("Error en la compra de asiento:", error);
        }
      }
    } else {
      alert("Complete los campos requeridos");
    }
  };

  const handleDevolver = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/asientos/asientos/devolver`,
        {
          params: {
            idAsiento: seat.idAsiento,
          },
        }
      );

      if (response.status === 200) {
        alert(
          "El asiento se devolvió con éxito, en unos minutos se reflejará el cambio"
        );
        onClose();
      } else {
        alert("Error al devolver el asiento");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReservar = async () => {
    if (passenger && passport) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/asientos/asientos/reservar`,
          {
            params: {
              idAsiento: seat.idAsiento,
              pasaporte: passport,
              pasajero: passenger,
            },
          }
        );

        if (response.status === 200) {
          alert("Reserva realizada con éxito");
          onClose();
        } else {
          alert("Error al realizar la reserva");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      alert("Complete los campos requeridos");
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
            : seat.estado === "devuelto"
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
                  const value = e.target.value.replace(/[^0-9]/g, ""); // Solo números
                  setPassport(value);
                  if (value.length >= 5) {
                    handleSearchPassenger(value); // Llama a la función si tiene al menos 5 caracteres
                  }
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
                      className="bg-blue-300 border border-black w-1/3 rounded-lg p-2 hover:bg-blue-800 hover:text-white"
                    />
                    <input
                      type="button"
                      value="Comprar"
                      onClick={handleComprar}
                      className="bg-green-300 border border-black w-1/3 rounded-lg p-2 hover:bg-green-800 hover:text-white"
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
                      className="bg-red-300 border border-black w-1/3 rounded-lg p-2 hover:bg-red-800 hover:text-white"
                    />
                    <input
                      type="button"
                      value="Comprar"
                      onClick={handleComprar}
                      className="bg-green-300 border border-black w-1/3 rounded-lg p-2 hover:bg-green-800 hover:text-white"
                    />
                  </>
                );
              case "comprado":
                return (
                  <p className="italic text-red-600">
                    No se aceptan devoluciones
                  </p>
                );
              case "devuelto":
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
