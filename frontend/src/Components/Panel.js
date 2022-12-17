import React from 'react'
import yesilalan from "../Images/yesilalan.png"
import otopark from "../Images/otopark.png"
import { useDispatch, useSelector } from 'react-redux'
import { newCoordinat,newValue } from '../Store/county'
import {getAllMapData} from  "../Store/county"

const Panel = () => {
      const counties = useSelector(state => state.county.county)
      const {name} = useSelector(state => state.county.coordinat)
      const dispatch = useDispatch()
      const {minOtopark,maxOtopark,minYesilalan,maxYesilalan} = useSelector(state => state.county)
      const handleChange = (e)=>{
          let coordinat = counties[e.target.value]
          if(coordinat){
            dispatch(newCoordinat(coordinat))
          }
      }
      const valueChange = (e) =>{
        const name = e.target.name
        const value = e.target.value
        dispatch(newValue({name,value}))
      }
      const onFilter = () =>{
        dispatch(getAllMapData({minOtopark,maxOtopark,minYesilalan,maxYesilalan,ilce:name}))
      }
  return (
    <div className='w-[400px] h-[600px] absolute top-0 left-0 p-3 rounded bg-white'>
        <div>
            <h3 className='font-semibold text-base'>İcon Set</h3>
            <ul className='mt-2 space-y-4'>
                <li className='flex items-center text-center gap-3'>
                    <img src={yesilalan} className='w-6 h-6 '/>
                    <h4 className='font-semibold text-base'>Parklar ve Yeşil Alanlar </h4>
                </li>
                <li className='flex items-center text-center gap-3'>
                    <img src={otopark} className='w-6 h-6 '/>
                    <h4 className='font-semibold text-base'>Otoparklar</h4>
                </li>
            </ul>
        </div>
        <div className='mt-2'>
            <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="font-semibold text-base">
                      İlçeleri Filtrele
                      </label>
                      <select id="country" name="country" onChange={(e)=>{handleChange(e)}}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        
                        { counties.map((county,key)=>{
                            return (<option key={key} value={key}>{county.name}</option>)
                            })
                        }
                      </select>
                    </div>
        </div>
        <div className='mt-2 '>
          <h3>Yeşil Alan ve Parklar Data Aralığı (3626 Veri)</h3>
          <div className='grid grid-cols-2 gap-4'>
            <input className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' onChange={(e)=>{valueChange(e)}} name='minYesilalan' type="number" value={minYesilalan} />
            <input className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' onChange={(e)=>{valueChange(e)}} name="maxYesilalan" type="number" maxLength={3626}  value={maxYesilalan}/>
          </div>              
        </div>
        <div className='mt-2 '>
          <h3>Otoparklar Data Aralığı (708 Veri)</h3>
          <div className='grid grid-cols-2 gap-4'>
            <input className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' onChange={(e)=>{valueChange(e)}} name='minOtopark' type="number" value={minOtopark} />
            <input className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' onChange={(e)=>{valueChange(e)}} name="maxOtopark" type="number" maxLength={708}  value={maxOtopark}/>
          </div>              
        </div>
        <button type='button' onClick={()=>onFilter()} className='inline-flex float-right rounded-md border border-transparent bg-green-600 py-1 px-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 mt-2'>Filtrele</button>
        

    </div>
  )
}

export default Panel