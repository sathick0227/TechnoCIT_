import * as React from 'react';
import { useNavigate } from 'react-router'
import AddNewEvent from '../../components/addNewEvent';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getEvents } from '../../services/service';
import { useSelector, useDispatch } from 'react-redux';
import { Logout_user } from '../../Redux/action';
import Modal from '@mui/material/Modal';
import { deleteEvent } from '../../services/service';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import ConfirmationDailog from '../../components/confirmationDailog.js';
import { SCREENS, STRING, COMPONENTS, COLORS } from "../../constants/constants";

const Home = () => {
  const updatedData = useSelector(state => state)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [authenticate, setAuthenticate] = React.useState(updatedData.isLoggedIn);
  const [token, setToken] = React.useState(updatedData.userData.token);
  const [data, setData] = React.useState();
  const [funcData, setFuncData] = React.useState()
  const [isEdit, setIsEdit] = React.useState(false);
  const [isClicked, setIsCLicked] = React.useState(false);
  const [editData, setEditData] = React.useState({});
  const [dataCount, setDataCount] = React.useState(5);
  const [state,setState]=React.useState(false);
  const [confrim,setConfrim]=React.useState(false);
  const [deleteData,setDeleteData]=React.useState();
  const handleLogout = () => {
    dispatch(Logout_user());
    navigate(SCREENS.INITIAL)
  };

  const handleConfirm=()=>{
    setConfrim(true);
  }
  const handleOpen = () => {
    setOpen(true);
    setIsEdit(false)
  };

  const handleClose = () => {
    setIsEdit(false)
    setOpen(false);
  };

  const handleDelete = (data) => {
    setDeleteData(data);
    handleDeleteButtonClick()
    
   if(confrim){
    console.log('done')
    
  }
}

  const handleEdit = (data) => {
    setEditData(data);
    setIsEdit(true);
    setFuncData('Edit');
    setOpen(true)
  }
  const handleModel = () => {
    setFuncData('Add');
    setOpen(false)
  }
  const handleMore = () => {
    if (dataCount === 5) {
      setDataCount(data.length)
    } else {
      setDataCount(5)
    }
  }

  React.useEffect(() => {
    
      navigate(SCREENS.HOME);
      getEvents(token).then(response => {
        return setData(response.data)
      }).catch(error => {
        return error
      });
  }, [state, open, dataCount])

  const style = {
    backgroundColor: 'red',
    "&:hover":
    {
      backgroundColor: '#ff726f',
    }
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteField = () => {
    setState(true)
    deleteEvent(deleteData, updatedData.userData.token).then(response => {
      
      toast.success("Event Deleted successfully", {
        position: COMPONENTS.POSITION_BOTTOM,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: COMPONENTS.DARK,
      });
      setState(true)
      return 
    }).catch(error => {
      toast.error(error, {
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
    setDeleteDialogOpen(false);    
  };

  const handleDeleteButtonClick = () => {
    setConfrim(false);
    setDeleteDialogOpen(true);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ToastContainer />
      <AppBar position={COMPONENTS.POSITION}>
        <Toolbar>
          <Typography variant={COMPONENTS.H6} component={COMPONENTS.DIV} sx={{ textTransform: 'uppercase', flexGrow: COMPONENTS.NUM_ONE }}>
            {`${STRING.HOME_TITLE} ${updatedData.userData.username}`}
          </Typography>
          <Typography>
          </Typography>
          <Button color={COMPONENTS.COLOR_TYPE} onClick={handleLogout}>{STRING.LOGOUT}</Button>
        </Toolbar>
      </AppBar>
      <Button sx={{ margin: 3 }} variant={COMPONENTS.CONTAINED} onClick={handleOpen}>{STRING.ADDNEW}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          width: '50%',
          backgroundColor: 'white',
          display: COMPONENTS.FLEX,
          flexDirection: COMPONENTS.COLUMN,
          justifyContent: COMPONENTS.CENTER,
          marginLeft: '25%',
          borderRadius: 5
        }}>
          <AddNewEvent isEdit={isEdit} data={editData} handleModel={() => handleModel()} />
        </Box>
      </Modal>
      <Box sx={{
        marginTop: 2,
        display: COMPONENTS.FLEX,
        flexDirection: COMPONENTS.COLUMN,
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        marginLeft: 8,
        width: '90%'
      }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, height: 'auto' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">EVENT NAME</TableCell>
                <TableCell align="right">SPORTNAME</TableCell>
                <TableCell align="right">VENUE NAME</TableCell>
                <TableCell align="right">EVENT DATE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!data && data.slice(0, dataCount).map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.sportname}</TableCell>
                  <TableCell align="right">{row.venue.name}</TableCell>
                  <TableCell align="right">{row.eventdate}</TableCell>
                  <TableCell align="right">
                    <Button variant={COMPONENTS.CONTAINED} onClick={() => handleEdit(row)}>Edit</Button>&nbsp;&nbsp;
                    <Button sx={style} variant={COMPONENTS.CONTAINED} onClick={() => handleDelete(row.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
              <ConfirmationDailog open={deleteDialogOpen} onClose={handleDeleteDialogClose} onDelete={handleDeleteField}/>
              <Button sx={{ margin: 3 }} variant={COMPONENTS.CONTAINED} onClick={handleMore}>{dataCount === 5 ? "More" : "Less"}</Button>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Home;