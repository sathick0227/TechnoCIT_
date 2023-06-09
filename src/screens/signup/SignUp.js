import React, { useState } from 'react';
import Input from '../../components/input';
import { useNavigate } from 'react-router'
import { CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useForm } from "react-hook-form";
import { SignupFc } from '../../services/service';
import { isValidEmail, isValidPhone } from '../../utils/utils'
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { SCREENS, COMPONENTS, COLORS, STRING, UTILS } from '../../constants/constants';


const SignupForm = () => {
  const navigate = useNavigate();
  const [emailerror, setEmailerror] = useState()
  const [mobileError, setMobileError] = useState()
  const [isLoading, setIsLoading] = React.useState(false);
  const [proceed, setProceed] = React.useState(false);
  const { handleSubmit, control, formState: { errors }, setValue } = useForm();

  const onSubmit = (data) => {
    // setIsLoading(true)
      
    SignupFc(data).then(response => {
      setIsLoading(false)
      console.log(response)
      alert(STRING.SIGNUP_SUCCESS_MSG)
      return navigate(SCREENS.INITIAL);
    }).catch(error => {
      setIsLoading(false)
      toast.error(error, {
        position: COMPONENTS.POSITION_BOTTOM,
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: COMPONENTS.THEME,
      });
    })
  }
  const something = (data) => {
    if (isValidEmail(data)) {
      setEmailerror(false)
      setProceed(false);
    } else {
      setProceed(false)
      setEmailerror(true)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <Container component={COMPONENTS.COMP_TYPE} maxWidth={COMPONENTS.MAX_WIDTH1} sx={{ height: COMPONENTS.CARD_HEIGHT }} >
        <CssBaseline />
        <Box
          sx={{
            marginTop: COMPONENTS.EIGHT,
            display: COMPONENTS.FLEX,
            flexDirection: COMPONENTS.COLUMN,
            backgroundColor: COLORS.WHITE,
            padding: COMPONENTS.DEFAUT_PADDING,
            borderRadius: COMPONENTS.DEFAUT_PADDING,
          }}>
          <Typography sx={{ textAlign: COMPONENTS.CENTER, fontWeight: COMPONENTS.FONTWEIGHT }} variant={COMPONENTS.H4} gutterBottom>
            {STRING.SIGN_UP}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input control={control} error={errors.name} name={COMPONENTS.NAME} placeholder={STRING.NAME} type={COMPONENTS.TEXT} required={true} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input control={control} error={errors.role} name={COMPONENTS.ROLE} placeholder={STRING.ROLE} type={COMPONENTS.TEXT} required={true} />
            </Grid>
          </Grid>
          <Input control={control} error={errors.email} name={COMPONENTS.EMAIL} placeholder={STRING.EMAIL}
            getOnChange={true}
            onChange={(ev) => {
              if (isValidEmail(ev.target.value)) {
                setEmailerror(false);
                errors.email = false;
              } else {
                setEmailerror(true)
                errors.email = true;
              }
            }}
            type={COMPONENTS.EMAIL} isValid={emailerror} required={true} />
          <Input control={control} error={errors.password} name={COMPONENTS.PASSWORD} placeholder={STRING.PASSWORD} type={COMPONENTS.PASSWORD} required={true} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input control={control} error={errors.mobile} name={COMPONENTS.MOBILE} placeholder={STRING.MOBILE}
                getOnChange={true}
                onChange={(ev) => {
                  if (isValidPhone(ev.target.value) && ev.target.value.length > UTILS.MIN_PHONE_LENGTH && ev.target.value.length < UTILS.MAX_PHONE_LENGTH) {
                    setMobileError(false);
                    errors.mobile = false;
                  } else {
                    setMobileError(true)
                    errors.mobile = true;
                  }
                }}
                type={COMPONENTS.TEXT} isValid={mobileError} required={true} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input control={control} error={errors.dob} name={COMPONENTS.DOB} placeholder={STRING.DOB} type={COMPONENTS.DATE} required={true} />
            </Grid>
          </Grid>
          <Input control={control} error={errors.yearsOfExp} name={COMPONENTS.YOP} placeholder={STRING.EXPERIENCE} type={COMPONENTS.TEXT} required={true} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input control={control} error={errors.sportId} name={COMPONENTS.SPORTID} placeholder={STRING.SPORT_ID} type={COMPONENTS.TEXT} required={true} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input control={control} error={errors.machineId} name={COMPONENTS.MACHINE_ID} placeholder={STRING.MARCHANT} type={COMPONENTS.TEXT} required={false} />
            </Grid>
          </Grid>
          <Button type={COMPONENTS.SUBMIT} variant={COMPONENTS.CONTAINED} color={COLORS.PRIMARY} fullWidth sx={{ mt: 3, mb: 2 }}>
            {isLoading ? <CircularProgress color='inherit' /> : <>{STRING.SUBMIT}</>}
          </Button>
          <Grid container>
            <Grid item>
              <Link href={SCREENS.HASH} onClick={() => navigate(SCREENS.INITIAL)} variant={COMPONENTS.BODY2}>
                {STRING.LOGIN_TEXT}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </form>
  );
}

export default SignupForm;
{

}