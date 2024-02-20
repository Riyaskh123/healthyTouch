
import React, { useState,useEffect } from 'react'
import Content from './content'
import Tools from './tools'
import { Stack } from '@mui/material'
import OfferForm from './OfferForm'
import {getAllOffer,createOffer,deleteOffer} from '../../../utils/Service'



export default function Index() {
  const [formOpen, setFormOpen] = useState(false)
  const [offerData, setOfferData] = useState([])


  const getOffers = ()=>{
    getAllOffer().then((res)=>{
      console.log(res.offers)
      setOfferData(res.offers)
     }).catch((err) => {
    console.log(err)
     })
  }
  useEffect(() => {
    getOffers()
  }, [])
  return (
    <Stack direction={'column'} gap={2}>
      <OfferForm open={formOpen} createOffer={createOffer} getOffers={getOffers} onClose={() => { setFormOpen(false) }} />
      <Tools buttonClick={()=>setFormOpen(true)}/>
      <Content deleteOffer={deleteOffer} data={offerData} updateData={getOffers}/>
    </Stack>
  )
}
