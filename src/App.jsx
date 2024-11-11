import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar/navbar";
import Banner from "./Component/Dashboard/Banner/banner";

import DInformasi from "./Page/Dashboard/Dashboard-Informasi";
import DPerangkat from "./Page/Dashboard/Dashboard-Perangkat";

import DetailCamera from "./Page/Detail/Detail-camera";
import DetailSensor from "./Page/Detail/Detail-sensor";
import DetailAktuator from "./Page/Detail/Detail-Aktuatkor";
import PetaInfo from "./Page/Detail/Peta-Informasi";

import HistoryCamera from "./Page/History/History-Camera";
import HistoryInfo from "./Page/History/History-Informasi";
import HistoryAktuator from "./Page/History/History-Aktuator";
import HistorySensor from "./Page/History/History-Sensor";

function App() {
  return (
    <div className="m-0 p-0 bg-white">
      <div  className="bg-slate-100">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perangkat" element={<DPerangkat />} />
            <Route path="/Informasi" element={<DInformasi />} />
            <Route path="/Peta-Lokasi" element={<PetaInfo />} />
            <Route path="/history" element={<HistoryInfo />} />
            <Route path="/detail-perangkat/Camera/:guid_device" element={<DetailCamera />} />
            <Route path="/detail-perangkat/Sensor/:guid_device" element={<DetailSensor />} />
            <Route path="/detail-perangkat/Aktuator/:guid_device" element={<DetailAktuator />} />
            <Route path="/history-perangkat/Camera/:guid_device" element={<HistoryCamera />} />
            <Route path="/history-perangkat/Aktuator/:guid_device" element={<HistoryAktuator />} />
            <Route path="/history-perangkat/Sensor/:guid_device" element={<HistorySensor />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="bg-slate-100 w-full p-0 m-0">
      <Navbar />
      <Banner />
    </div>
  );
}

export default App;
