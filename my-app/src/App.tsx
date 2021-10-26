import React, { useState, FC } from "react";
import './App.css';
import axios from 'axios';
import { IResponse } from "./Interface/interfaces";
import { Iforecast } from "./Interface/interfaces"; 

const App: FC = (props) => {
  const [state, setState] = useState ({
    value: "",
    days: "",
    city: ""
  });

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const clickRun = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { days, city } = state;
    console.log(days, city);
    const url = "https://api.m3o.com/v1/weather/Forecasts";
    axios.get(url + `?days=${days}&location=${city}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer NWZlYzNjNTEtZjYyOC00YzZjLTk4MzYtYTk3ZTlkNWVkMDA1"
      }
    })
      .then((resp) => {
        console.log("DATA: ", resp.data);
        setState({
          ...state,
          value: resp.data
        });
      })
      .catch((error) => {
        setState({
          ...state,
          value: error
        });
      });
  };

  return (
    <div className="container">
      <div className="inputted">
        <form name="inputs">
          <input
            type="text"
            name="days"
            placeholder="Введите количество дней"
            className="days"
            onChange={handleChangeEvent}
          />
          <input
            type="text"
            name="city"
            placeholder="Введите город"
            className="city"
            onChange={handleChangeEvent}
          />
          <input type="button" value="run" className="btn" onClick={clickRun} />
        </form>
      </div>
      <div className="outputted">{JSON.stringify(state.value, null, '\t')} </div>
    </div>
  );
};

export default App;
