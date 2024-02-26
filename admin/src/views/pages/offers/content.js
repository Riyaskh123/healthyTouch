import React from 'react';
import StyledTable from 'ui-component/StyledTable';
import { tableHeaderReplace } from 'utils/tableHeaderReplace';
// import AdsForm from './OfferForm';

const tableHeader = ['Offer Name', 'Image', 'lowerLimit', 'upperLimit','status'];

export default function Content({ data,editDeleteHandle }) {

  const tableData = tableHeaderReplace(data, ['offerName', 'imageURL', 'lowerLimit', 'upperLimit','status'], tableHeader);

  return (
    <>
      <StyledTable
        data={tableData}
        header={tableHeader}
        isShowSerialNo={true}
        isShowAction={true}
        actions={['Edit', 'delete']}
        onActionChange={editDeleteHandle}
      />
    </>
  );
}
