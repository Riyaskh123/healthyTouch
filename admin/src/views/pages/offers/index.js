
import React, { useState,useEffect } from 'react'
import Content from './content'
import Tools from './tools'
import { Stack } from '@mui/material'
import OfferForm from './OfferForm'
import {getAllOffer,createOffer,deleteOffer,updateOffer} from '../../../utils/Service'



export default function Index() {
  const [formOpen, setFormOpen] = useState(false)
  const [offerData, setOfferData] = useState([])
  const [selectedData, setselectedData] = useState();


  const getOffers = ()=>{
    getAllOffer().then((res)=>{
      console.log(res.offers)
      setOfferData(res.offers)
     }).catch((err) => {
    console.log(err)
     })
  }

  const editDeleteHandle = (e)=>{
    console.log(e);
    setselectedData(e.data);
    if (e.action == 'Edit') {
      setFormOpen(true);
    }
    if (e.action == 'delete') {
      deleteOffer(e.data._id)
        .then(() => {
          getOffers();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }


  


  useEffect(() => {
    getOffers()
  }, [])
  return (
    <Stack direction={'column'} gap={2}>
      <OfferForm open={formOpen} createOffer={createOffer} getOffers={getOffers} updateOffer={updateOffer} onClose={() => { setFormOpen(false) }} data={selectedData} isEdit={selectedData ? true : false} />
      <Tools buttonClick={()=>{setselectedData();setFormOpen(true)}}/>
      <Content data={offerData} editDeleteHandle={editDeleteHandle}/>
    </Stack>
  )
}
