"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import MapEvents from "./MapEvents";
import { useEffect, useState } from "react";

export default function Map() {
  const [provincesData, setProvincesData] = useState(null);
  const [municipalitiesData, setMunicipalitiesData] = useState(null);

  useEffect(() => {
    const fetchProvincesData = async () => {
      const response = await fetch("/data/spain_provinces.geojson");
      const data = await response.json();
      setProvincesData(data);
    };

    const fetchMunicipalitiesData = async () => {
      const response = await fetch("/data/spain_municipalities.json");
      const data = await response.json();
      setMunicipalitiesData(data);
    };

    fetchProvincesData();
    fetchMunicipalitiesData();
  }, []);

  if (provincesData && municipalitiesData) {

    return (
      <LeafletMap
        preferCanvas={true}
        center={[40, -3.7492]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri &mdash; Source: Esri'
        />
        <MapEvents
          provincesData={provincesData}
          municipalitiesData={municipalitiesData}
        />
      </LeafletMap>
    );
  }
}

