import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { Controller } from "react-hook-form";

const SelectInput = (props) => {
    const required = props.required;
  return (
    <>
    <Controller
        ref={props.ref}
        name={props.name}
        control={props.control}
        rules={{ required: required }}
        render={({ field }) =>  <Select
          {...field}
          {...props}
          sx={props.sx}
          inputProps={props.inputProps}
          multiline={props.multiline}
          disabled={props.disabled}
          rows={props.rows}
          placeholder={props.placeholder}
          type={props.type}
          margin={'normal'}
          label={props.label}
          value={props.value}
          onChange={props.onChange}
          defaultValue={props.defaultValue}
          fullWidth
        >{props.children}</Select>}
    />
    </>
  );
};
export default SelectInput;