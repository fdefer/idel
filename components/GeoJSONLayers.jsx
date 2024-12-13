
import { GeoJSON } from "react-leaflet";
import { communitiesStyle, provinceStyle, municipalityStyle,} from "../styles/styles";

export default function GeoJSONLayers({ communitiesData, filteredProvinces, filteredMunicipalities, onEachCommunity, onEachProvince, onEachMunicipality }) {
  return (
    <>
      {communitiesData && (
        <GeoJSON
          style={communitiesStyle}
          data={communitiesData}
          onEachFeature={onEachCommunity}
        />
      )}
      {filteredProvinces && (
        <GeoJSON
        key={JSON.stringify(filteredProvinces)}
          style={provinceStyle}
          data={filteredProvinces}
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