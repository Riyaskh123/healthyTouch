
import React, { useState,useEffect } from 'react'
import Content from './content'
import Tools from './tools'
import { Stack } from '@mui/material'
import AdsForm from './AdsForm'
import {getAllAds,deleteAd,createAds} from '../../../utils/Service'



export default function Index() {
  const [formOpen, setFormOpen] = useState(false)
  const [adsData, setAdsData] = useState([])
const getAds = () =>{
  getAllAds().then((res)=>{
    console.log("geting--------------------------------------------------")
    console.log(res.ads)
    setAdsData(res.ads)
   }).catch((err) => {
  console.log(err)
   })
}
  useEffect(() => {
    getAds()
  }, [])
  return (
    <Stack direction={'column'} gap={2}>
      <AdsForm open={formOpen} getAds={getAds} createAds={createAds} onClose={() => { setFormOpen(false) }} />
      <Tools buttonClick={()=>setFormOpen(true)}/>
      <Content deleteAd={deleteAd} data={adsData} updateData={getAds}/>
    </Stack>
  )
}
