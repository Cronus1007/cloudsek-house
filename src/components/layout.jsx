import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import GridCell from './gridcell';
import './layout.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
function Layout() {
    const location = useLocation()
    const n = location.state.valueOfN;
    const m = location.state.valueOfM;
    const [h1Count, setH1Count] = useState(0);
    const [h2Count, setH2Count] = useState(0);
    const history = useNavigate();

    const renderRows = () => {
      const rows = [];
      for (let i = 0; i < n; i++) {
        rows.push(
          <div key={i} className="grid-row">
            {renderColumns()}
          </div>
        );
      }
      return rows;
    };

    const renderColumns = () => {
      const columns = [];
      for (let j = 0; j < m; j++) {
        columns.push(<GridCell h1Count = {h1Count} setH1Count = {setH1Count} h2Count = {h2Count} setH2Count = {setH2Count} key={j} />);
      }
      return columns;
    };
    const handleButtonClick = () => {
      if(h1Count == 1 && h2Count == 1){

      }
      else{
        toast.error("More than 1 House1 and House2 is not allowed", {
          position: 'top-right',
          autoClose: 5000, 
          hideProgressBar: false,
          closeOnClick: true, 
          pauseOnHover: true,
          draggable: true, 
        })
      }
    }
    const goBack = () => {
      history('/')
    }
    return (
    <div className='layout'>
        <Button variant="contained" color="primary">
            Layout Created Successfully
      </Button>
      <div className='container'>
        <div className="grid-container">{renderRows()}</div>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
            Recommend House
        </Button>
        <Button sx={{marginLeft: '5%'}} variant="contained" color="primary" onClick={goBack}>
            Initialize Variables Again
        </Button>
      </div>
    </div>
  );
}

export default Layout;
