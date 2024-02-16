
import React, { useState } from 'react'
import Content from './content'
import Tools from './tools'
import { Stack } from '@mui/material'
import AdsForm from './AdsForm'

export default function Index() {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedData,setselectedData] = useState()

  const actionHandle = (e)=>{
    if (e.action == "Edit") {
      setselectedData(e.data)
      setFormOpen(true)
    }if (e.action == "Delete") {
      setselectedData(e.data)
    }else{
      setselectedData()
    }
  }
  return (
    <Stack direction={'column'} gap={2}>
      <AdsForm open={formOpen} onClose={() => { setFormOpen(false) }} data={selectedData} isEdit={selectedData ? true : false} />
      <Tools buttonClick={()=>setFormOpen(true)}/>
      <Content onActionChange={actionHandle}/>
    </Stack>

  )
}
