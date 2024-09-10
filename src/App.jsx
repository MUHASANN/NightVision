// INI ADALAH ROUTER

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Component/Landing/Navbar/navbar";
import Banner from "./Component/Landing/Banner/banner";

import Perangkaty from "./Page/perangkat";
import Detail from "./Page/detail";
import Historypage from "./Page/history-1";
import Banfi from "./Page/Banfi";
import Peta from "./Page/Peta";
import Historipage from "./Page/Informasi-histori";

function App() {
  return (
    <div className="flex flex-row justify-center w-full bg-gray-200">
       <div className="w-full h-[640px]">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perangkat" element={<Perangkaty />}/>
            <Route path="/Informasi" element={<Banfi />}/>
            <Route path="/Peta-Lokasi" element={<Peta />}/>
            <Route path="/Histori-infromasi" element={<Historipage />}/>
            <Route path="/detail-perangkat/Camera/:guid_device" element={<Detail />} />
            <Route path="/history-perangkat/Camera/:guid_device" element={<Historypage />} />
            <Route path="/history-perangkat/:guid_device" element={<Historypage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

function Home() {
  return(
    <div>
      <Navbar />
      <Banner />
    </div>
  );
}

export default App;