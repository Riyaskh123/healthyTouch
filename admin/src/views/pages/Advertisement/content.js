import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'
import TableActionButton from 'ui-component/TableActionButton';
import MainCard from 'ui-component/cards/MainCard';

export default function Content({onActionChange}) {
    
  return (
    <MainCard>
      <Table sx={{ overflow: 'scroll' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'primary.main' }}>SLNO</TableCell>
            <TableCell sx={{ color: 'primary.main' }}>Ads Name</TableCell>
            <TableCell sx={{ color: 'primary.main' }}>Image</TableCell>
            <TableCell sx={{ color: 'primary.main' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>SLNO</TableCell>
            <TableCell>Ads Name</TableCell>
            <TableCell><img
              style={{ height: '100px' }}
              src={`https://img.freepik.com/free-vector/juice-ad-with-gradients-lettering_52683-30650.jpg?w=1380&t=st=1708108102~exp=1708108702~hmac=fa36db9c2ec87db08e9514bf29e03d78152a88969a36971471759a32c1c25e86`} alt='Ads' />
            </TableCell>
            <TableCell>
              <TableActionButton onActionChange={(e) => { onActionChange(e) }} actions={["Activate","Edit","Delete"]} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </MainCard>
  )
}
