import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar /> {/* NavBar 추가 */}
      <Router />
    </BrowserRouter>
  );
}

export default App;
