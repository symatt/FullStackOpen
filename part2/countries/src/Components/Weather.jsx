const Weather = ({ name, weatherInfo }) => {
	return (
		<div>
			<h2>Weather in {name}</h2>
			<p>{`Temperature ${(weatherInfo.main.temp - 273.15).toFixed(
				2
			)} Celcius`}</p>
			<img
				src={weatherInfo.weather[0].icon}
				alt={weatherInfo.weather[0].main}
			/>
			<p>Wind {weatherInfo.wind.speed} m/s</p>
		</div>
	);
};
export default Weather;
