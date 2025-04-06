import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";

export default function Modal({ onClose, seat }) {
  const [passenger, setPassenger] = useState("");
  const [passport, setPassport] = useState("");

  const handleSearchPassenger = () => {
    // try{
    // }catch(error){
    //   console.error("Error:", error);
    // }
  };

  const handleComprar = () => {
    //Lógica
    onClose;
  };
  const handleDevolver = () => {
    //Lógica
    onClose;
  };
  const handleReservar = async () => {
    if (passenger && passport) {
      try {
        const response = await axios.post(`${API_BASE_URL}/reservar`, {
          params: {
            cliente: {
              nombre: passenger.split(" ")[0],
              apellido: passenger.split(" ")[1],
              pasaporte: passport,
              codigoPais: ".",
            },
            // idAvion: seat.idAvion,
            // idProgramacion: seat.idProgramacion,
            nombreAsiento: seat.nombre_asiento,
            precio: seat.precio_base_usd,
          },
        });
        // Manejar la respuesta aquí
        console.log("Respuesta del servidor:", response.data);
        console.log("Estado de la respuesta:", response.status);

        // Verificar el código de estado para determinar si la solicitud fue exitosa
        if (response.status === 200) {
          // La reserva fue exitosa
          console.log("Reserva realizada con éxito");
          onClose(); // Cerrar el modal o realizar otras acciones
        } else {
          // La reserva falló
          console.error("Error al realizar la reserva");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
          seat.estado === "libre"
            ? `border-blue-500`
            : seat.estado === "Reservado"
            ? `border-orange-300`
            : seat.estado === "Vendido"
            ? `border-green-500`
            : seat.estado === "Devuelto"
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
                value={seat.clase_viaje}
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
                value={seat.precio_base_usd}
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
                value={seat.estado}
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
                maxLength={5}
                placeholder="X X X X X"
                readOnly={seat.estado !== "libre"}
                value={passport}
                className="border border-black p-1 rounded text-center"
                onChange={(e) => {
                  setPassport(e.target.value.replace(/[^0-9]/g, ""));
                  handleSearchPassenger();
                }}
              />
            </span>

            <span className="flex flex-row gap-2">
              <label htmlFor="" className="w-2/5">
                Pasajero:
              </label>
              <input
                type="text"
                readOnly={seat.estado !== "libre" || passenger} ///falta implementar logica (?)
                value={passenger}
                placeholder="Ingrese su nombre"
                className="border border-black p-1 rounded text-center"
                onChange={(e) => {
                  setPassenger(e.target.value);
                }}
              />
            </span>
          </span>
        </span>
        <span className="flex flex-row justify-around items-center p-1">
          {(() => {
            switch (seat.estado) {
              case "libre":
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
              case "Reservado":
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
              case "Vendido":
                return (
                  <p className="italic text-red-600">
                    No se aceptan devoluciones
                  </p>
                );
              case "Devuelto":
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
