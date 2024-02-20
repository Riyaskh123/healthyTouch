import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { MuiFileInput } from 'mui-file-input'
import { AttachFile } from '@mui/icons-material';
import { toast } from 'react-toastify';
import StyledDialog from 'ui-component/StyledDialog';
import storage from '../../../utils/firebase-config';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL 
} from "firebase/storage";
export default function AdsForm({ createAds,getAds, open, onClose, isEdit = false, data={} }) {
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
        const storageRef = ref(storage, `/files/${data.AdsName}${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on(
          "state_changed",
          () => {
            // Handle upload state changes if needed
          },
          (error) => {
            // Handle upload errors
            console.error(error);
          },
          () => {
            // Handle upload completion
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                console.log(url);
                createAds({ "adName": data.AdsName, "imageURL": url })
                  .then((response) => {
                    console.log(response);
                    onClose();
                    getAds()
                  })
                  .catch((error) => {
                    console.error(error);
                    toast.error(error.response.data.message);
                  });
              })
              .catch((error) => {
                console.error(error);
                toast.error(error);
                // Handle error retrieving download URL
              });
          }
        );
    }
        
    return (
        
        <StyledDialog open={open} onClose={onClose} title={`${isEdit ? "Edit" : "Add"} Advertisement`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <Stack direction={'column'} sx={{ p: 2 }} spacing={1}>
                        <Typography variant='h5'>Select Image for Advertisement</Typography>
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
                                    {errors.AdName && (
                                        <span style={{ color: '#f00' }}>
                                            {errors.AdName.message}
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
