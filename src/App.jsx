import "./App.css";
import ServerSelect from "./components/serverSelect";
import DestinationSelect from "./components/destinationSelect";
import FlightsList from "./components/flightsList";

function App() {
  return (
    <div className="w-full h-full p-2 flex flex-col gap-2">
      <ServerSelect />
      <div className="p-2 flex-1 flex flex-col items-center justify-center gap-2">
        <DestinationSelect />
        <FlightsList origin={"Sao Paulo, Brasil"} destination={"La Paz, Bolivia"} />
      </div>
    </div>
  );
}

export default App;
