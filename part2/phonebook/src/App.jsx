import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [message, setMessage] = useState({ text: null, type: 'none' });

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const duplicateEntry = (newPerson) => {
		if (
			window.confirm(
				`${newPerson.name} is already added to phonebook, replace the old number with a new one?`
			)
		) {
			console.log(`replacing ${newPerson.name}`);
			const dupePerson = persons.find(
				(person) => person.name === newPerson.name
			);
			const updatedPerson = { ...dupePerson, number: newPerson.number };
			personService
				.update(dupePerson.id, updatedPerson)
				.then((returnedPerson) => {
					console.log(returnedPerson);
					setPersons(
						persons.map((person) =>
							person.name !== newPerson.name ? person : returnedPerson
						)
					);
				})
				.catch((error) => {
					setMessage({
						text: `Information of ${newPerson.name} has been already removed from server`,
						type: 'error',
					});
					setPersons(
						persons.filter((person) => person.name !== newPerson.name)
					);
					setTimeout(() => {
						setMessage({
							text: null,
							type: 'none',
						});
					}, 5000);
				});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const newPerson = { name: newName, number: newNumber };

		let duplicates = persons.filter((person) => {
			return person.name === newPerson.name;
		});
		if (duplicates.length > 0) {
			// alert(`${newPerson.name} is already added to phonebook`);
			// return;
			duplicateEntry(newPerson);
			return;
		}

		personService
			.create(newPerson)
			.then((returnedPerson) => {
				setPersons([...persons, returnedPerson]);
				setNewName('');
				setNewNumber('');
				setMessage({ text: `Added ${returnedPerson.name}`, type: 'success' });
				setTimeout(() => {
					setMessage({
						text: null,
						type: 'none',
					});
				}, 5000);
			})
			.catch((error) => {
				const errorMessage = error.response.data.error;
				console.log(errorMessage);
				setMessage({ text: errorMessage, type: 'error' });
				setTimeout(() => {
					setMessage({
						text: null,
						type: 'none',
					});
				}, 5000);
			});
	};

	const handleDelete = (id) => {
		const person = persons.find((person) => person.id === id);
		if (window.confirm(`Delete ${person.name} ?`)) {
			// console.log(`deleting ${person.name}`);
			personService.deletePerson(id).then(() => {
				setPersons(persons.filter((person) => person.id !== id));
			});
		}
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
			<Notification text={message.text} type={message.type} />
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
			<Persons contactsToShow={contactsToShow} handleDelete={handleDelete} />
		</div>
	);
};

export default App;
