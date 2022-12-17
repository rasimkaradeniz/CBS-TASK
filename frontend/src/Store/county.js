import {createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const url = process.env.REACT_APP_URL

export const getAllMapData = createAsyncThunk(
    'getAllMapData',
    async ({minOtopark,maxOtopark,minYesilalan,maxYesilalan,ilce}) => {
        if(ilce === "Tüm İlçeler"){ilce = null}
        const yesilAlanReq = axios.get(url+'yesilalan/yesilalans',{params : {min:minYesilalan,max:maxYesilalan,ilce:ilce}});
        const otoparkReq = axios.get(url+"otopark/otoparks",{params : {min:minOtopark,max:maxOtopark,ilce:ilce}});
        const data = axios.all([yesilAlanReq, otoparkReq]).then(axios.spread((...responses) => {
          const yesilAlanData = responses[0].data
          const otoparkReq = responses[1].data
          const fullData = yesilAlanData.concat(otoparkReq)
          return fullData
        }))
        return data
    }
)

const initialState = {
    coordinat:{
    },
    county:[
        {
            "name" : "Tüm İlçeler",
            "coordinates" : [28.979530, 41.015137]
        },
        {
            "name" : "Sultanbeyli",
            "coordinates" : [29.262008000000037,40.968423]
        },
        {
            "name" : "Üsküdar",
            "coordinates" : [29.032669,41.032921]
        },
        {
            "name" : "Çekmeköy",
            "coordinates" : [29.18000000,41.04000000]
        },
        {
            "name" : "Kadıköy",
            "coordinates" : [29.035333192,40.985496058]
        },{
            "name" : "Kartal",
            "coordinates" : [29.1833326,40.83333]
        },
        {
            "name" : "Beşiktaş",
            "coordinates" : [29.002,41.044 ]
        },
        {
            "name" : "Fatih",
            "coordinates" : [28.9333296,41.0166666 ]
        },{
            "name" : "Avcılar",
            "coordinates" : [28.7186,41.02355 ]
        },
        {
            "name" : "Şişli",
            "coordinates" : [28.98717,41.06046 ]
        },
        {
            "name" : "Bakırköy",
            "coordinates" : [28.874323,40.979874]
        }

    ],
    mapData:{
        loading:false,
        data:[],
        error: ""
    },
    minOtopark:1,
    maxOtopark:100,
    minYesilalan:1,
    maxYesilalan:100
}



export const countySlice = createSlice({
    name:"country",
    initialState,
    reducers:{
        newCoordinat:(state,action)=>{
                state.coordinat = {}
                
                state.coordinat = action.payload
        },
        newValue:(state,action)=>{
            
            const name = action.payload.name
            const value = action.payload.value
            state[name] = value
        },
        updateMapData:(state,action)=>{
                const id = action.payload._id
                const LONGITUDE = action.payload.LONGITUDE
                const data = state.mapData.data
                const findIndex = data.findIndex(x=> x.properties._id === id && x.properties.LONGITUDE === LONGITUDE)
                state.mapData.data[findIndex].properties = action.payload

        }
        
    },
    extraReducers : (builder) =>{
        builder.addCase(getAllMapData.pending,( state,action)=>{
            state.mapData.loading = true
            state.mapData.error =  ""
          })
          builder.addCase(getAllMapData.fulfilled, (state,action)=>{
            state.mapData.data = action.payload
            state.mapData.loading = false
          })
          builder.addCase(getAllMapData.rejected,(state,action)=>{
            state.mapData.loading = false
            state.mapData.error = "Veriler Alınamadı"
      
          })
    }
   
    
})

export const { newCoordinat,newValue,updateMapData} = countySlice.actions


export default countySlice.reducer
