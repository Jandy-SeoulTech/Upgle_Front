import { Button as MuiButton } from '@material-ui/core';

export default function Button(props) {
  return (
    <MuiButton
      variant="outlined"
      size="small"
      {...props}
      sx={{
        height: `${props.size === 'medium' ? '45px' : '30px'}`,
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: `${props.size === 'medium' ? '15px' : '13px'}`,
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
