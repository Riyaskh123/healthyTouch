import React,{useEffect,useState} from 'react'
import StyledTable from 'ui-component/StyledTable';
import { tableHeaderReplace } from 'utils/tableHeaderReplace';
import AdsForm from './OfferForm';

const tableHeader = [
  "Offer Name",
  "Image",
  "lowerLimit",
  "upperLimit",
]

export default function Content({deleteOffer, data, updateData }) {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedData,setselectedData] = useState({})
  const tableData = tableHeaderReplace(data,["offerName","imageURL","lowerLimit","upperLimit"],tableHeader)
  const actionHandle = (e)=>{
    console.log(e);
    if (e.action == "Edit") {
      console.log(e.data)
      console.log("edata00----------------------")
      setselectedData(e.data)
      console.log(selectedData)
      setFormOpen(true)
    }if (e.action == "delete") {
      setselectedData(e.data)
      deleteOffer(e.data._id )
    }else{
      setselectedData()
    }
    updateData()
  }

  useEffect(() => {
    if (formOpen) {
      // If form is open, log selectedData
      console.log(selectedData);
    }
  }, [formOpen, selectedData]);
  return (
    <><AdsForm open={formOpen} onClose={() => { setFormOpen(false); } } data={selectedData} isEdit={true} />
    <StyledTable data={tableData} header={tableHeader} isShowSerialNo={true} isShowAction={true} actions={["Active", "Edit", "delete"]} onActionChange={actionHandle} />
    </>
  )
}
