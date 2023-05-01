import React, { useState, useEffect } from 'react';
import Input from './input';
import { CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useForm } from "react-hook-form";
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { AddEvent, UpdateEvent,getSport} from '../services/service';
import { useSelector, useDispatch } from 'react-redux';
import SelectInput from './selectInput';
import { MenuItem } from '@mui/material';
import { COMPONENTS, COLORS, STRING } from './../constants/constants';



const AddNewEvent = ({ handleModel, data, isEdit }) => {
    
    const id = data.id;
    let eventDate = moment(data.eventdate).format('YYYY-MM-DD')
    
    const UserData = useSelector(state => state.userData)
    const [subData,setSubData] =React.useState(data);
    const [formData,setFormData] =React.useState()
    const [token, setToken] = React.useState(UserData.token);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isShow, setIsShow] = React.useState(true);
    const [sportData,setSportData] = React.useState();
    const [sportSelectValue,setSportSelectValue]=React.useState();
    const {register, handleSubmit, control, setValue, formState: { errors } } = useForm();
    
    useEffect(()=>{
        getSport(token).then(response => {
          return  setSportData(response.data);
        }).catch(error => {
           console.log(error.message)
        });
    },[])
    
    
    const SelectChange =(event)=>{
        setSportSelectValue(event.target.value);
        console.log(sportSelectValue)
    }
   
    const onSubmit = (datas,event) => {
        event.preventDefault();
       
        
        datas.sportid=sportSelectValue;
        datas.id=id;
        
        datas.eventstarttime=subData.eventstarttime
        datas.eventendtime=subData.eventendtime
        
        console.log(subData)
        console.log(datas)
        // Object.keys(datas).forEach(key => datas[key] === undefined && delete datas[key]);
        
        if (!isEdit) {
            datas.createdby = UserData.id;
            AddEvent(datas, token).then(response => {
                setIsLoading(true)
                console.log('done')
                toast.success("Event added successfully", {
                    position: COMPONENTS.POSITION_BOTTOM,
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: COMPONENTS.DARK,
                });
                return handleModel()
            }).catch(error => {
                setIsLoading(false)
                toast.error(error.message, {
                    position: COMPONENTS.POSITION_BOTTOM,
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: COMPONENTS.DARK,
                });

            })
        } else {
            setIsLoading(true)
            UpdateEvent(datas,token)
                .then(response => {
                    setIsLoading(false);
                    toast.success("Event Updated successfully", {
                        position: COMPONENTS.POSITION_BOTTOM,
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: COMPONENTS.DARK,
                    });
                    return handleModel()
                }).catch(error => {
                    setIsLoading(false);
                    return toast.error(error.message, {
                        position: COMPONENTS.POSITION_BOTTOM,
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: COMPONENTS.DARK,
                    });
                })
        }
    }
    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>

                <CssBaseline />
                <Box
                    sx={{
                        backgroundColor: 'transparent',
                        padding: COMPONENTS.DEFAUT_PADDING,
                        borderRadius: COMPONENTS.DEFAUT_PADDING,
                    }}>
                    <Typography sx={{ textAlign: COMPONENTS.CENTER, fontWeight: COMPONENTS.FONTWEIGHT }} variant={COMPONENTS.H5} gutterBottom>
                        {isEdit ? STRING.UPDATE : STRING.ADDNEW}
                    </Typography>
                    
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <Input control={control} error={errors.name} name={COMPONENTS.NAME} placeholder={STRING.NAME} defaultValue={isEdit ? data.name : ""} type={COMPONENTS.TEXT} required={isEdit ? false : true} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <SelectInput sx={{marginTop:2,color:'black'}}  name="sportid"  defaultValue={isEdit?data.sportid:""} onChange={(e)=>SelectChange(e)}  control={control} >
                        <MenuItem value="" disabled>Sport Name</MenuItem>
                        {sportData && sportData.data.map((list,index)=>(
                            <MenuItem key={index} value={list.id}>{list.id}.{list.name}</MenuItem>
                        ))}
                        </SelectInput>
                        </Grid>
                    </Grid>
                    <Input control={control} error={errors.description} name={COMPONENTS.DESCRIPTION} defaultValue={isEdit ? data.description : ""} placeholder={STRING.DESCRIPTION} type={COMPONENTS.TEXT} multiline={true} rows={2} required={isEdit ? false : true} />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Input control={control} error={errors.venueid} name={COMPONENTS.VENUEID} placeholder={STRING.VENUEID} defaultValue={isEdit ? data.venue.id : ""} type={COMPONENTS.NUMBER} required={isEdit ? false : true} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input control={control} error={errors.venueother} name={COMPONENTS.VENUEOTHER} placeholder={STRING.VENUEOTHER} type={COMPONENTS.TEXT} required={isEdit ? false : true} />
                        </Grid>
                    </Grid>

                    <Input control={control} error={errors.eventdate} name={COMPONENTS.EVENTDATE} placeholder={STRING.EVENTDATE} defaultValue={isEdit ? eventDate : ""} type={COMPONENTS.DATE} required={isEdit ? false : true} />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Input control={control} error={errors.eventstarttime} name={COMPONENTS.EVENTSTARTTIME} placeholder={STRING.EVENTSTARTTIME} defaultValue={isEdit ? data.eventstarttime : ""} type={COMPONENTS.TEXT} required={isEdit ? false : true} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input control={control} error={errors.eventendtime} name={COMPONENTS.EVENTENDTIME} placeholder={STRING.EVENTENDTIME} defaultValue={isEdit ? data.eventendtime : ""} type={COMPONENTS.TEXT} required={isEdit ? false : true} />
                        </Grid>
                    </Grid>

                    {false &&
                        <Input control={control} error={errors.createdby} name={COMPONENTS.CREATEDBY} type={COMPONENTS.TEXT} disabled={true} defaultValue={UserData.id} required={isEdit ? false : true} />
                    }
                    <Button type={COMPONENTS.SUBMIT} variant={COMPONENTS.CONTAINED} color={COLORS.PRIMARY} fullWidth sx={{ mt: 3, mb: 2 }}>
                        {isLoading ? <CircularProgress color='inherit' /> : <>{STRING.SUBMIT}</>}
                    </Button>

                </Box>

            </form>

        </div>
    )
}

export default AddNewEvent