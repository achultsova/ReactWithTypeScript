import React, { useState, FC } from "react";
import './App.css';
import axios from 'axios';
import { IResponse } from "./Interface/interfaces";

const App: FC = (props) => {
  const [state, setState] = useState ({
    value: "",
    days: "",
    city: ""
  });

  
  const [response, setResponse] = useState<IResponse >();

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const clickRun = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { days, city } = state;
    console.log(days, city); 
    axios.get<IResponse>(`https://api.m3o.com/v1/weather/Forecast?days=${days}&location=${city}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer NWZlYzNjNTEtZjYyOC00YzZjLTk4MzYtYTk3ZTlkNWVkMDA1"
      }
    })
      .then((resp) => {
        setResponse(resp.data);
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
          <button type= "button" value="run" className="btn" onClick={clickRun}>Run</button> 
        </form>
      </div>
      <div className="outputted">{JSON.stringify(response, null, '\t')} </div>
    </div>
  );
};

export default App;