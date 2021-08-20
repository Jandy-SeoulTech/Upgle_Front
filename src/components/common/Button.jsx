import { Button as MuiButton } from '@material-ui/core';

export default function Button(props) {
  return (
    <MuiButton
      variant="outlined"
      size="small"
      {...props}
      sx={{
        height: `${props.size === 'medium' ? '2.8125rem' : '1.875rem'}`,
        padding: '0.375rem 0.75rem',
        borderRadius: '20px',
        fontSize: `${props.size === 'medium' ? '1rem' : '0.8125rem'}`,
        fontWeight: '600',
        fontStyle: 'normal',
        border: '1px solid #E0E0E0',
        color: 'black',
        '&:hover': {
          background: 'black',
          color: 'white',
          transition: 'all ease 0.2s',
          boxShadow: 'none',
          borderColor: 'black',
        },
        ...props.sx,
      }}
    />
  );
}
