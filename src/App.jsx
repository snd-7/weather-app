
  


  
  import { useState, useEffect } from "react";
  import { motion } from "framer-motion";
  
  function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const apiKey = "55bd314a35837e0d626bd71b78efc9f3"; // api key
  
    // Fetch weather by coordinates (auto on load)
    const fetchWeatherByCoords = async (lat, lon) => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`
        );
        const data = await res.json();
        setWeather(data);
        fetchForecast(data.name);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => console.error("Location permission denied:", err)
      );
    }, []);
  
    // Search by city
    const fetchWeatherByCity = async () => {
      if (!city) return;
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`
        );
        const data = await res.json();
        setWeather(data);
        fetchForecast(city);
      } finally {
        setLoading(false);
      }
    };
  
    // 3-day forecast (noon samples)
    const fetchForecast = async (cityName) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=en`
        );
        const data = await res.json();
        const daily = data.list.filter((i) => i.dt_txt.includes("12:00:00"));
        setForecast(daily.slice(0, 3));
      } catch (e) {
        console.error(e);
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-700 text-white p-6">
        {/* Mobile card container */}
        <motion.div
          className="w-[95%] sm:w-[400px] rounded-[2rem] shadow-2xl p-6 flex flex-col items-center bg-white/25 text-black backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Header */}
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              🌦️ Weather App
            </h1>
          </div>
  
          {/* Search */}
          <div className="flex w-full mb-5">
            <input
              type="text"
              placeholder="Enter a city..."
              className="p-3 rounded-l-xl text-black w-full outline-none shadow-md"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              onClick={fetchWeatherByCity}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 rounded-r-xl shadow-md transition"
            >
              Search
            </button>
          </div>
  
          {/* Loading */}
          {loading && (
            <p className="text-lg font-medium animate-pulse mb-4">
              Loading weather...
            </p>
          )}
  
          {/* Current weather */}
          {weather && weather.main && (
            <div className="text-center space-y-3 mb-6">
              <h2 className="text-3xl font-bold">{weather.name}</h2>
              <img
                alt={weather.weather[0].description}
                className="mx-auto w-20 h-20"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
              <p className="text-5xl font-bold">
                {Math.round(weather.main.temp)}°C
              </p>
              <p className="capitalize text-lg">{weather.weather[0].description}</p>
              <div className="text-sm space-y-1">
                <p>💧 Humidity: {weather.main.humidity}%</p>
                <p>🌬️ Wind: {weather.wind.speed} m/s</p>
              </div>
            </div>
          )}
  
          {/* 3-day forecast */}
          {forecast && (
            <div className="grid grid-cols-3 gap-3 w-full">
              {forecast.map((day, i) => (
                <div
                  key={i}
                  className="rounded-2xl text-center py-3 bg-white/30 backdrop-blur-md"
                >
                  <p className="font-semibold text-sm">
                    {new Date(day.dt_txt).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <img
                    alt={day.weather[0].description}
                    className="mx-auto w-10 h-10"
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  />
                  <p className="font-bold text-lg">
                    {Math.round(day.main.temp)}°C
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    );
  }
  
  export default App;
  
