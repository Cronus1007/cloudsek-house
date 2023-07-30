import React, { useState } from 'react';
import { Button } from '@mui/material';
import './layout.css';
import BuildIcon from '@mui/icons-material/Build';
import ReactDOMServer from 'react-dom/server';

const GridCell = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const Hospital = () => {
    return (
        <div className=''> Hospital </div>
    )
  }
  const Gym = () => {
    return (
        <div className=''> Gym </div>
    )
  }
  const Restaurant = () => {
    return (
        <div className=''> Restaurant </div>
    )
  }
  const House1 = () => {
    return (
        <div className=''> House1 </div>
    )
  }
  const House2 = () => {
    return (
        <div className=''> House2 </div>
    )
  }
  const handleButtonClick = (event) => {
    var grid = event.target.parentNode.parentNode.parentNode.parentNode
    const value = event.target.parentNode.value
    if(value === 0){
        grid.style.justifyContent = 'center'
        grid.style.alignItems = 'center'
        grid.innerHTML = ReactDOMServer.renderToString(<Hospital />);
    } else if(value === 1){
        grid.style.justifyContent = 'center'
        grid.style.alignItems = 'center'
        grid.innerHTML = ReactDOMServer.renderToString(<Gym />);
    } else if(value === 2){
        grid.style.justifyContent = 'center'
        grid.style.alignItems = 'center'
        grid.innerHTML = ReactDOMServer.renderToString(<Restaurant />);
    } else if(value === 3){
        props.setH1Count((prevCount) => prevCount + 1);
        grid.style.justifyContent = 'center'
        grid.style.alignItems = 'center'
        grid.innerHTML = ReactDOMServer.renderToString(<House1 />);
    } else if(value === 4){
        props.setH2Count((prevCount) => prevCount + 1);
        grid.style.justifyContent = 'center'
        grid.style.alignItems = 'center'
        grid.innerHTML = ReactDOMServer.renderToString(<House2 />);
    }
  };
  return (
    <div className="grid-cell">
      <Button
        sx={{
          borderRadius: '15%',
          width: '30px',
          height: '30px',
          margin: '5%',
        }}
        variant="contained"
        color="primary"
        onClick={toggleDropdown}
      >
        <BuildIcon />
      </Button>
      {isDropdownOpen && (
        <div className="dropdown">
          <ul>
            <li value="0">
              <button onClick={handleButtonClick}>Build Hospital</button>
            </li>
            <li value="1">
              <button onClick={handleButtonClick}>Build Gym</button>
            </li>
            <li value="2">
              <button onClick={handleButtonClick}>Build Restaurant</button>
            </li>
            <li value="3">
              <button onClick={handleButtonClick}>Build House 1</button>
            </li>
            <li value="4">
              <button onClick={handleButtonClick}>Build House 2</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GridCell;
