
import {Stack, Typography } from '@mui/material'
import React from 'react'
import MainCard from 'ui-component/cards/MainCard'

export default function Tools() {
    return (
        <MainCard>
            
            <Stack direction={'row'} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h3' color={'secondary.main'}>LOGS</Typography>
              
            </Stack>
        </MainCard>
    )
}
