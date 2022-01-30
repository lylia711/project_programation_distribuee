import React from 'react';
import './SavedRecord.css'
import { FaTimes } from 'react-icons/fa';

const WeatherRecord = ({weather_record, onDelete}) => {


    return <div className='weather_record'>
        <h3> 
            {weather_record.city} 
            <FaTimes style={{cursor: 'pointer'}} onClick={() => onDelete(weather_record.id)}/>
            
        </h3>
        <p>{weather_record.temperature}°c</p>
        <img src={"http://openweathermap.org/img/wn/" + weather_record.icon + "@2x.png"} alt="Weather icon" />
    </div>;


};



export default WeatherRecord;
