import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";

import { toast } from 'react-toastify';
import StyledDialog from 'ui-component/StyledDialog';

export default function LogForm({ open, onClose, isEdit = false, data={} }) {
    
    console.log(isEdit );
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: isEdit ? data["Ads Name"] : ''
    })

    const onSubmit = (data) => {
        
        console.log(data);
    }
    
    return (
        
        <StyledDialog open={open} onClose={onClose} title={`Manage Daily Limit`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <Stack direction={'column'} sx={{ p: 2 }} spacing={1}>
                       
                        <Typography variant='h5'>Daily limit</Typography>
                        <Controller
                            name="DailyLimit"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <TextField {...field} placeholder="Enter Daily limit for a user" />
                                    {errors.DailyLimit && (
                                        <span style={{ color: '#f00' }}>
                                            {errors.DailyLimit.message}
                                        </span>
                                    )}
                                </>
                            )}
                            rules={{ required: "DailyLimit is required" }}
                        />
                        <Button variant='contained' type='submit' sx={{ width: '150px' }}>Add</Button>
                    </Stack>
                </Container>
            </form>
        </StyledDialog>
    )
}
