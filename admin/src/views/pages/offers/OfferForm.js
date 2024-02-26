import { Button, Container, Stack, Switch, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StyledDialog from 'ui-component/StyledDialog';
import { useForm, Controller } from "react-hook-form";
import { MuiFileInput } from 'mui-file-input'
import { AttachFile } from '@mui/icons-material';
import { toast } from 'react-toastify';
import storage from '../../../utils/firebase-config';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";

export default function OfferForm({ open, createOffer,updateOffer, getOffers, onClose, isEdit = false, data }) {
    const [file, selectFile] = useState()
    const [status, setStatus] = useState(isEdit && data ?  data.status : "Active");
    const [id,setId]= useState('')
  const [editImg, setEditImg] = useState()
    console.log(data)
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            "offerName": isEdit ? data["Offer Name"] : '',
            "lowerLimit": isEdit ? data.lowerLimit : '',
            "upperLimit": isEdit ? data.upperLimit : '',
        }
    })

    const onSubmit = (data) => {
        createOffers(data)
    }
    const createOffers = (data) => {
        if (!file ) {
            if(!editImg){
                toast.error("select Image");
                return
            }
        }

        if(data.lowerLimit >= data.upperLimit){
            toast.error("upper limit must be greater than lower limit");
            return
        }
        console.log(editImg)
        console.log("heyyy")
        if(editImg){
            console.log("uiiiiiiiiiii")
            updateOffer({"Id":id, "offerName": data.offerName, "imageURL": editImg, "lowerLimit": data.lowerLimit, "upperLimit": data.upperLimit, "status": status })
            .then((response) => {
                console.log(response);
console.log(data.Image)
                onClose();
                setEditImg()
                getOffers()
            })
            .catch((error) => {
                console.log("heyheyehyehe")
                console.error(error);
                toast.error("Error Occured");
            });

        }else{
            const storageRef = ref(storage, `/files/${data.offerName}${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            uploadTask.on(
                "state_changed",
                () => {
    
                },
                (error) => {
    
                    console.error(error);
                },
                () => {
    
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((url) => {
                            console.log(url);
                            if(isEdit){
                                updateOffer({ "Id":id,"offerName": data.offerName, "lowerLimit": data.lowerLimit, "upperLimit": data.upperLimit, "imageURL": url, "status": status })
                                .then((response) => {
                                    console.log(response);
                                    onClose();
                                    setEditImg()
                                    getOffers()
                                })
                                .catch((error) => {
                                    console.error(error);
                                    toast.error(error.response.data.message);
                                });
                            }else{
                                createOffer({ "offerName": data.offerName, "lowerLimit": data.lowerLimit, "upperLimit": data.upperLimit, "imageURL": url, "status": status })
                                .then((response) => {
                                    console.log(response);
                                    onClose();
                                    setEditImg()
                                    getOffers()
                                })
                                .catch((error) => {
                                    console.error(error);
                                    toast.error(error.response.data.message);
                                });
                            }
                            
                        })
                        .catch((error) => {
                            console.error(error);
                            toast.error(error);
    
                        });
                }
            );
        }
       
    }
    useEffect(() => {
        console.log(data);
        setValue("offerName", isEdit ? data["Offer Name"] : '')
        setValue("lowerLimit", isEdit ? data.lowerLimit : '')
        setValue("upperLimit", isEdit ? data.upperLimit : '')
        isEdit? setEditImg(data.Image) :''
        isEdit?setId(data._id):''
    }, [data])


    return (

        <StyledDialog open={open} onClose={()=>{
            setEditImg()
            selectFile()
            onClose()
        }} title={`${isEdit ? "Edit" : "Add"} Offer`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <Stack direction={'column'} sx={{ p: 2 }} spacing={1}>
                        <Typography variant='h5'>Select Image for Offer</Typography>
                        <MuiFileInput
                            value={file}
                            onChange={(e) => { 
                                selectFile(e) 
                            setEditImg()
                            }}
                            placeholder='select File'
                            InputProps={{
                                inputProps: {
                                    accept: 'image/*'
                                },
                                startAdornment: <AttachFile />,
                                placeholder: 'Select File'
                            }}
                        />
{editImg? (
    <img src={data.Image} alt="no item"/>
):<></>}
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
                                    <TextField {...field} placeholder="Enter lowerLimit" type="number" />
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
                                    <TextField {...field} placeholder="Enter upperLimit" type="number" />
                                    {errors.upperLimit && (
                                        <span style={{ color: '#f00' }}>
                                            {errors.upperLimit.message}
                                        </span>
                                    )}
                                </>
                            )}
                            rules={{ required: "upperLimit is required" }}
                        />

                        {isEdit && ( // Render switch only if editing
                            <Stack>
                                <Typography variant='h5'>Status</Typography>
                                <Switch
                                    color='primary'
                                    checked={status==="Active"} // Set default value based on status
                                    onChange={(e) => setStatus(e.target.checked ? 'Active' : 'Inactive')}
                                />
                            </Stack>
                        )}

                        <Button variant='contained' type='submit' sx={{ width: '150px' }}>
                            {isEdit ? 'Update' : 'Add'}
                        </Button>
                    </Stack>
                </Container>
            </form>
        </StyledDialog>
    )
}
