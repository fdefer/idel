import { whiteStyle, communitiesStyle, provinceStyle } from "../styles/styles";
import { filterFeaturesByGeometry } from "./geoUtils";

export function resetCommunityColor(clickedCommunityRef, clickedLayer) {
  if (clickedCommunityRef.current !== null) {
    clickedCommunityRef.current.setStyle(communitiesStyle);
  }
  clickedCommunityRef.current = clickedLayer;
  clickedLayer.setStyle(whiteStyle);
}

export function resetProvinceColor(clickedProvinceRef, clickedLayer) {
  if (clickedProvinceRef.current !== null) {
    clickedProvinceRef.current.setStyle(provinceStyle);
  }
  clickedProvinceRef.current = clickedLayer;
  clickedLayer.setStyle(whiteStyle);
}


export function filterAndFitBounds(map, clickedLayer, data) {
  const bounds = clickedLayer.getBounds();
  map.fitBounds(bounds);

  return filterFeaturesByGeometry(data, clickedLayer.feature.geometry);
}