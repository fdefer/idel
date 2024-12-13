import { useMap } from "react-leaflet";
import { useState, useRef } from "react";
import { resetCommunityColor, resetProvinceColor, filterAndFitBounds } from "../utils/mapHelpers";
import { communitiesStyle, provinceStyle, municipalityStyle, hoverStyle } from "../styles/styles"
import GeoJSONLayers from "./GeoJSONLayers";

export default function MapEvents({ communitiesData, provincesData, municipalitiesData }) {
  const map = useMap();
  const [filteredProvinces, setFilteredProvinces] = useState(null);
  const [filteredMunicipalities, setFilteredMunicipalities] = useState(null);
  const clickedCommunity = useRef(null);
  const clickedProvince = useRef(null);

  const onMouseOutMunicipality = (e) => e.target.setStyle(municipalityStyle);
  const onMouseOver = (e) => e.target.setStyle(hoverStyle);
  const onMouseOutCommunity = (e) => {
    if (clickedCommunity.current !== e.target) {
      e.target.setStyle(communitiesStyle);
    }
  };
  const onMouseOutProvince = (e) => {
    if (clickedProvince.current !== e.target) {
      e.target.setStyle(provinceStyle);
    }
  };
  
  const onClickCommunities = (e) => {
    setFilteredMunicipalities(null);
    const clickedLayer = e.target;
    resetCommunityColor(clickedCommunity, clickedLayer);
    const filtered = filterAndFitBounds(map, clickedLayer, provincesData);
    setFilteredProvinces(filtered);
  };


  const onClickProvince = (e) => {
    const clickedLayer = e.target;
    resetProvinceColor(clickedProvince, clickedLayer);
    const filtered = filterAndFitBounds(map, clickedLayer, municipalitiesData);
    setFilteredMunicipalities(filtered);
  };

  const onEachCommunity = (feature, layer) => {
    layer.on({
      mouseover: onMouseOver,
      mouseout: onMouseOutCommunity,
      click: onClickCommunities,
    });
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
        communitiesData={communitiesData}
        filteredProvinces={filteredProvinces}
        filteredMunicipalities={filteredMunicipalities}
        onEachCommunity={onEachCommunity}
        onEachProvince={onEachProvince}
        onEachMunicipality={onEachMunicipality}
      />
    </>
  );
}