import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Transactions from "./Components/Transactions";
import Home from "./Components/Home";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/add" element={<Transactions />} />
    </Routes>
  </BrowserRouter>
);

export default App;
