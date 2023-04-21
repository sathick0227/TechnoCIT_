import * as React from 'react';
import { useNavigate } from 'react-router'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Logout_user } from '../../Redux/action';
import {SCREENS, STRING, COMPONENTS} from "../../constants/constants";

const Home = () => {
  const updatedData = useSelector(state => state)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authenticate, setAuthenticate] = React.useState(updatedData.isLoggedIn);
  const handleLogout = () => {
    dispatch(Logout_user());
    navigate(SCREENS.INITIAL)
  };

  React.useEffect(() => {
    const getData = localStorage.removeItem('token')
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
    if (authenticate) {
      navigate(SCREENS.HOME);
    } else {
      navigate(SCREENS.INITIAL)
    }
  }, [dispatch])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position={COMPONENTS.POSITION}>
        <Toolbar>
          <Typography variant={COMPONENTS.H6} component={COMPONENTS.DIV} sx={{ flexGrow: COMPONENTS.NUM_ONE }}>
           {`${STRING.HOME_TITLE} ${updatedData.userData.name}`}
          </Typography>
          <Typography>
          </Typography>
          <Button color={COMPONENTS.COLOR_TYPE} onClick={handleLogout}>{STRING.LOGOUT}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Home;