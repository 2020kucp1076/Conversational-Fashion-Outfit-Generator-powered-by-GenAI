import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { Stack } from '@mui/material';

export default function ({ onSendMessage, sending, inputRef }) {
  // const ref = inputRef = React.useRef(null);

  const sendMessage = () => {
    const msg = inputRef.current.value;
    inputRef.current.value = '';

    if(msg === '' || sending) return;
    onSendMessage(msg);
  }

  return (
    <div className="centor">
   
      <Paper
        elevation={0}
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '70%',
          minHeight: '48px',
          maxWidth: 800,
          borderRadius: '20px',
          boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.1)`,
          marginBottom: '10px',
          marginTop: '5px'
        }}
      >
        <InputBase
          disabled={sending}
          inputRef={inputRef}
          sx={{ ml: 1, flex: 1, fontFamily: "Google Sans", fontWeight: "300", fontSize: "14px"}}
          placeholder="Type your fashion desires... "
          inputProps={{ 'aria-label': 'Type your fashion desires...' }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <IconButton
          disabled={sending}
          onClick={sendMessage}
          color="primary"
          sx={{ p: '10px' }}
          aria-label="send"
        >
          <SendIcon sx={{ color: '#DADCE0' }} />
        </IconButton>
      </Paper>
    </div>
  );
}
