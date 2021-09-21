import APIKey from "./dataMeteo";
import React, { useState } from "react";
import { useEffect } from "react";
import './meteo.css';

/* Un composant qui fait appel à une API de météo */

const Meteo = ()=>{
    const [weatherData, setWeatherData] = useState(null);
    const [date, setDate] = useState(new Date());
    const getWeatherData = (city) =>{
        fetch('https://api.weatherapi.com/v1/current.json?key='+APIKey+'&q='+city+'&aqi=no')
            .then((response)=>{
                if(response.ok){
                    return response.json();
                }
            }).then((value)=>{
                setWeatherData(value);
            }).catch((error)=>{
                console.log(error);
            })
    }


    //Actualiser la date
    setInterval(()=>{
        setDate(new Date());
    },60000);

    let doubleDigit = (number) => number < 10 ? '0'+number : number;
   
    //A lancer après le rendu 
    useEffect(()=>{
        if(weatherData == null){
            getWeatherData('Paris');
        }
    },[weatherData]);

    let ville = weatherData !== null ? weatherData.location.name : '';
    let region = weatherData !== null ? weatherData.location.region : '';
    let moment = weatherData !== null && weatherData.current.is_day ? "Aujourd'hui" : 'Ce soir';
    let temps = weatherData !== null ? weatherData.current.condition.text : '';
    let tempsIcon = weatherData !== null ? 'https:'+weatherData.current.condition.icon : '';
    let temperature = weatherData !== null ? weatherData.current.temp_c : '';
    let vent = weatherData !== null ? weatherData.current.wind_kph : '';

    return(
        <React.Fragment>
            <div className="meteoWidget">
                <div className="buttonWidget">
                    <div className="flex">
                        <div className="weatherIcon">
                            <img src={tempsIcon} alt="temps" />
                        </div>
                        <span>{temperature}°C</span>
                        <p>{ville}</p>
                    </div>
                    <p className="localMeteo"><span>{region}</span></p>
                </div>
                <div className="collapse">
                    <p>{date.getDate()+'/'+doubleDigit((date.getMonth()+1))+'/'+ date.getFullYear()} - {doubleDigit(date.getHours())+':'+doubleDigit(date.getMinutes())}</p>
                    <div className="temps">
                        <p>{moment}:</p>
                        <div className="flex">
                            <img src={tempsIcon} alt="temps" /> <span> {temps}</span>
                        </div>
                    </div>
                    <p>Température: {temperature}°C</p>
                    <p>Vitesse du vent: {vent}Km/h</p>                 
                </div>
            
        </div>

        </React.Fragment>
       );
}

export default Meteo;