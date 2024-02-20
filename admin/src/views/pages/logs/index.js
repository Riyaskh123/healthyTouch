
import React, { useState,useEffect } from 'react'
import Content from './content'
import Tools from './tools'
import { Stack } from '@mui/material'
import {getAllUsers} from '../../../utils/Service'



export default function Index() {

  const [logData, setLogData] = useState([])

  useEffect(() => {
    getAllUsers().then((res)=>{
  console.log(res.users)
  setLogData(res.users)
 }).catch((err) => {
console.log(err)
 })
  }, [])
  return (
    <Stack direction={'column'} gap={2}>
     
      <Tools />
      <Content data={logData} updateData={()=>{console.log("Update");}}/>
    </Stack>
  )
}
