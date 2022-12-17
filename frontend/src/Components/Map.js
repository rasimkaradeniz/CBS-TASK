import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import yesilalan from "../Images/yesilalan.png"
import otopark from "../Images/otopark.png"
import { createRoot } from "react-dom/client";
import { useSelector,useDispatch } from "react-redux";
import {getAllMapData} from  "../Store/county"
import PopupProvider from "./PopupProvider";




function CreateMap() {
  
  const [zoom, setZoom] = useState(8);
  const [first,setFirst] = useState(true);
  const [popup,setPopup] = useState(false)
  const [event,setEvent] = useState([]);
  const [features,setFeatures] = useState([]);
  const [type,setType] = useState("")
  mapboxgl.accessToken =process.env.REACT_APP_MAPBOX_API_KEY;
  const mapContainer = useRef(null);
  const map = useRef(null)
  const coor = useSelector(state => state.county.coordinat)
  const mapData = useSelector (state => state.county.mapData)
  const {minOtopark,maxOtopark,minYesilalan,maxYesilalan} = useSelector(state => state.county)
  const dispatch = useDispatch()
  const images =[
    {imageUrl: yesilalan, name: 'yesilalan-marker'},
    {imageUrl: otopark, name: 'otopark-marker'}]
  const createCluster = (data) =>{
    map.current.addSource('alanlar', {
      type: 'geojson',        
      data: {
        type: "FeatureCollection",
        features: [],
      },
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50
    });
    const geojsonSource = map.current.getSource('alanlar');
    geojsonSource.setData({
      "type": "FeatureCollection",
      "features": data

    })

    map.current.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'alanlar',
      filter: ['has', 'point_count'],
      paint: {
      'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              100,
              '#f1f075',
              750,
              '#f28cb1'],
      'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40]
      }
    })
    map.current.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'alanlar',
          filter: ['has', 'point_count'],
          layout: {
          'text-field': '{point_count_abbreviated}',
          'text-size': 12
          }
    })
    map.current.addLayer({
          id: 'yesilalan',
          type: 'symbol',
          source: 'alanlar',
          filter: ["all",['!has', 'point_count'],['!has', 'PARK_NAME']],
          layout: {
            "icon-image": "yesilalan-marker",
            "icon-size": 0.3
        },
    
    })
    map.current.addLayer({
        id: 'otopark',
        type: 'symbol',
        source: 'alanlar',
        filter: ["all",['!has', 'point_count'],['has', 'PARK_NAME']],
        layout: {
          "icon-image": "otopark-marker",
          "icon-size": 0.3
      },
    
    
    })    
    
      return () => map.current.remove();
  }

  useEffect(() => {
     map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [28.979530, 41.015137],
      zoom: zoom,
    });
    map.current.on('style.load', () => {
      map.current.setFog({});
    });
      
    map.current.on("load",function(){
      images.map(img =>{
        map.current.loadImage(
          img.imageUrl,function (error,image) {
            if (error) throw error;
            map.current.addImage(img.name, image);
        })
      })
  })
  map.current.on('click', 'clusters', (e) => {
    const features = map.current.queryRenderedFeatures(e.point, {
                      layers: ['clusters']
    });
    const clusterId = features[0].properties.cluster_id;
    map.current.getSource('alanlar').getClusterExpansionZoom(clusterId,(err, zoom) => {
                      if (err) return;
                        map.current.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                  }
    );
  });


    map.current.on("click","yesilalan",(e)=>{
    map.current.flyTo({
    center: e.features[0].geometry.coordinates,
    zoom:14
    });
      setPopup(true)
      setEvent(e)
      const name = e.features[0];
      setFeatures(name)
      setType("Yeşil Alan ve Parklar")
          
    })
    map.current.on("click","otopark",(e)=>{
      map.current.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom:14
      });
      setPopup(true)
      setEvent(e)
      const name = e.features[0];
      setFeatures(name)
      setType("Otopark")
      
          
    })

    map.current.on('mouseenter', 'clusters', () => {
    map.current.getCanvas().style.cursor = 'pointer';
    });
    map.current.on('mouseleave', 'clusters', () => {
    map.current.getCanvas().style.cursor = '';
    });  
    dispatch(getAllMapData({minOtopark,maxOtopark,minYesilalan,maxYesilalan}))
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
   

  },[]);

  useEffect(()=>{
    

    if(mapData.data.length > 0){
      
      if(first){
        createCluster(mapData.data)
        setFirst(false)
      }else{
        map.current.removeLayer("clusters")
        map.current.removeLayer("cluster-count")
        map.current.removeLayer("yesilalan")
        map.current.removeLayer("otopark")
        map.current.removeSource("alanlar")
        createCluster(mapData.data)
      }
      

      

    }
    
  },[mapData])

 
  useEffect(()=>{
    if(Object.keys(coor).length >0){
      dispatch(getAllMapData({minOtopark,maxOtopark,minYesilalan,maxYesilalan,ilce:coor.name}))
      if(coor.name == "Tüm İlçeler"){
        map.current.flyTo({
          center: [28.979530, 41.015137],
          zoom:8
        })
      }else{
        map.current.flyTo({
          center: coor.coordinates,
          zoom:12
        })
      }
    }
  },[coor])
  
  
  return(
    <>
      {(popup) &&( <PopupProvider map={map} event={event} features={features} type={type} /> )}
      <div ref={mapContainer} className="map-container" />
    </>
  )
}

export default CreateMap;
