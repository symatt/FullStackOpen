import axios from 'axios';
import { useEffect, useState } from 'react';
import List from './Components/List';
import Country from './Components/Country';
import Weather from './Components/Weather';

function App() {
	const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
	const [filter, setFilter] = useState('');
	const [countries, setCountries] = useState(null);
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		console.log('effect run, countries is now', countries);
		console.log('fetching countries...');
		axios
			.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
			.then((response) => {
				setCountries(response.data);
			});
	}, [filter]);

	const getCountryInfo = (name) => {
		console.log('showing country', name);
		axios
			.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
			.then((response) => {
				setCountries([response.data]);
			});
	};

	const getWeatherInfo = (capital) => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`
			)
			.then((response) => {
				console.log('got weather', response.data);
				setWeather(response.data);
			});
	};

	const handleSetFilter = (e) => {
		setFilter(e.target.value);
		if (showCountries) getWeatherInfo(showCountries[0].capital);
	};

	const showCountries =
		filter === ''
			? countries
			: countries.filter((country) => {
					return country.name.common
						.toLowerCase()
						.includes(filter.toLowerCase());
			  });

	return (
		<div>
			<form>
				find countries <input value={filter} onChange={handleSetFilter} />
			</form>
			{showCountries === null ||
			filter === '' ||
			showCountries.length === 1 ? null : showCountries.length <= 10 ? (
				showCountries.length > 0 ? (
					<div>
						<List countries={showCountries} getCountryInfo={getCountryInfo} />
					</div>
				) : (
					'No countries found'
				)
			) : (
				'Too many matches, specify another filter'
			)}
			{showCountries !== null && showCountries.length === 1 ? (
				<div>
					<Country countryInfo={showCountries[0]} />
					<Weather name={showCountries[0].name.common} weatherInfo={weather} />
				</div>
			) : null}
		</div>
	);
}

export default App;
