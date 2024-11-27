import { useMap } from "react-leaflet";
import { useState } from "react";
import { filterMunicipalities } from "../utils/geoUtils";
import { provinceStyle, municipalityStyle, hoverStyle } from "./styles"
import GeoJSONLayers from "./GeoJSONLayers";

export default function MapEvents({ provincesData, municipalitiesData }) {
  const map = useMap();
  const [filteredMunicipalities, setFilteredMunicipalities] = useState(null);

  const onMouseOver = (e) => e.target.setStyle(hoverStyle);
  const onMouseOutProvince = (e) => e.target.setStyle(provinceStyle);
  const onMouseOutMunicipality = (e) => e.target.setStyle(municipalityStyle);

  const onClickProvince = (e) => {
    const clickedLayer = e.target;

    const bounds = clickedLayer.getBounds();
    map.fitBounds(bounds);

    const filtered = filterMunicipalities(municipalitiesData, clickedLayer.feature.geometry);
    setFilteredMunicipalities(filtered);
  };

  const onEachProvince = (feature, layer) => {
    layer.on({
      mouseover: onMouseOver,
      mouseout: onMouseOutProvince,
      click: onClickProvince,
    });
  };

  const onEachMunicipality = (feature, layer) => {
    layer.on({
      mouseover: onMouseOver,
      mouseout: onMouseOutMunicipality,
    });
  };

  return (
    <>
      <GeoJSONLayers
        provincesData={provincesData}
        filteredMunicipalities={filteredMunicipalities}
        onEachProvince={onEachProvince}
        onEachMunicipality={onEachMunicipality}
      />
    </>
  );
}