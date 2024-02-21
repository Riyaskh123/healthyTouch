import React from 'react'
import MainCard from './cards/MainCard'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import TableActionButton from './TableActionButton'

export default function StyledTable({
    data,
    header,
    isShowSerialNo = false, isShowAction = false,
    actions = ["Edit", "Delete"],
    onActionChange }) {
    return (
        <MainCard>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {isShowSerialNo && <TableCell sx={{ color: 'primary.main' }}>SLNO</TableCell>}
                            {
                                header.map((head, i) => (
                                    <TableCell key={i} sx={{ color: 'primary.main' }}>{head}</TableCell>
                                ))
                            }
                            {isShowAction && <TableCell sx={{ color: 'primary.main' }}>Action</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((dt, ind) => {
                                return (
                                    <TableRow key={ind}>
                                        {isShowSerialNo && <TableCell>{ind + 1}</TableCell>}
                                        {
                                            header.map((head, i) => {
                                                if (head.toUpperCase() === 'IMAGE') {
                                                    return (<TableCell key={i}><img
                                                        style={{ height: '100px' }}
                                                        src={`${dt[`${head}`]}`} alt='img' />
                                                    </TableCell>)
                                                } else {
                                                    return (<TableCell key={i}>{dt[`${head}`]}</TableCell>)
                                                }
                                            })
                                        }
                                        {isShowAction &&
                                            <TableCell>
                                                <TableActionButton data={dt} onActionChange={(e) => { onActionChange(e) }} actions={actions} />
                                            </TableCell>}
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    )
}
