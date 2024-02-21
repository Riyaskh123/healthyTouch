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

export default function OfferForm({ open,createOffer,getOffers, onClose, isEdit = false, data={} }) {
    const [file, selectFile] = useState(isEdit && data["Image"])
    console.log(isEdit && data["Image"]);
    console.log(data)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            "offerName": isEdit ? data["offerName"] : '',
            "lowerLimit": isEdit ? data["lowerLimit"] : '',
            "upperLimit": isEdit ? data["upperLimit"] : '',
          }
    })

    const onSubmit = (data) => {
       
        if (!file) {
            toast.error("select Image");
            return
        }
        const storageRef = ref(storage, `/files/${data.offerName}${file.name}`);
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
                createOffer({ "offerName": data.offerName,"lowerLimit":data.lowerLimit,"upperLimit":data.upperLimit, "imageURL": url })
                  .then((response) => {
                    console.log(response);
                    onClose();
                    getOffers()
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
        
        <StyledDialog open={open} onClose={onClose} title={`${isEdit ? "Edit" : "Add"} Offer`}>
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
                        <Typography variant='h5'>Offer Name</Typography>
                        <Controller
                            name="offerName"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <TextField {...field} placeholder="Enter offerName Name" />
                                    {errors.offerName && (
                                        <span style={{ color: '#f00' }}>
                                            {errors.offerName.message}
                                        </span>
                                    )}
                                </>
                            )}
                            rules={{ required: "Offer Name is required" }}
                        />

<Typography variant='h5'>Lower Limit</Typography>
                        <Controller
                            name="lowerLimit"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <TextField {...field} placeholder="Enter lowerLimit"  type="number"/>
                                    {errors.lowerLimit && (
                                        <span style={{ color: '#f00' }}>
                                            {errors.lowerLimit.message}
                                        </span>
                                    )}
                                </>
                            )}
                            rules={{ required: "lowerLimit is required" }}
                        />


<Typography variant='h5'>Upper Limit</Typography>
                        <Controller
                            name="upperLimit"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <TextField {...field} placeholder="Enter upperLimit" type="number"/>
                                    {errors.upperLimit && (
                                        <span style={{ color: '#f00' }}>
                                            {errors.upperLimit.message}
                                        </span>
                                    )}
                                </>
                            )}
                            rules={{ required: "upperLimit is required" }}
                        />
                        <Button variant='contained' type='submit' sx={{ width: '150px' }}>Add</Button>
                    </Stack>
                </Container>
            </form>
        </StyledDialog>
    )
}
