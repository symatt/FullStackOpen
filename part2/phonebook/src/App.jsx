import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		let duplicates = persons.filter((person) => {
			return person.name === newName;
		});
		if (duplicates.length > 0) {
			alert(`${newName} is already added to phonebook`);
			return;
		}

		const newPerson = { name: newName, number: newNumber };
		setPersons([...persons, newPerson]);
		setNewName('');
		setNewNumber('');
	};

	const handleNewName = (e) => {
		setNewName(e.target.value);
	};
	const handleNewNumber = (e) => {
		setNewNumber(e.target.value);
	};
	const handleSetFilter = (e) => {
		setFilter(e.target.value);
	};

	const contactsToShow =
		filter === ''
			? persons
			: persons.filter((person) => {
					return person.name.toLowerCase().startsWith(filter.toLowerCase());
			  });

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} handleSetFilter={handleSetFilter} />
			<h2>Add a new</h2>
			<PersonForm
				handleSubmit={handleSubmit}
				newName={newName}
				handleNewName={handleNewName}
				newNumber={newNumber}
				handleNewNumber={handleNewNumber}
			/>
			<h2>Numbers</h2>
			<Persons contactsToShow={contactsToShow} />
		</div>
	);
};

export default App;
