const Persons = ({ contactsToShow, handleDelete }) => {
	return (
		<div>
			{contactsToShow.map((person) => {
				return (
					<div key={person.id}>
						<p>
							{person.name} {person.number}
						</p>
						<button onClick={() => handleDelete(person.id)}>delete</button>
					</div>
				);
			})}
		</div>
	);
};
export default Persons;
