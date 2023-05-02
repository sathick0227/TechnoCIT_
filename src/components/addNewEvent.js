import React, { useState, useEffect } from 'react';
import Input from './input';
import Loading from './Loading';
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
import { AddEvent, UpdateEvent, getSport, getEventById, getVenueList } from '../services/service';
import { useSelector, useDispatch } from 'react-redux';
import SelectInput from './selectInput';
import { MenuItem } from '@mui/material';
import { COMPONENTS, COLORS, STRING } from './../constants/constants';



const AddNewEvent = ({ handleModel, id, isEdit }) => {

    // let eventDate = moment(data.eventdate).format('YYYY-MM-DD')

    const UserData = useSelector(state => state.userData)
    const [subData, setSubData] = React.useState();
    const [formData, setFormData] = React.useState()
    const [token, setToken] = React.useState(UserData.token);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isShow, setIsShow] = React.useState(true);
    const [sportData, setSportData] = React.useState();
    const [sportSelectValue, setSportSelectValue] = React.useState();
    const [sportId, setSportId] = React.useState();
    const [venueData, setVenueData] = React.useState();
    const [data, setData] = React.useState();
    const [venueName, setVenueName] = React.useState();
    const [venueID, setVenueID] = React.useState();
    const [description, setDescription] = React.useState();
    const fetchDefaultValues = (props) => {

        setValue('name', props.name);
        setValue('sportid', 1);              //Sport Id not available in Get Response Data
        setValue('description', description);
        setValue('venueid', props.venue.id)
        setValue('venueother', props.venue.name)
        setValue('eventdate', moment(props.eventdate).format('YYYY-MM-DD'))
        setValue('eventstarttime', props.eventstarttime)
        setValue('eventendtime', props.eventendtime)
        setValue('id', id)
    }
    React.useLayoutEffect(() => {
        //Get Venue List
        getVenueList(token).then(response => {
            return setVenueData(response.data);
        }).catch(error => {
            console.log(error.message)
        });

        //Get Sport 
        getSport(token).then(response => {
            return setSportData(response.data);
        }).catch(error => {
            console.log(error.message)
        });

        if (isEdit) {
            getEventById(id, token).then(response => {
                setData(response.data)
                fetchDefaultValues(response.data);
            }).catch(error => {
                console.log(error.message)
            });
        }
    }, [venueID, sportSelectValue])

    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({ data });

    const findSportId = () => {
        const getSportId = sportData.data.filter((e) => e.name === sportSelectValue)
        const des = getSportId.map((item) => item.description)
        setDescription(des[0])
        console.log(description)

        const objectData = getSportId.map((item) => item.id)
        setSportId(objectData[0])
        console.log(sportId)
    }

    const handleSportIdChange = (e) => {
        setSportSelectValue(e.target.value)


    }

    const onSubmit = (datas) => {

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
            // setIsLoading(true)
            console.log(JSON.stringify(datas))
            UpdateEvent(datas, token)
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
    console.log(sportSelectValue);
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
                    {data ?
                        <>
                            <Typography sx={{ textAlign: COMPONENTS.CENTER, fontWeight: COMPONENTS.FONTWEIGHT }} variant={COMPONENTS.H5} gutterBottom>
                                {isEdit ? STRING.UPDATE : STRING.ADDNEW}
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Input control={control} error={errors.name} name={COMPONENTS.NAME} placeholder={STRING.NAME} defaultValue={isEdit ? data.name : ""} type={COMPONENTS.TEXT} required={isEdit ? false : true} />
                                </Grid>

                                <Grid item xs={12} sm={6}>

                                    <SelectInput sx={{ marginTop: 2, color: 'black' }} name="sportid" defaultValue={isEdit && data ? data.sportname : ""} onChange={(e) => handleSportIdChange(e)} control={control} >
                                        <MenuItem value="" disabled>Sport Name</MenuItem>
                                        {sportData && sportData.data.map((list, index) => (
                                            <MenuItem key={list.id} value={list.name}>{list.id}.{list.name}</MenuItem>
                                        ))}
                                    </SelectInput>
                                </Grid>
                            </Grid>
                            <Input control={control} error={errors.description} name={COMPONENTS.DESCRIPTION} defaultValue={isEdit && data ? data.description : ""} placeholder={STRING.DESCRIPTION} type={COMPONENTS.TEXT} multiline={true} rows={2} required={isEdit ? false : true} />

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <SelectInput sx={{ marginTop: 2, color: 'black' }} name="venueid" defaultValue={isEdit && data ? data.venue.id : ""} onChange={(e) => setVenueID(e.target.value)} control={control} >
                                        <MenuItem value="" disabled>Venue ID</MenuItem>
                                        {venueData && venueData.map((list, index) => (

                                            <MenuItem key={index} value={list.id}>{list.id}</MenuItem>
                                        ))}
                                    </SelectInput>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input control={control} error={errors.venueother} name={COMPONENTS.VENUEOTHER} placeholder={STRING.VENUEOTHER} type={COMPONENTS.TEXT} defaultValue={isEdit && data ? data.venue.name : ''} disabled={true} required={isEdit ? false : true} />

                                </Grid>
                            </Grid>

                            <Input control={control} error={errors.eventdate} name={COMPONENTS.EVENTDATE} placeholder={STRING.EVENTDATE} defaultValue={isEdit && data ? moment(data.eventdate).format('YYYY-MM-DD') : ""} type={COMPONENTS.DATE} required={isEdit ? false : true} />

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Input control={control} error={errors.eventstarttime} name={COMPONENTS.EVENTSTARTTIME} placeholder={STRING.EVENTSTARTTIME} defaultValue={isEdit && data ? data.eventstarttime : ""} type={COMPONENTS.TEXT} required={isEdit ? false : true} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input control={control} error={errors.eventendtime} name={COMPONENTS.EVENTENDTIME} placeholder={STRING.EVENTENDTIME} defaultValue={isEdit && data ? data.eventendtime : ""} type={COMPONENTS.TEXT} required={isEdit ? false : true} />
                                </Grid>
                            </Grid>

                            {false &&
                                <Input control={control} error={errors.createdby} name={COMPONENTS.CREATEDBY} type={COMPONENTS.TEXT} disabled={true} defaultValue={UserData.id} required={isEdit ? false : true} />
                            }
                            <Button type={COMPONENTS.SUBMIT} variant={COMPONENTS.CONTAINED} color={COLORS.PRIMARY} fullWidth sx={{ mt: 3, mb: 2 }}>
                                {isLoading ? <CircularProgress color='inherit' /> : <>{STRING.SUBMIT}</>}
                            </Button>
                        </> : <Loading />
                    }
                </Box>

            </form>

        </div>
    )
}

export default AddNewEvent