const Country = ({ countryInfo }) => {
	console.log(countryInfo);
	console.log(Object.values(countryInfo.languages));
	return (
		<div>
			<h2>{countryInfo.name.common}</h2>
			<p>Capital: {countryInfo.capital}</p>
			<p>Area: {countryInfo.area}</p>
			<h4>Languages:</h4>
			<ul>
				{Object.values(countryInfo.languages).map((language) => {
					return <li key={language}>{language}</li>;
				})}
			</ul>
			<img src={countryInfo.flags.png} alt={countryInfo.name.common} />
		</div>
	);
};
export default Country;


