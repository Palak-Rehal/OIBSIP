import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#1F2937]">

      <Navbar />
      <Home />
      <Footer />

    </div>
  );
}

export default App;