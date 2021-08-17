import { TextField as MuiTextField } from '@material-ui/core';

export default function TextField(props) {
  return (
    <MuiTextField
      variant="standard"
      {...props}
      sx={{
        height: '28px',
        '& label.Mui-focused': {
          color: 'black',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'black',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'black',
          },
          '&:hover fieldset': {
            borderColor: 'black',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'black',
          },
        },
        ...props.sx,
      }}
    />
  );
}
