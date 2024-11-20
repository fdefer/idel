"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState, useRef } from "react";

export default function Map() {
  const [provincesData, setProvincesData] = useState(null);
  const clickedProvince = useRef<L.Polygon | null>(null);

  useEffect(() => {
    const fetchProvincesData = async () => {
      const response = await fetch("/data/spain-provinces.geojson");
      const data = await response.json();
      setProvincesData(data);
    };

    fetchProvincesData();
  }, []);

  const defaultStyle = {
    color: "#9b4dca",
    weight: 3,
    fillColor: "#8cf5a3",
    fillOpacity: 0.8,
  };

  const hoverStyle = {
    fillColor: "#f0e68c",
    fillOpacity: 0.4,
  };

  const clickedStyle = {
    fillColor: "#f0e68c",
    fillOpacity: 0.9,
  };

  const onMouseOver = (e) => {
    if (e.target !== clickedProvince.current) {
      e.target.setStyle(hoverStyle);
    }
  };

  const onMouseOut = (e) => {
    if (e.target === clickedProvince.current) {
      e.target.setStyle(clickedStyle);
    } else {
      e.target.setStyle(defaultStyle);
    }
  };

  const onClick = (e) => {
    const clickedLayer = e.target;
  
    if (clickedProvince.current === clickedLayer) {
      clickedLayer.setStyle(defaultStyle);
      clickedProvince.current = null;
      return;
    }
  
    if (clickedProvince.current) {
      clickedProvince.current.setStyle(defaultStyle);
    }
  
    clickedProvince.current = clickedLayer;
    clickedLayer.setStyle(clickedStyle);
  };

  const onEachProvince = (feature, layer) => {
    layer.on({
      mouseover: onMouseOver,
      mouseout: onMouseOut,
      click: onClick,
    });
  };

  return (
    <MapContainer
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

      {provincesData && (
        <GeoJSON
          style={defaultStyle}
          data={provincesData}
          onEachFeature={onEachProvince}
        />
      )}
    </MapContainer>
  );
}

