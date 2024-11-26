
import { GeoJSON } from "react-leaflet";
import { provinceStyle, municipalityStyle,} from "./styles";

export default function GeoJSONLayers({ provincesData, filteredMunicipalities, onEachProvince, onEachMunicipality }) {
  return (
    <>
      {provincesData && (
        <GeoJSON
          style={provinceStyle}
          data={provincesData}
          onEachFeature={onEachProvince}
        />
      )}
      {filteredMunicipalities && (
        <GeoJSON
          key={JSON.stringify(filteredMunicipalities)}
          style={municipalityStyle}
          data={filteredMunicipalities}
          onEachFeature={onEachMunicipality}
        />
      )}
    </>
  );
}