import 'animate.css'; // Importing animate.css for animations
import axios from 'axios'; // Importing axios for making HTTP requests
import { useEffect, useState } from 'react'; // Importing useEffect and useState hooks from React
import { FiSun } from 'react-icons/fi';
import './App.css'; // Importing custom CSS
import thunder from './assets/thunder.png'; // Importing thunder icon
import haze from './assets/weather-app (1).png'; // Importing haze icon
import clear from './assets/weather-app (2).png'; // Importing clear weather icon
import rain from './assets/weather-app (3).png'; // Importing rain icon

function App() {
  // Defining state variables
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [userTemp, setUserTemp] = useState();
  const [time, setTime] = useState('');
  const [dayDate, setDayDate] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');
  const [weatherDetails, setWeatherDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDark, setDark] = useState(false);

  // API URL with dynamic location
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=b1d4bfa74ced4e2f24cfa94f70460251`;

  // Handle search form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const res = await axios.get(url); // Fetch weather data

      setData(res?.data); // Set weather data
      setWeatherCondition(res?.data?.weather[0]?.main); // Set weather condition
      setWeatherDetails(res?.data?.weather[0]?.description); // Set weather details
      setLocation(''); // Clear the location input
    } catch (error) {
      console.log(error); // Log any errors
    }
  };

  // Fetch weather updates for user's current location
  const fetchDefault = async (lat, lon) => {
    try {
      setLoading(true); // Set loading state to true
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=b1d4bfa74ced4e2f24cfa94f70460251`);

      setData(res?.data); // Set weather data
      setUserLocation(res?.data?.name); // Set user location name
      setCountryCode(res?.data?.sys?.country); // Set country code
      setUserTemp(res?.data?.main?.temp); // Set user temperature
      setWeatherCondition(res?.data?.weather[0]?.main); // Set weather condition
      setWeatherDetails(res?.data?.weather[0]?.description); // Set weather details
      setLocation(''); // Clear the location input
      setLoading(false); // Set loading state to false
    } catch (error) {
      console.log(error); // Log any errors
    }
  };

  // Get user's current geolocation
  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetchDefault(lat, lon); // Fetch weather data for user's location
        },
        error => {
          console.log('Error occurred while getting location.');
          console.error(error); // Log any errors
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  // Fetch user's location on component mount
  useEffect(() => {
    getLocation();
  }, []);

  // Function to update the current date and time
  function updateDateTime() {
    const now = new Date();

    // Get the current time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;
    setTime(time); // Set time state

    // Get the current day and date
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = daysOfWeek[now.getDay()];
    const dayOfMonth = String(now.getDate()).padStart(2, '0');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const date = `${dayOfMonth} ${month} ${year}`;
    const dayDate = `${day}, ${date}`;
    setDayDate(dayDate); // Set day and date state
  }

  // Update the date and time immediately when the page loads
  useEffect(() => {
    updateDateTime();
  });

  // Update the date and time every second
  setInterval(updateDateTime, 1000);

  // Mapping weather conditions to corresponding images
  const weatherImages = {
    Clear: clear,
    Clouds: haze,
    Rain: rain,
    Haze: haze,
    Thunderstorm: thunder,
    Drizzle: rain,
    Mist: haze
  };

  // Get image URL for the current weather condition
  const imageUrl = weatherImages[weatherCondition] || clear;

  // Display loading screen while fetching data
  if (loading) {
    return (
      <div className='loading'>
        <div className="loading-icon"></div>
        <span>Loading...</span>
      </div>
    );
  }

  const onClickThemeButton = () => {
    setDark(!isDark)
  }

  const textColor = isDark ? "light" : "dark";

  return (
    <div className='mainBody'>
      <div className="overlay"></div>
      <div className={`displayBox ${textColor}`}>
        <div className='section1 animate__animated animate__fadeIn'>
          <div className='background-setting'>
            <button type="button" className='lightDark-toggle' onClick={onClickThemeButton}>
              <FiSun className={textColor} size={28} />
            </button>

            <form action="" onSubmit={handleSubmit}>
              <input type="text" name='search' placeholder='Enter your location' onChange={(e) => setLocation(e.target.value.toLowerCase())} />
              <button type='submit'><i className='bx bx-search'></i></button>
            </form>
            
          </div>
          {data && <div className='maindiv animate__animated animate__bounce'>
            <div className='city-temp'>
              <h2>{data?.name},{data?.sys?.country}</h2>
              <h3>{Math.floor((data?.main?.temp - 32) * 5 / 9)}&deg;C</h3>
            </div>

            <div className="image">
              <img src={imageUrl} alt="" />
            </div>

            {weatherDetails && <h3>{weatherDetails}</h3>}
          </div>}
          <p>Current Location and Time.</p>
          <div className='bottom'>
          
            <div className='flex-col'>
              <h3>{time}</h3>
              <h3>{dayDate}</h3>
            </div>

            {userLocation && <div>
              <h3>{userLocation},{countryCode}</h3>
              <h2>{Math.floor((userTemp - 32) * 5 / 9)}&deg;C</h2>
            </div>}
          </div>
        </div>
        <div className='section2 animate__animated animate__fadeIn'>
          {data && <div className='city-weather'>
            <div className='city'><h2>{data?.name},{data?.sys?.country}</h2></div>
            <h2>{weatherCondition}</h2>
          </div>}

          <hr />
          <div className="feels-like space-between">
            <h4>Feels like</h4>
            <h4>{Math.floor((data?.main?.feels_like - 32) * 5 / 9)}&deg;C</h4>
          </div>
          <hr />
          <div className="min-temp space-between">
            <h4>Min-temp</h4>
            <h4>{Math.floor((data?.main?.temp_min - 32) * 5 / 9)}&deg;C</h4>
          </div>
          <hr />
          <div className="max-temp space-between">
            <h4>Max-temp</h4>
            <h4>{Math.floor((data?.main?.temp_max - 32) * 5 / 9)}&deg;C</h4>
          </div>
          <hr />
          <div className="humidity space-between">
            <h4>Humidity</h4>
            <h4>{data?.main?.humidity}%</h4>
          </div>
          <hr />
          <div className="visibility space-between">
            <h4>Visibility</h4>
            <h4>{(data?.visibility) / 1000}km</h4>
          </div>
          <hr />
          <div className="wind space-between">
            <h4>Wind Speed</h4>
            <h4>{data?.wind?.speed}km/h</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
