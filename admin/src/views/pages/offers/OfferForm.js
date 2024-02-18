import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { MuiFileInput } from 'mui-file-input'
import { AttachFile } from '@mui/icons-material';
import { toast } from 'react-toastify';
import StyledDialog from 'ui-component/StyledDialog';

export default function OfferForm({ open, onClose, isEdit = false, data={} }) {
    const [file, selectFile] = useState(isEdit && data["Image"])
    console.log(isEdit && data["Image"]);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: isEdit ? data["Ads Name"] : ''
    })

    const onSubmit = (data) => {
        if (!file) {
            toast.error("select Image");
            return
        }
        console.log(data);
    }
    
    return (
        
        <StyledDialog open={open} onClose={onClose} title={`${isEdit ? "Edit" : "Add"} Advertisement`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <Stack direction={'column'} sx={{ p: 2 }} spacing={1}>
                        <Typography variant='h5'>Select Image for Offer</Typography>
                        <MuiFileInput
                            value={file}
                            onChange={(e) => { selectFile(e) }}
                            placeholder='select File'
                            InputProps={{
                                inputProps: {
                                    accept: 'image/*'
                                },
                                startAdornment: <AttachFile />,
                                placeholder: 'Select File'
                            }}
                        />
                        <Typography variant='h5'>Ads Name</Typography>
                        <Controller
                            name="AdsName"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <TextField {...field} placeholder="Enter Advertisement Name" />
                                    {errors.AdsName && (
                                        <span style={{ color: '#f00' }}>
                                            {errors.AdsName.message}
                                        </span>
                                    )}
                                </>
                            )}
                            rules={{ required: "Ads Name is required" }}
                        />
                        <Button variant='contained' type='submit' sx={{ width: '150px' }}>Add</Button>
                    </Stack>
                </Container>
            </form>
        </StyledDialog>
    )
}
