"use client";


import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer } from "react-leaflet";

export default function Map() {
  return (
    <MapContainer
      preferCanvas={true}
      center={[40, -3.7492]}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100wh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

