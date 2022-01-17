import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Api_key} from '../../config';
import SummaryTable from '../SummaryTable';
import WeatherCard from '../WeatherCard';
import Weatherchart from '../Weatherchart';
import './index.css';

const MainData=(props)=>{
    const {latitude, longitude} = props.coords;
    const [weatherData, setWeatherData] = useState({});
    const [mainData, setmainData] = useState({});
    const [windData, setwindData] = useState({});
    const [sunData, setSunData] = useState({});
    const [cloudData, setCloudData] = useState({});
    
    useEffect(() => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${Api_key}`).then((response) => {
        console.log(response);
        setWeatherData(response.data);
        setmainData(response.data.main);
        setwindData(response.data.wind);
        setSunData(response.data.sys);
        setCloudData(response.data.weather[0]);
      })
        .catch(err => {
          console.log(err);
        });
    }, [latitude, longitude]);

  
if(weatherData&&
  weatherData!==null){
    return(
        <div className="main_container">
        <div className="card_container_main">
         <WeatherCard weatherData={weatherData}
                  mainData={mainData}
                  windData={windData} />
         <Weatherchart  coords={props.coords}/>
         </div>
         <SummaryTable weatherData={weatherData}
                    mainData={mainData}
                    windData={windData}
                    sunData={sunData}
                    cloudData={cloudData}
                    coords={props.coords}/>
        
     </div>
    )
  }else{
    return(
      <div></div>
    )
  }

}
export default MainData;
