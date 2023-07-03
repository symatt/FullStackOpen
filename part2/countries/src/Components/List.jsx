const List = ({ countries, getCountryInfo }) => {
	return (
		<div>
			{countries.map((c) => {
				return (
					<div key={c.name.common}>
						<p>{c.name.common}</p>
						<button
							onClick={() =>
								getCountryInfo(c.name.common)
							}
						>
							show
						</button>
					</div>
				);
			})}
		</div>
	);
};
export default List;
