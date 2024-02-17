
import React, { useState,useEffect } from 'react'
import Content from './content'
import Tools from './tools'
import { Stack } from '@mui/material'
import AdsForm from './AdsForm'
import {getAllAds} from '../../../utils/Service'



export default function Index() {
  const [formOpen, setFormOpen] = useState(false)
  const [adsData, setAdsData] = useState([])

  useEffect(() => {
    getAllAds().then((res)=>{
  console.log(res.ads)
  setAdsData(res.ads)
 }).catch((err) => {
console.log(err)
 })
  }, [])
  return (
    <Stack direction={'column'} gap={2}>
      <AdsForm open={formOpen} onClose={() => { setFormOpen(false) }} />
      <Tools buttonClick={()=>setFormOpen(true)}/>
      <Content data={adsData} updateData={()=>{console.log("Update");}}/>
    </Stack>
  )
}
