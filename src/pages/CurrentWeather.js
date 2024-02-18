import {React, useState, useEffect} from "react";
import Logo from '../assets/logo.png';
import { FaLocationDot } from "react-icons/fa6";
import WeatherClothes from "../components/WeatherClothes";
import { IoUmbrellaOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function CurrentWeather() {
    const [weather, setWeather] = useState({
        name: "",
        description: "",
        temp: "",
        icon: "",
        sky: "",
        maxtemp: "",
        mintemp: "",
    });
    const [umbrella_, setUmbrella_] = useState('');
    const API_KEY = "963b3ff079dd687c0d8a13694ebbc3c9";
    const navigate = useNavigate();
    
    const NavigateToMenu = () => { // MenuPage로 이동
        navigate("/menu");  
    }


    //위치 가져오기
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeatherByCurrentLocation(lat, lon);
        });
    };
    
    const getWeatherByCurrentLocation = async (lat, lon) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        let response = await fetch(url);
        let data = await response.json();

        const city = data.name;
        const description = data.weather[0].description;
        const temp = data.main.temp;
        const sky = data.weather[0].main;
        const icon = data.weather[0].icon;
        const weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        const max = data.main.temp_max;
        const min = data.main.temp_min;

        setWeather({
            name: city,
            description: description,
            temp: temp,
            icon: weatherIcon,
            sky: sky,
            maxtemp: max,
            mintemp: min,
        })
        Umbrella(weather.description);
    };
        
    useEffect(() => {
        getCurrentLocation();
    }, []);

    const Umbrella = () => {
        console.log(weather.description);
        if ((weather.description.includes('rain')) 
        || (weather.description.includes('drizzle')) 
        || (weather.description.includes('snow'))) {
            setUmbrella_("우산을 챙기세요!");
        }
        else {
            setUmbrella_("");
        }
    };
        

    return(
        <div className="page">
            <img alt="title" src={Logo} className="title_img" onClick={NavigateToMenu}></img>
            <div className="weatherpage">
                <div className="sky">{weather.sky}</div>
                <div className="weather">
                    <div className="city"><FaLocationDot />{weather.name}</div>
                    <img className="weather_icon" src={weather.icon}></img> 
                    <div className="temp">{weather.temp}°</div>
                    <div className="max_temp">최고: {weather.maxtemp}°</div>
                    <div className="min_temp">최저: {weather.mintemp}°</div>
                </div>
                <div className="recommended-clothes">
                    <div className="recommend_title">추천 옷차림</div>
                    <WeatherClothes temp={weather.temp}/>
                    <Umbrella />
                    {umbrella_? <p className="umbrella"><IoUmbrellaOutline /> {umbrella_}</p>: null}
                </div>
            </div>
        </div>
    );
}
export default CurrentWeather;