import Container from "./components/Container";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex h-screen overflow-y-hidden bg-white">
      <Sidebar />

      <Container />
    </div>
  );
}

export default App;
