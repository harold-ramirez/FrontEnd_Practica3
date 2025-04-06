import "./App.css";
import { useState, useEffect } from "react";
import ServerSelect from "./components/serverSelect";
import DestinationSelect from "./components/destinationSelect";
import FlightsList from "./components/flightsList";
import axios from "axios";
import { API_BASE_URL } from "./constants";

function App() {
  const [flights, setFlights] = useState([]);
  const [airportOrigin, setAirportOrigin] = useState(0);
  const [airportDestination, setAirportDestination] = useState(0);
  const [date, setDate] = useState("");

  const fetchFlights = async () => {
    if (airportOrigin && airportDestination && date) {
      try {
        const response = await axios.get(`${API_BASE_URL}/vuelos/vuelos/filtrados`, {
          params: {
            origen: airportOrigin,
            destino: airportDestination,
            fecha: date,
          },
        });
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [airportOrigin, airportDestination, date]);

  return (
    <div className="w-full h-full p-2 flex flex-col gap-2">
      <ServerSelect />
      <div className="p-2 flex-1 flex flex-col items-center justify-center gap-2">
        <DestinationSelect setAirportOrigin={setAirportOrigin} setAirportDestination={setAirportDestination} setDate={setDate} />
        <FlightsList flights={flights} />
      </div>
    </div>
  );
}

export default App;
