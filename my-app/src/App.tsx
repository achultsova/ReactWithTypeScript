import React, { useState } from "react";
import './App.css';

const App = () => {
  const [state, setState] = useState({
    value: "",
    days: "",
    city: ""
  });

  const handleChangeEvent = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const clickRun = () => {
    const { days, city } = state;
    console.log(days, city);
    const url = "https://api.m3o.com/v1/weather/Forecast";
    fetch(url + `?days=${days}&location=${city}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer NWZlYzNjNTEtZjYyOC00YzZjLTk4MzYtYTk3ZTlkNWVkMDA1"
      }
    })
      .then((resp) => resp.json())
      .then(function (data) {
        console.log("DATA: ", data);
        setState({
          ...state,
          value: data
        });
      })
      .catch(function (error) {
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
