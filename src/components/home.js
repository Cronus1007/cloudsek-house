import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import "../css/home.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const Home = () => {
  const [n, setN] = useState("");
  const [m, setM] = useState("");
  const [grid, setGrid] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const initializeGrid = () => {
      let area = [];
      for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < m; j++) {
          row.push(0);
        }
        area.push(row);
      }
      setGrid(area);
    };

    initializeGrid();
  }, [n, m]);

  const handleNChange = (event) => {
    const { value } = event.target;
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    event.target.value = sanitizedValue;
    setN(event.target.value);
  };

  const handleMChange = (event) => {
    const { value } = event.target;
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    event.target.value = sanitizedValue;
    setM(event.target.value);
  };

  const handleLayoutInitialization = () => {
    // at minimum we have 5 items
    const toastProperties = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };
    if (n * m < 5) {
      toast.error(
        "Won't be able to place all the items in the layout",
        toastProperties
      );
    } else if (n > 7) {
      toast.error("Grid might not fit in the screen", toastProperties);
    } else {
      toast.success("Layout Created Successfully", toastProperties);
      history("/layout", {
        state: {
          n,
          m,
          grid,
        },
      });
    }
  };
  return (
    <div className="home">
      <Button
        variant="contained"
        color="primary"
        onClick={handleLayoutInitialization}
      >
        Initialize Size of Layout
      </Button>
      <div className="textField">
        <TextField
          className="textField"
          label="Enter value of n"
          variant="outlined"
          value={n}
          onChange={handleNChange}
        />
        <div className="layout-button"></div>
        <TextField
          className="textField"
          label="Enter value of m"
          variant="outlined"
          value={m}
          onChange={handleMChange}
        />
      </div>
    </div>
  );
};

export default Home;
