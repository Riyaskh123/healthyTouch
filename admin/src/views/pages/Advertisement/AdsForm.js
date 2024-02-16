import { Button, Container, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { MuiFileInput } from 'mui-file-input'
import { AttachFile, Close } from '@mui/icons-material';
import { toast } from 'react-toastify';

export default function AdsForm({ open, onClose,isEdit=false,data }) {
    const [file, selectFile] = useState(isEdit && data.image)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues:isEdit ? data.name : ''
    })

    const onSubmit = (data) => {
        if (!file) {
            toast.error("select Image");
            return
        }
        console.log(data);
    }
    return (
        <Dialog maxWidth={'sm'} fullWidth open={open}>
            <DialogTitle>
                <Stack direction={'row'} sx={{justifyContent:'space-between',alignItems:'center'}}>
                    <Typography variant='h2' color={'primary.main'}>Add Advertisement</Typography>
                    <Close sx={{cursor:'pointer'}} onClick={onClose}/>
                </Stack>
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <Stack direction={'column'} sx={{ p: 2 }} spacing={1}>
                        <Typography variant='h5'>Select Image of Advertrisement</Typography>
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
                                    <TextField {...field} placeholder="Enter Location Name" />
                                    {errors.AdsName && (
                                        <span style={{ color: '#f00' }}>
                                            {errors.AdsName.message}
                                        </span>
                                    )}
                                </>
                            )}
                            rules={{ required: "Location Name is required" }}
                        />
                        <Button variant='contained' type='submit' sx={{ width: '150px' }}>Add</Button>
                    </Stack>
                </Container>
            </form>
        </Dialog>
    )
}
