import React from "react";
import { Container, Paper } from "@mui/material";

const dialogueStyle = {
  sender: {
    background: '#FFFFFF',
    borderRadius: '20px 0px 20px 20px',
    padding: '10px 16px',
    gap: '10px',
    maxWidth: '50%',
    color: '#614646',
    marginBottom: '20px ',
    marginRight: '365px',
    marginTop:'20px',
    fontSize: '14px'
  },
  bot: {
    background: '#FFFFFF',
    borderRadius: '20px 0px 20px 20px',
    padding: '10px 16px 10px 10px',
    gap: '10px',
    maxWidth: '50%',
    color: '#614646',
    marginBottom: '20px',
    marginLeft:'365px',
    fontSize: '14px'
    
  }
}

export default function(props) {
  const { type, children } = props;
  return (
    <Paper elevation={0} sx={dialogueStyle[type]}>
      {children}
    </Paper>
  )
}
