import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm, Controller } from "react-hook-form";


import StyledDialog from 'ui-component/StyledDialog';

export default function LogForm({ open,addDailyLimit,limit, onClose}) {
   
    console.log(limit );
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues:{dailyLimit :  limit }
    })

    const onSubmit = (data) => {
        
        console.log(data);
        addDailyLimit(data)
        onClose()
    }
    
    return (
        
        <StyledDialog open={open} onClose={onClose} title={`Manage Daily Limit`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <Stack direction={'column'} sx={{ p: 2 }} spacing={1}>
                       
                        <Typography variant='h5'>Daily limit</Typography>
                        <Controller
                            name="dailyLimit"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <TextField {...field} placeholder="Enter Daily limit for a user" 
                                    type="number"/>
                                    {errors.dailyLimit && (
                                        <span style={{ color: '#f00' }}>
                                            {errors.dailyLimit.message}
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
