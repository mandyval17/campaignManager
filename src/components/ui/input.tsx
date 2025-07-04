import { Autocomplete, Chip, TextField, TextFieldProps } from '@mui/material';
import React from 'react';
const MAX_LENGTH = 125;
type FormInputProps = TextFieldProps;
export const FormInput = ({ ...props }: FormInputProps) => {
  return (
    <TextField
      size="small"
      fullWidth
      slotProps={{
        htmlInput: {
          maxLength: MAX_LENGTH
        }
      }}
      {...props}
    />
  );
};

type AutocompleteArrayProps = Omit<React.ComponentProps<typeof Autocomplete>, 'renderInput' | 'renderTags'> & {
  label?: string
  placeholder?: string
  error?: boolean
  helperText?: React.ReactNode
}

export const AutocompleteArray = ({
  label = 'Add Options',
  placeholder = 'Type and press enter',
  options = [],
  ...props
}: AutocompleteArrayProps) => {

  return (
    <Autocomplete
      multiple
      freeSolo
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          error={props.error}
          helperText={props.helperText}
        />
      )}
      renderTags={(value: unknown[], getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option as string} {...getTagProps({ index })} />
        ))}
      {...props}
    />
  );
};