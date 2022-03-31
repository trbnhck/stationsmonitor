//import {icon} from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Circle,
  Popup,
  CircleMarker,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

export default function MapComponent({latitude, longitude, lineOpts}) {
  /*const myIcon = icon({
    iconUrl: '/subway.svg',
    iconSize: [32, 32],
    iconAnchor: [32, 16],
    popupAnchor: [0, 0],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });
  
      <ImageOverlay
        bounds={[
          [52.6697240587, 13.0882097323],
          [52.3418234221, 13.7606105539],
        ]}
        url="/map.svg"
      />
  */
  //TODO: fix recenter on rerender

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={14}
      scrollWheelZoom={true}
      touchZoom={false}
      doubleClickZoom={false}
      trackResize={true}
      style={{height: '100%', width: '100%'}}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <Marker
        /*icon={myIcon}*/ position={[latitude, longitude]}
        draggable={false}
      ></Marker>
      <Polyline
        color={lineOpts.color}
        weight={4}
        positions={lineOpts.stops.map(stop => {
          return [stop.stop.location.latitude, stop.stop.location.longitude];
        })}
      />
      {lineOpts.stops.map(stop => {
        return (
          <>
            <CircleMarker
              center={[
                stop.stop.location.latitude,
                stop.stop.location.longitude,
              ]}
              pathOptions={{color: 'brown', fillOpacity: 1}}
              radius={5}
            >
              <Popup>{stop.stop.name}</Popup>
            </CircleMarker>
          </>
        );
      })}
    </MapContainer>
  );
}
