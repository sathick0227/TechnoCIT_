import React, {useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { CssBaseline } from '@mui/material';
import Input from '../../components/input';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { LoginForms } from '../../services/service';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { Update_data } from "../../Redux/action";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { SCREENS, COMPONENTS, COLORS, STRING } from '../../constants/constants';

const LoginForm = () => {
  const updatedData = useSelector(state => state)
  const dispatch = useDispatch();
  const [authenticate, setAuthenticate] = React.useState(updatedData.isLoggedIn);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();
  
  const onSubmit = (data) => {
    setIsLoading(true);
    LoginForms(data).then(response => {
      setIsLoading(false);
      dispatch(Update_data(response.data));
      return navigate(SCREENS.HOME);
    }).catch(error => {
      setIsLoading(false)
      toast.error("Please check your login credentials", {
        position: COMPONENTS.POSITION_BOTTOM,
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: COMPONENTS.THEME,
      });
    })
  }

  useEffect(() => {
    if (authenticate) {
      navigate(SCREENS.INITIAL);
    } else {
      navigate(SCREENS.INITIAL)
    }
  }, [dispatch])

  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container component={COMPONENTS.COMP_TYPE} maxWidth={COMPONENTS.MAX_WIDTH}>
        <ToastContainer />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: COMPONENTS.FLEX,
            flexDirection: COMPONENTS.COLUMN,
            backgroundColor: COLORS.WHITE,
            padding: COMPONENTS.DEFAUT_PADDING,
            borderRadius: COMPONENTS.DEFAUT_PADDING,

          }}>
          <Typography
            sx={{ textAlign: COMPONENTS.CENTER, fontWeight: COMPONENTS.FONTWEIGHT }}
            variant={COMPONENTS.H4} gutterBottom>
            {STRING.LOGIN}
          </Typography>
          {/* username */}
          <Input
            control={control} error={errors.email}
            name={COMPONENTS.EMAIL} placeholder={STRING.EMAIL}
            type={COMPONENTS.TEXT} required={true} />
          {/* Password */}
          <Input
            control={control}
            error={errors.password}
            name={COMPONENTS.PASSWORD}
            placeholder={STRING.PASSWORD}
            type={COMPONENTS.PASSWORD}
            required={true} />
          <FormControlLabel
            control={<Checkbox value={COMPONENTS.REMEMBER}
              color={COLORS.PRIMARY} />}
            label={STRING.REMEMBER}
          />
          <Button
            type={COMPONENTS.SUBMIT}
            variant={COMPONENTS.CONTAINED}
            color={COLORS.PRIMARY}
            fullWidth
            sx={{ mt: 3, mb: 2 }}>
            {isLoading?<CircularProgress color='inherit' />:<>{STRING.SUBMIT}</>}
          </Button>
          <Grid container>
            <Grid item xs={6}>
              <Link
                href={SCREENS.HASH}
                variant={COMPONENTS.BODY2}>
                {STRING.FORGOT_PASSWORD}
              </Link>
            </Grid>
            <Grid item>
              <Link
                href={SCREENS.HASH}
                onClick={() => navigate(SCREENS.SIGNUP)}
                variant={COMPONENTS.BODY2}>
                {STRING.SIGNUP_TEXT}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </form>
  );
}

export default LoginForm;