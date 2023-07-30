import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import BuildIcon from "@mui/icons-material/Build";

export default function DropdownButton({menuItems, handleUpdateMenuItems, i, j}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const handleClick = (event) => {
    // console.log(event)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item) => {
    handleUpdateMenuItems(item,i,j)
    setSelectedValue(item);
    setAnchorEl(null);
  };


  return (
    <div>
      <Button
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color={selectedValue ? selectedValue.colour : "primary"}
      >
        {selectedValue ? selectedValue.icon : <BuildIcon />}
      </Button>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((item) => {
          return (
            <MenuItem onClick={() => handleMenuItemClick(item)} key={item.id}>
              {item.content}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
