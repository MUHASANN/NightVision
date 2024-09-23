// INI ADALAH ROUTER

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Component/Landing/Navbar/navbar";
import Banner from "./Component/Landing/Banner/banner";

import Perangkaty from "./Page/perangkat";

import Detail from "./Page/detail";
import DetailSensor from "./Page/Detail/Detail-sensor";
import DetailAktuator from "./Page/Detail/Detail-Aktuatkor";

import Banfi from "./Page/Banfi";
import Peta from "./Page/Peta";
import Historipage from "./Page/Informasi-histori";

import Historypage from "./Page/history-1";
import HistoryAktuator from "./Page/History/History-Aktuator";
import HistorySensor from "./Page/History/History-Sensor";


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
            <Route path="/detail-perangkat/Sensor/:guid_device" element={<DetailSensor />} />
            <Route path="/detail-perangkat/Aktuator/:guid_device" element={<DetailAktuator />}/>

            <Route path="/history-perangkat/Camera/:guid_device" element={<Historypage />} />
            <Route path="/history-perangkat/Aktuator/:guid_device" element={<HistoryAktuator />} />
            <Route path="/history-perangkat/Sensor/:guid_device" element={<HistorySensor />} />
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