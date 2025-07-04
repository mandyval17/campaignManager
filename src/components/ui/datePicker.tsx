import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
type MyDatePickerProps = React.ComponentProps<typeof DatePicker> & {
  helperText?: string;
  error?: boolean;
};

export const MyDatePicker = ({ helperText, error, ...props }: MyDatePickerProps) => {
  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      slotProps={{
        textField: { size: "small", helperText, error }
      }}
      {...props}
    />
    // </LocalizationProvider>
  );
};

type MyDateTimePickerProps = React.ComponentProps<typeof DateTimePicker> & {
  helperText?: string;
  error?: boolean;
}

export const MyDateTimePicker = ({ helperText, error, ...props }: MyDateTimePickerProps) => {
  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateTimePicker
      slotProps={{
        textField: { size: "small", helperText, error }
      }}
      {...props}
    />
    // </LocalizationProvider>
  );
};
