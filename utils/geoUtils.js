import * as turf from "@turf/turf";

export const filterMunicipalities = (municipalities, provinceGeometry) => {
  const provincePolygon = turf.polygon(provinceGeometry.coordinates[0]);
  return {
    type: "FeatureCollection",
    features: municipalities.features.filter((municipality) => {
      if (!municipality.geometry || !municipality.geometry.coordinates) return false;
      const centroid = turf.centroid(municipality);
      return turf.booleanPointInPolygon(centroid, provincePolygon);
    }),
  };
};