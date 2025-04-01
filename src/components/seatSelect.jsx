import AirplaneMap1 from "./airplaneMaps/airplaneMap1";

export default function SeatSelect({ onClose }) {
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
        <div className="flex justify-around">
          <span className="flex gap-1 items-center justify-center">
            <label htmlFor="">Clase Ejecutiva:</label>$
            <input
              type="text"
              readOnly
              value={20}
              className=" w-1/5 text-left"
            />
          </span>
          <span className="flex gap-1 items-center justify-center">
            <label htmlFor="">Clase Turística:</label>$
            <input
              type="text"
              readOnly
              value={20}
              className="w-1/5 text-left"
            />
          </span>
          <button onClick={onClose} className="text-white">
            X
          </button>
        </div>
        <p className="text-left">Seleccione su Asiento...</p>

        <div className="p-4 flex-1 flex flex-col justify-center">
          <AirplaneMap1 />
        </div>
      </div>
    </div>
  );
}
