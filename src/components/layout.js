import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import "../css/layout.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HouseIcon from "@mui/icons-material/House";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Dropdown from "./dropdown";

const Layout = () => {
  const initialMenuItems = [
    {
      id: 1,
      content: "Build Hospital",
      icon: <LocalHospitalIcon />,
      colour: "warning",
    },
    {
      id: 2,
      content: "Build Gym",
      icon: <FitnessCenterIcon />,
      colour: "success",
    },
    {
      id: 3,
      content: "Build Restaurant",
      icon: <RestaurantIcon />,
      colour: "secondary",
    },
    { id: 4, content: "Build House 1", icon: <HouseIcon />, colour: "error" },
    { id: 5, content: "Build House 2", icon: <HouseIcon />, colour: "error" },
  ];
  const location = useLocation();
  const n = location.state.n;
  const m = location.state.m;
  const [h1Count, setH1Count] = useState(0);
  const [h2Count, setH2Count] = useState(0);
  const history = useNavigate();
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [house, setHouse] = useState([]);
  const [properties, setProperties] = useState([]);
  const [content, setContent] = useState("");
  const [grid, setGrid] = useState(location.state.grid);

  // remove from grid
  const addHouseInMenu = (item, i, j) => {
    if (item.id === 4 || item.id === 5) {
      const menuItem = initialMenuItems.find((x) => x.id === item.id);
      setMenuItems((prevMenuItems) => [...prevMenuItems, menuItem]);
    }
    if (item.id === 4) {
      setH1Count(h1Count - 1);
      const h = house.filter((x) => x.id !== 4);
      setHouse(h);
    } else if (item.id === 5) {
      setH2Count(h2Count - 1);
      const h = house.filter((x) => x.id !== 5);
      setHouse(h);
    } else {
      const p = properties.filter((x) => x.i !== i && x.j !== j);
      setProperties(p);
    }
  };

  // construct on grid
  const removeHouseFromMenu = (item, i, j) => {
    if (item.id === 4 || item.id === 5) {
      setMenuItems((prevMenuItems) =>
        prevMenuItems.filter((x) => x.id !== item.id)
      );
    }
    if (item.id === 4) {
      setH1Count(h1Count + 1);
      setHouse([...house, { ...item, i, j }]);
    } else if (item.id === 5) {
      setH2Count(h2Count + 1);
      setHouse([...house, { ...item, i, j }]);
    } else {
      setProperties([...properties, { i, j }]);
    }
  };

  const renderGrid = () => {
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
      columns.push(
        <div className="grid-cell">
          <Dropdown
            grid={grid}
            setGrid={setGrid}
            menuItems={menuItems}
            addHouseInMenu={addHouseInMenu}
            removeHouseFromMenu={removeHouseFromMenu}
            i={i}
            j={j}
          />
        </div>
      );
    }
    return columns;
  };

  const distance = (i, j) => {
    let ans = 0;
    for (var k = 0; k < properties.length; k++) {
      let x = properties[k].i;
      let y = properties[k].j;
      ans += Math.abs(x - i);
      ans += Math.abs(y - j);
    }
    return ans;
  };
  const handleRecommendHouse = () => {
    setContent("");
    const toastProperties = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };
    if (h1Count === 1 && h2Count === 1) {
      const house1 = house[0].id === 4 ? house[0] : house[1];
      const house2 = house[0].id === 5 ? house[0] : house[1];
      const totalDistanceFromHouse1 = distance(house1.i, house1.j);
      const totalDistanceFromHouse2 = distance(house2.i, house2.j);

      if (totalDistanceFromHouse1 < totalDistanceFromHouse2) {
        toast.success("House 1 is the recommended house", toastProperties);
        setContent("House 1 is the recommended house");
      } else if (totalDistanceFromHouse2 < totalDistanceFromHouse1) {
        toast.success("House 2 is the recommended house", toastProperties);
        setContent("House 2 is the recommended house");
      } else {
        setContent("Both Houses are at Same Distance");
      }
    } else {
      toast.error(
        "More than 1 House1 and House2 is not allowed",
        toastProperties
      );
    }
  };

  const handleReset = () => {
    let area = [];
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < m; j++) {
        row.push(0);
      }
      area.push(row);
    }
    setGrid(area);
    setMenuItems(initialMenuItems);
    setHouse([]);
    setProperties([]);
    setContent("");
    setH1Count(0);
    setH2Count(0);
  };

  const goBack = () => {
    history("/");
  };

  return (
    <>
      <div className="layout">
        <div className="container">
          {/* {n} ; {m} */}
          <div className="grid-container">{renderGrid()}</div>
        </div>
        <div>
          <Button
            variant="contained"
            color="success"
            onClick={handleRecommendHouse}
          >
            Recommend House
          </Button>
          <Button
            sx={{ marginLeft: "5%" }}
            variant="contained"
            color="primary"
            onClick={goBack}
          >
            Initialize Variables Again
          </Button>
          <Button
            sx={{ marginLeft: "5%" }}
            variant="contained"
            color="secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
          <h3 className="new-content">{content}</h3>
        </div>
      </div>
    </>
  );
};

export default Layout;
