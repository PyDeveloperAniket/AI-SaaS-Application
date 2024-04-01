import { useState } from 'react'
import logo from './assets/chat-gpt.png'
import {Modal, Typography, Box, TextField, LinearProgress} from '@mui/material';
import axios from 'axios';
import GPTResponse from './components/GPTResponse';

function App() {

  const [open, setOpen] = useState(false);
  const [prompt, setprompt] = useState("");
  const [Response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () =>{
    setOpen(true);
  }
  const handleClose = () =>{
    setOpen(false); 
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setResponse("");
    setLoading(true);
    const res = await axios.post("http://localhost:3000/chat", {prompt});
    setResponse(res);
    setLoading(false);
    console.log(res);
  }

  return (
    <div className="app">
      <img className='logo' src={logo} />
      <button onClick={handleOpen} className='btn'>Ask me Anything</button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='chatgpt-modal'
      >
        <Box className='container'>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            How can I help you today?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form style={{display:'flex', flexDirection:'column', alignItems:'center'}} onSubmit={(e)=>{handleSubmit(e)}}>
              <TextField value={prompt} onChange={(e)=>setprompt(e.target.value)} id="outlined-basic" label="Message ChatGPT..." variant="outlined" sx={{margin:"15px 0", width:'100%'}} />
              <button type='submit' className='btn'>Submit</button>
            </form>

            {loading && <LinearProgress sx={{margin:'20px 0'}} />}
            {response && <GPTResponse response = {response} />}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default App
