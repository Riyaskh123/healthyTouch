
import React, { useState,useEffect } from 'react'
import Content from './content'
import Tools from './tools'
import { Stack } from '@mui/material'
import OfferForm from './OfferForm'
import {getAllOffer} from '../../../utils/Service'



export default function Index() {
  const [formOpen, setFormOpen] = useState(false)
  const [offerData, setOfferData] = useState([])

  useEffect(() => {
    getAllOffer().then((res)=>{
  console.log(res.offers)
  setOfferData(res.offers)
 }).catch((err) => {
console.log(err)
 })
  }, [])
  return (
    <Stack direction={'column'} gap={2}>
      <OfferForm open={formOpen} onClose={() => { setFormOpen(false) }} />
      <Tools buttonClick={()=>setFormOpen(true)}/>
      <Content data={offerData} updateData={()=>{console.log("Update");}}/>
    </Stack>
  )
}
