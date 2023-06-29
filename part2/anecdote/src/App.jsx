import { useState } from 'react';
function App() {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.',
	];

	const [selected, setSelected] = useState(0);
	const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
	const [mostVotes, setMostVotes] = useState(0);

	const getRandomNumber = () => {
		return Math.floor(Math.random() * 8);
	};

	const handleNextAnecdote = () => {
		let randomNumber = getRandomNumber();
		setSelected(randomNumber);
	};

	const handleVoteClick = () => {
		let newPoints = [...points];
		newPoints[selected] += 1;
		setPoints(newPoints);

		const max = Math.max(...points);
		setMostVotes(points.indexOf(max));
	};

	return (
		<div>
			<h2>Anecdote of the Day</h2>
			<p>{anecdotes[selected]}</p>
			<p>has {points[selected]} votes</p>
			<button onClick={handleVoteClick}>vote</button>
			<button onClick={handleNextAnecdote}>next anecdote</button>
			<h2>Anecdote with Most Votes</h2>
			<p>{anecdotes[mostVotes]}</p>
			<p>has {points[mostVotes]} votes</p>
		</div>
	);
}

export default App;
