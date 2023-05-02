import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  const style={
    display:'flex',
    justifyContent:'center',
  }
  return (
    <div style={style} >
      <CircularProgress size={80} color="secondary" />
    </div>  
  );
}