import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "../navigation/Navigation";
import Home from "../../pages/home/Home";
import CoinInfo from "../../pages/coinInfo/CoinInfo";

import { UserAuthProvider } from "../../context/userContext";

import "./app.css";

function App() {
  const [searchString, setSearchString] = useState("");

  return (
    <UserAuthProvider>
      <div className="App">
        <Navigation setSearch={setSearchString} />

        <Routes>
          <Route path="/" element={<Home search={searchString} />} />
          <Route path="coins/:id" element={<CoinInfo />} />
        </Routes>
      </div>
    </UserAuthProvider>
  );
}

export default App;
