
import React, { useState,useEffect } from 'react'
import Content from './content'
import Tools from './tools'
import { Stack } from '@mui/material'
import LogForm from './LogForm'
import {getAllUsers,createDailyLimit,getDailyLimit} from '../../../utils/Service'



export default function Index() {
  const [formOpen, setFormOpen] = useState(false)
  const [logData, setLogData] = useState([])
  const [limit, setDailyLimit] = useState(0)

  useEffect(() => {
    
    getAllUsers().then((res)=>{
  console.log(res.users)
  setLogData(res.users)
 }).catch((err) => {
console.log(err)
 })

 getDailyLimit().then((res) => {
console.log(res.limit.dailyLimit)
setDailyLimit(res.limit.dailyLimit)
 }).catch((err) => {
console.log(err)
 })
  }, [])
  return (
    <Stack direction={'column'} gap={2}>
      <LogForm open={formOpen}  limit={limit} addDailyLimit={createDailyLimit} onClose={() => { setFormOpen(false) }} />
      <Tools buttonClick={()=>setFormOpen(true)}/>
      <Content data={logData} updateData={()=>{console.log("Update");}}/>
    </Stack>
  )
}
