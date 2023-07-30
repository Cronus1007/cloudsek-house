import React, { useState } from 'react';
import './layout.css';
import DropdownButton from './DropdownButton';

const GridCell = (props) => {
  return (
    <div className="grid-cell" name={props.i} value={props.j}>
      <DropdownButton menuItems={props.menuItems} handleUpdateMenuItems={props.handleUpdateMenuItems} i={props.i} j={props.j}/>
    </div>
  );
};

export default GridCell;
