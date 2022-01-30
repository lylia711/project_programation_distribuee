import React, { useState, useEffect } from "react";
import { FaTasks } from "react-icons/fa";
import "./App.css";
// import Button from 'react-bootstrap/Button'; 
import SavedRecord from "./components/SavedRecord";
// const api = {
//   key: "2f2f6ca41c866293d6315db857dc73f2",
//   base: "https://api.openweathermap.org/data/2.5/"
// }

const api = {
  base: "http://127.0.0.1:8000/weather/current_temp/",
};

const api2 ={
  base: "http://127.0.0.1:8001/record_weather/test/"
}

function App() {
  const [weather_records, setWeatherRecords] = useState([])
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const getWeatherRecords = async () => {
      const weatherRecordsFromServer = await fetchWeatherRecords()
      setWeatherRecords(weatherRecordsFromServer)
    }

    getWeatherRecords()
  }, [])

  const fetchWeatherRecords = async () => {
    const res = await fetch(`${api2.base}`)
    const data = await res.json()

    return data
  }

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}?city=${query}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const deleteWeatherRecord = async (id) => {
    await fetch(`${api2.base}${id}/`, {method: 'DELETE'})
    setWeatherRecords(weather_records.filter((weather_record) => weather_record.id !== id))
}

  const addWeatherRecord = async (checkButton) => {
    if (checkButton==true){
      const weather_record = {
        city: weather.name,
        temperature: Math.round(weather.main.temp),
        icon: weather.weather[0].icon
      }
      // console.log('adding')
      const res = await fetch(`${api2.base}`, {
        method: 'POST',
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify(weather_record)
      })

      const data = res.json()

      setWeatherRecords([...weather_records, data])
      
      // console.log(weather_record)
    }
  }

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 20
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <div className="test">
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {typeof weather.main != "undefined" ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°c
                  <div className="weather">{weather.weather[0].main}</div>
                  <div>
                    <img
                      src={
                        "http://openweathermap.org/img/wn/" +
                        weather.weather[0].icon +
                        "@2x.png"
                      }
                      alt="Weather icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : ( 
            ""
          )}

          <div className="record">
            {/* {weather_records.length > 0 ? <SavedRecord weather_records={weather_records} onDelete={deleteWeatherRecord}/> : <h2>No record</h2>} */}
            <SavedRecord weather_records={weather_records} onDelete={deleteWeatherRecord} onAdd={addWeatherRecord}/>
          </div>

        </main>
      </div>
    </div>
  );
}

export default App;
