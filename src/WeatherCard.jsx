import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiFog } from "react-icons/wi";

function WeatherCard({ data }) {
  if (!data) return null;

  const { name, main, weather, wind } = data;

  // Escolhe o ícone de acordo com a descrição
  const getWeatherIcon = (desc) => {
    const d = desc.toLowerCase();
    if (d.includes("nuvens")) return <WiCloudy size={80} />;
    if (d.includes("chuva")) return <WiRain size={80} />;
    if (d.includes("neve")) return <WiSnow size={80} />;
    if (d.includes("nevoeiro")) return <WiFog size={80} />;
    return <WiDaySunny size={80} />;
  };

  return (
    <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-80 text-center text-white">
      <h2 className="text-3xl font-semibold mb-2">{name}</h2>
      <div className="flex flex-col items-center">
        {getWeatherIcon(weather[0].description)}
        <p className="text-6xl font-bold my-2">{Math.round(main.temp)}°C</p>
        <p className="capitalize text-lg">{weather[0].description}</p>
      </div>

      <div className="mt-4 text-sm text-gray-200 space-y-1">
        <p>💧 Humidade: {main.humidity}%</p>
        <p>🌬️ Vento: {wind.speed} m/s</p>
      </div>
    </div>
  );
}

export default WeatherCard;
