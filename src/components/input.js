import React from "react";
import { Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { COMPONENTS } from "../constants/constants";

const Input = (props) => {
 
  const required = props.required;
  
  return (
    <>
      <Controller
        ref={props.ref}
        name={props.name}
        control={props.control}
        rules={{ required: required }}
        render={({ field }) => props.getOnChange ? <TextField
          {...field}
          multiline={props.multiline}
          disabled={props.disabled}
          rows={props.rows}
          placeholder={props.placeholder}
          type={props.type}
          margin={'normal'}
          value={props.value}
          onChange={props.onChange}
          defaultValue={props.defaultValue}
          fullWidth

        /> : 
      <TextField
          {...field}
          multiline={props.multiline}
          disabled={props.disabled}
          rows={props.rows}
          placeholder={props.placeholder}
          type={props.type}
          margin={'normal'}
          value={props.value}
          defaultValue={props.defaultValue}
          fullWidth

        />
        }
      />
      {props.isValid ? <Box sx={{ color: COMPONENTS.ERROR_MAIN, fontSize: COMPONENTS.FONT_SIZE }} >{`${COMPONENTS.VALID_ERROR} ${props.name}`}</Box> :
        props.error ? <Box sx={{ color: COMPONENTS.ERROR_MAIN, fontSize: COMPONENTS.FONT_SIZE }} >{`${COMPONENTS.EMPTY_ERROR} ${props.name}`}</Box> : null}
    </>
  )
}

export default Input;