import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Popup from "./Popup";

export const PopupProvider = ({ map,event,features,type }) => {
    const popupRef = useRef();
    const coordinates = features.geometry.coordinates.slice();
    const [name,setName] = useState(features.properties);

    useEffect(()=>{
        setName(features.properties)
    },[features.properties])
    
    useEffect(()=>{
            while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      const popup = new mapboxgl.Popup();
      popup.setLngLat(coordinates).setDOMContent(popupRef.current).addTo(map.current); 
    },[event])  
          
    
      return (
        <div style={{ display: "none" }}>
          <div ref={popupRef}><Popup name={name} setName={setName} type={type}/></div>
        </div>
      );
  
};

export default PopupProvider;
