import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { getAllMapData } from '../Store/county'



const Popup = (props) => {
  const {minOtopark,maxOtopark,minYesilalan,maxYesilalan} = useSelector(state => state.county)
  const coor = useSelector(state => state.county.coordinat)
  const dispatch = useDispatch()
  const [edit,setEdit] = useState(false)
  const setName = props.setName
  const bilgiler = props.name
  const type = props.type
  const [data,setData] = useState({})
  const keys = Object.keys(bilgiler)
  const unSetList = ["__v","_id"]
  const url = process.env.REACT_APP_URL

  useEffect(()=>{
    setEdit(false)
    setData(bilgiler)
  
  },[bilgiler])

  const updateState = (e) => {
    const name = e.target.name
    const value = e.target.value
    const newData = {...data,[name]:value}
    setData(newData)
  };
  const  handleChange= async () =>{
      if(!edit ){
        setEdit(true)
      }else{
       if(type === "Otopark"){
        await axios.put(url+'otopark/updateOtopark', data)
        .then((res)=>{
          setData(res.data)
          setName(res.data)
          dispatch(getAllMapData({minOtopark,maxOtopark,minYesilalan,maxYesilalan,ilce:coor.name}))
          
          alert("Kayıt güncellendi.")
          setEdit(false)
          
        })
        .catch((err)=>{
          alert("Kayıt güncellenmedi.")
        })
       }else{
        await axios.put(url+'yesilalan/updateYesilalan', data)
        .then((res)=>{
          setData(res.data)
          setName(res.data)
          dispatch(getAllMapData({minOtopark,maxOtopark,minYesilalan,maxYesilalan,ilce:coor.name}))
          
          alert("Kayıt güncellendi.")
          setEdit(false)
          
        })
        .catch((err)=>{alert("Kayıt güncellenmedi.")})
       }
    }
  }

  return (
    
    <div className='w-full p-4'>
        <h2 className='font-semibold text-base'>{type}</h2>
        {
          (!edit ?
            keys.map((e,index)=>{
              if( e !== "__v") return(<h3  key={index}> <span>{e} : </span> {data[e]}</h3>)
            }) : <form>
              {
                keys.map((e,index)=>{
                  if(!unSetList.includes(e)) return(
                  <div key={index}>
                    <input className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' id={e} name={e} type="text" value={data[e]} onChange={(t) => updateState(t)}/>
                  </div>
                  )
                })
              }
            </form>
          
            )}
        <button onClick={()=>handleChange()} className='inline-flex float-right rounded-md border border-transparent bg-green-600 py-1 px-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 mt-2'>{!edit ? "Düzenle" : "Kaydet"}</button>

    </div>
    
  )
}


export default Popup