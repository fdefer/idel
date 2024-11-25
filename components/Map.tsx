"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import * as turf from "@turf/turf";

export default function Map() {
  const [provincesData, setProvincesData] = useState(null);
  const [municipalitiesData, setMunicipalitiesData] = useState(null);
  const [showMunicipalities, setShowMunicipalities] = useState(false);
  const [filteredMunicipalities, setFilteredMunicipalities] = useState(null);
  const clickedProvince = useRef<L.Polygon | null>(null);

  // Fetch the province and municipality data on component mount
  useEffect(() => {
    const fetchProvincesData = async () => {
      const response = await fetch("/data/spain-provinces.geojson");
      const data = await response.json();
      setProvincesData(data);
    };

    const fetchMunicipalitiesData = async () => {
      const response = await fetch("/data/municipalities.json");
      const data = await response.json();
      setMunicipalitiesData(data);
    };

    fetchProvincesData();
    fetchMunicipalitiesData();
  }, []);

  // Map-specific logic such as zooming and fitting bounds
  const MapEvents = () => {
    const map = useMap(); // Get the map reference from the context

    const whiteStyle = {
      color: "#9b4dca",
      weight: 3,
      fillColor: "white",
      fillOpacity: 0.8,
    };

    const hoverStyle = {
      fillColor: "#f0e68c",
      fillOpacity: 0.4,
    };

    const municipalityStyle = {
      color: "#9b4dca",
      weight: 3,
      fillColor: "#007bff",
      fillOpacity: 0.4,
    };

    const onMouseOver = (e) => {
      if (e.target !== clickedProvince.current) {
        e.target.setStyle(hoverStyle);
      }
    };

    const onMouseOut = (e) => {
      e.target.setStyle(whiteStyle);
    };

    const onClick = (e) => {
      const clickedLayer = e.target;

      clickedProvince.current = clickedLayer;
      clickedLayer.setStyle(whiteStyle);

      const bounds = clickedLayer.getBounds();
      map.fitBounds(bounds);

      if (municipalitiesData) {
        const provincePolygon = turf.polygon(clickedProvince.current.feature.geometry.coordinates[0]);
        const filtered = {
          type: "FeatureCollection",
          features: municipalitiesData.features.filter((municipality) => {
            if (!municipality.geometry || !municipality.geometry.coordinates) return false;

            const centroid = turf.centroid(municipality); // Get the centroid of the municipality
            return turf.booleanPointInPolygon(centroid, provincePolygon); // Check if within province
          }),
        }
        setFilteredMunicipalities(filtered);
      }
    };

    const onEachProvince = (feature, layer) => {
      layer.on({
        mouseover: onMouseOver,
        mouseout: onMouseOut,
        click: onClick,
      });
    };
  
    const onEachMunicipality = (feature, layer) => {
      layer.on({
        //mouseover: onMouseOver,
        //mouseout: onMouseOut,
        //click: changeStyle(layer),
      });
    };

    return (
      <>
        <GeoJSON
          style={whiteStyle}
          data={provincesData}
          onEachFeature={onEachProvince}
        />
        {filteredMunicipalities && (
          <GeoJSON
            style={municipalityStyle}
            data={filteredMunicipalities}
            onEachFeature={onEachMunicipality}
          />
        )}
      </>
    );
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
      <MapEvents />
    </MapContainer>
  );
}
