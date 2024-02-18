import React from 'react'
import StyledTable from 'ui-component/StyledTable';
import { tableHeaderReplace } from 'utils/tableHeaderReplace';
import AdsForm from './OfferForm';
import { useState } from 'react';


const tableHeader = [
  "Offer Name",
  "Image",
  "lowerLimit",
  "upperLimit",
]

export default function Content({ data, updateData }) {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedData,setselectedData] = useState()
  const tableData = tableHeaderReplace(data,["offerName","imageURL","lowerLimit","upperLimit"],tableHeader)
  const actionHandle = (e)=>{
    console.log(e);
    if (e.action == "Edit") {
      setselectedData(e.data)
      setFormOpen(true)
    }if (e.action == "Delete") {
      setselectedData(e.data)
    }else{
      setselectedData()
    }
    updateData()
  }

  return (
    <><AdsForm open={formOpen} onClose={() => { setFormOpen(false); } } data={selectedData} isEdit={true} />
    <StyledTable data={tableData} header={tableHeader} isShowSerialNo={true} isShowAction={true} actions={["Active", "Edit", "delete"]} onActionChange={actionHandle} />
    </>
  )
}
