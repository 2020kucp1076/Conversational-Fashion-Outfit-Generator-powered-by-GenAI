import React from 'react';
import { AppBar,  Typography } from '@mui/material';
const styles = {
  appBar: {
    minHeight: 80,
    backgroundColor: 'white',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center'
  },
  typography: {
    fontSize: 55,
    fontWeight: '900',
    fontFamily: 'Dancing Script',
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
  },
};

export default function Header() {

  return (
    <>
      
    <AppBar position="static" sx={styles.appBar} style={{ 
      backgroundImage: `url("onboarding.jpg")`,
      backgroundSize: 'cover'
    }}>
      <Typography fontFamily="Dancing Script" sx={styles.typography}   >Attire Genie</Typography>

    </AppBar>
   
         
    </>
    
  );
}
