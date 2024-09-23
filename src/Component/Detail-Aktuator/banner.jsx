import React from "react";
import Card from "./card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Banner = () => {
  const position = [51.505, -0.09];

  return (
    <div className="p-10 space-y-4">
      <Card
        title="Aktuator 1"
        description="Details about Aktuator 1."
        date="2024-09-11"
        time="11:21:05"
        buttonLabel="Lihat histori..."
        content={
          <div className="h-96 w-full">
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '6px'}}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>Example location</Popup>
              </Marker>
            </MapContainer>
          </div>
        }
      />
    </div>
  );
};

export default Banner;
