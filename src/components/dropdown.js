import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import BuildIcon from "@mui/icons-material/Build";
import Badge from "@mui/material/Badge";

const Dropdown = ({
  grid,
  setGrid,
  menuItems,
  addHouseInMenu,
  removeHouseFromMenu,
  i,
  j,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item) => {
    const gridCopy = [...grid];
    gridCopy[i][j] = item.id;
    setGrid(gridCopy);
    removeHouseFromMenu(item, i, j);
    setSelectedValue(item);
    setAnchorEl(null);
  };

  const handleRemove = (item) => {
    const zero = 0;
    const gridCopy = [...grid];
    gridCopy[i][j] = zero;
    setGrid(gridCopy);
    setSelectedValue(null);
    addHouseInMenu(item, i, j);
  };

  return (
    <div>
      {selectedValue && grid[i][j] !== 0 ? (
        <Badge
          badgeContent="X"
          color="info"
          style={{ cursor: "pointer" }}
          onClick={() => handleRemove(selectedValue)}
        >
          <Button
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            variant="contained"
            color={selectedValue.colour}
          >
            {selectedValue ? selectedValue.icon : <BuildIcon />}
          </Button>
        </Badge>
      ) : (
        <Button
          aria-controls="dropdown-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="contained"
          color="primary"
        >
          <BuildIcon />
        </Button>
      )}

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
};

export default Dropdown;
