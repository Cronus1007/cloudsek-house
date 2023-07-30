import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import './home.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

function Home() {
  // Define state variables to store the input values
  const [valueOfN, setValueOfN] = useState('');
  const [valueOfM, setValueOfM] = useState('');
  const history = useNavigate();


  const handleValueOfNChange = (event) => {
    setValueOfN(event.target.value);
  };

  const handleValueOfMChange = (event) => {
    setValueOfM(event.target.value);
  };

  const handleButtonClick = () => {
    // at minimum we have 5 items
    if(valueOfN*valueOfM < 5){
      toast.error("Won't be able to place all the items in the layout", {
        position: 'top-right',
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true, 
        pauseOnHover: true,
        draggable: true, 
      })
    } else if(valueOfN > 7) {
      toast.error("Grid might not fit in the screen", {
        position: 'top-right',
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true, 
        pauseOnHover: true,
        draggable: true, 
      })
    }
    else {
      toast.success("Layout Created Successfully", {
        position: 'top-right',
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true, 
        pauseOnHover: true,
        draggable: true, 
      })
      history('/layout', {state:{
        valueOfN: valueOfN,
        valueOfM: valueOfM
      }})
    }
  };

  return (
    <div className='home'>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Initialize Size of Layout
      </Button>
      <div className='textField'>
        <TextField
          className='textField'
          id="outlined-basic"
          label="Enter value of n"
          variant="outlined"
          value={valueOfN}
          onChange={handleValueOfNChange}
        />
        <div className='layout-button'></div>
        <TextField
          className='textField'
          id="outlined-basic"
          label="Enter value of m"
          variant="outlined"
          value={valueOfM}
          onChange={handleValueOfMChange}
        />
      </div>
    </div>
  );
}

export default Home;
