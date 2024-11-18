"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";

export default function Map() {
  const [provincesData, setProvincesData] = useState(null);

  useEffect(() => {
    const fetchProvincesData = async () => {
      const response = await fetch("/data/spain-provinces.geojson");
      const data = await response.json();
      setProvincesData(data);
    };

    fetchProvincesData();
  }, []);

  return (
    <MapContainer
      preferCanvas={true}
      center={[40, -3.7492]}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {provincesData && <GeoJSON data={provincesData} />}
    </MapContainer>
  );
}

