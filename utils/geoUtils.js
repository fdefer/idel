import * as turf from "@turf/turf";

export const filterFeaturesByGeometry = (featuresCollection, geometry) => {
  const polygon = turf.polygon(geometry.coordinates[0]);
  return {
    type: "FeatureCollection",
    features: featuresCollection.features.filter((feature) => {
      if (!feature.geometry || !feature.geometry.coordinates) return false;
      const centroid = turf.centroid(feature);
      return turf.booleanPointInPolygon(centroid, polygon);
    }),
  };
};