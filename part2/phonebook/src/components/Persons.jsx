const Persons = ({ contactsToShow }) => {
	return (
		<div>
			{contactsToShow.map((person) => {
				return (
					<p key={person.name}>
						{person.name} {person.number}
					</p>
				);
			})}
		</div>
	);
};
export default Persons;
