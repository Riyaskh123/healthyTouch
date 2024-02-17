
import React, { useState } from 'react'
import Content from './content'
import Tools from './tools'
import { Stack } from '@mui/material'
import AdsForm from './AdsForm'

const ADSDATA = [{
  name:'ASDSSA',
  image: 'https://img.freepik.com/free-vector/juice-ad-with-gradients-lettering_52683-30650.jpg?w=1380&t=st=1708108102~exp=1708108702~hmac=fa36db9c2ec87db08e9514bf29e03d78152a88969a36971471759a32c1c25e86'
},
{
  name:'Mobile',
  image: 'https://www.shutterstock.com/image-vector/3d-vector-conceptual-illustration-mobile-260nw-1828126133.jpg'
}
]

export default function Index() {
  const [formOpen, setFormOpen] = useState(false)
  return (
    <Stack direction={'column'} gap={2}>
      <AdsForm open={formOpen} onClose={() => { setFormOpen(false) }} />
      <Tools buttonClick={()=>setFormOpen(true)}/>
      <Content data={ADSDATA} updateData={()=>{console.log("Update");}}/>
    </Stack>
  )
}
