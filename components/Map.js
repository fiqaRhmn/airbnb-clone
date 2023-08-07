import ReactMapGl, {Marker, Popup} from 'react-map-gl';
import { useState } from 'react';
import { getCenter } from 'geolib';


function Map({ searchResult }) {
    const [selectedLocation, setSelectedLocation] = useState({});

    const coordinate = searchResult.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    const center = getCenter(coordinate); 

    const [viewport, setViewport] = useState({
        width:'100%',
        height:'100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });

  return (
    <ReactMapGl
        mapStyle="mapbox://styles/afqhrhmn/clkw976vv004701qs1qcf7v2i"
        mapboxAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange = {(nextViewport) => setViewport(nextViewport)}
    >
        {searchResult.map((result) => (
           
            <div key={result.long} >
                <Marker
                    longitude={result.long}
                    latitude={result.lat}
                     offsetTop={-20}
                     offsetLeft={-10}
                >
                     <p
                     role="img"
                     onClick = {() => selectedLocation(result) }
                     className='cursor-pointer text-2xl animate-bounce'
                     aria-label="push-pin"
                     >
                        📌
                    </p>
                 </Marker>

                 {/* pop up of push pin */}
                 {selectedLocation.long === result.long ? (
                    <Popup 
                        onClose={() => setSelectedLocation({})}
                        closeOnClick={true}
                        latitude={result.lat}
                        longitude={result.long}
                    >
                        {result.title}
                    </Popup>
                 ):(
                    false
                 )}
            </div>
        ))}
    </ReactMapGl>
  );
}

export default Map
