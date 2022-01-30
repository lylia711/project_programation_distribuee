import React from "react";
import Button from "./Button";
import "./SavedRecord.css";
import { useState } from "react";
import WeatherRecord from "./WeatherRecord";



const SavedRecord = ({weather_records, onDelete, onAdd}) => {
console.log(weather_records)
  return (
    <div>
      <div className="button_div">
        <Button onAdd={onAdd}/>
      </div>
      <div>
        {weather_records.map((weather_record) => (
          <WeatherRecord key={weather_record.id} weather_record={weather_record} onDelete={onDelete}/>
        ))}
      </div>
    </div>
  );
};

export default SavedRecord;
