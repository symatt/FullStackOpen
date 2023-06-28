import { useState } from 'react';

const Statistics = ({ good, neutral, bad, average, positive }) => {
	if (good === 0 && neutral === 0 && bad === 0) return <p>No feedback given</p>;

	return (
		<table>
			<tbody>
				<StatisticLine text={'good'} value={good} />
				<StatisticLine text={'neutral'} value={neutral} />
				<StatisticLine text={'bad'} value={bad} />
				<StatisticLine text={'average'} value={average} />
				<StatisticLine text={'positive'} value={positive} percent={'%'} />
			</tbody>
		</table>
	);
};

const Button = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value, percent }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>
				{value} {percent}
			</td>
		</tr>
	);
};

function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [average, setAverage] = useState(0);
	const [positive, setPositive] = useState(0);

	const handleGoodClick = () => {
		const newGood = good + 1;
		setGood(newGood);
		setAverage(getAverage(newGood, neutral, bad).toFixed(2));
		setPositive(getPositive(newGood, neutral, bad).toFixed(2));
	};
	const handleNeutralClick = () => {
		const newNeutral = neutral + 1;
		setNeutral(newNeutral);
		setAverage(getAverage(good, newNeutral, bad).toFixed(2));
		setPositive(getPositive(good, newNeutral, bad).toFixed(2));
	};
	const handleBadClick = () => {
		const newBad = bad + 1;
		setBad(newBad);
		setAverage(getAverage(good, neutral, newBad).toFixed(2));
		setPositive(getPositive(good, neutral, newBad).toFixed(2));
	};

	const getAverage = (good, neutral, bad) => {
		let scores = good * 1 + bad * -1;
		let total = good + neutral + bad;
		return scores / total;
	};

	const getPositive = (good, neutral, bad) => {
		let total = good + neutral + bad;
		return (good / total) * 100;
	};

	return (
		<>
			<h1>Give Feedback</h1>
			<Button text={'good'} handleClick={handleGoodClick} />
			<Button text={'neutral'} handleClick={handleNeutralClick} />
			<Button text={'bad'} handleClick={handleBadClick} />
			<h1>Statistics</h1>
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				average={average}
				positive={positive}
			/>
		</>
	);
}

export default App;
