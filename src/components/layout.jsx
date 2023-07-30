import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import GridCell from './gridcell';
import './layout.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import BuildIcon from "@mui/icons-material/Build";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HouseIcon from "@mui/icons-material/House";
import RestaurantIcon from "@mui/icons-material/Restaurant";

function Layout() {
  const initialMenuItems = [
    { id: 1, content: "Build Hospital", icon: <LocalHospitalIcon />, colour: "warning" },
    { id: 2, content: "Build Gym", icon: <FitnessCenterIcon />, colour: "success" },
    { id: 3, content: "Build Restaurant", icon: <RestaurantIcon />, colour: "secondary" },
    { id: 4, content: "Build House 1", icon: <HouseIcon /> , colour: "error"},
    { id: 5, content: "Build House 2", icon: <HouseIcon />, colour: "error" },
  ]
    const location = useLocation()
    const n = location.state.valueOfN;
    const m = location.state.valueOfM;
    const [h1Count, setH1Count] = useState(0);
    const [h2Count, setH2Count] = useState(0);
    const history = useNavigate();
    const [menuItems, setMenuItems] = useState(initialMenuItems);

    const handleUpdateMenuItems = (item) => {
      if (item.id === 4 || item.id === 5) {
        setMenuItems((prevMenuItems) => prevMenuItems.filter((x) => x.id !== item.id));
      }
      if(item.id === 4){
        setH1Count(h1Count+1)
      }
      else if(item.id === 5){
        setH2Count(h2Count+1)
      }
    }

    const renderRows = () => {
      const rows = [];
      for (let i = 0; i < n; i++) {
        rows.push(
          <div key={i} className="grid-row">
            {renderColumns(i)}
          </div>
        );
      }
      return rows;
    };

    const renderColumns = (i) => {
      const columns = [];
      for (let j = 0; j < m; j++) {
        columns.push(<GridCell menuItems={menuItems} handleUpdateMenuItems={handleUpdateMenuItems} h1Count = {h1Count} setH1Count = {setH1Count} h2Count = {h2Count} setH2Count = {setH2Count} j={j} i = {i} />);
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

    const onReset = () => {
      setMenuItems(initialMenuItems)
    }

    return (
    <div className='layout'>
      <div className='container'>
        <div className="grid-container">{renderRows()}</div>
      </div>
      <div>
        <Button variant="contained" color="success" onClick={handleButtonClick}>
            Recommend House
        </Button>
        <Button sx={{marginLeft: '5%'}} variant="contained" color="primary" onClick={goBack}>
            Initialize Variables Again
        </Button>
        <Button sx={{marginLeft: '5%'}} variant="contained" color="primary" onClick={onReset}>Reset</Button>
      </div>
    </div>
  );
}

export default Layout;
