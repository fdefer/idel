import { useMap } from "react-leaflet";
import { useState, useRef } from "react";
import { filterMunicipalities } from "../utils/geoUtils";
import { communitiesStyle, provinceStyle, municipalityStyle, hoverStyle, whiteStyle } from "./styles"
import GeoJSONLayers from "./GeoJSONLayers";

export default function MapEvents({ communitiesData, provincesData, municipalitiesData }) {
  const map = useMap();
  const [filteredProvinces, setFilteredProvinces] = useState(null);
  const [filteredMunicipalities, setFilteredMunicipalities] = useState(null);
  const clickedCommunity = useRef(null);
  const clickedProvince = useRef(null);

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
  const onMouseOutMunicipality = (e) => e.target.setStyle(municipalityStyle);

  function resetCommunityColor(clickedLayer)  {
    if (clickedCommunity.current !== null) {
      clickedCommunity.current.setStyle(communitiesStyle);
    }
    clickedCommunity.current = clickedLayer;
    clickedLayer.setStyle(whiteStyle)
  }

  function resetProvinceColor(clickedLayer)  {
    if (clickedProvince.current !== null) {
      clickedProvince.current.setStyle(provinceStyle);
    }
    clickedProvince.current = clickedLayer;
    clickedLayer.setStyle(whiteStyle)
  }
  
  const onClickCommunities = (e) => {
    setFilteredMunicipalities(null);
    const clickedLayer = e.target;

    resetCommunityColor(clickedLayer);

    const bounds = clickedLayer.getBounds();
    map.fitBounds(bounds);

    const filtered = filterMunicipalities(provincesData, clickedLayer.feature.geometry);
    setFilteredProvinces(filtered);
  };


  const onClickProvince = (e) => {
    const clickedLayer = e.target;

    resetProvinceColor(clickedLayer);

    const bounds = clickedLayer.getBounds();
    map.fitBounds(bounds);

    const filtered = filterMunicipalities(municipalitiesData, clickedLayer.feature.geometry);
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