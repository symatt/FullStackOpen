const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Part = ({ name, exercises }) => {
	return (
		<p>
			{name} {exercises}
		</p>
	);
};

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((part) => {
				return (
					<Part key={part.id} name={part.name} exercises={part.exercises} />
				);
			})}
		</>
	);
};

const Total = ({ parts }) => {
	const total = parts.reduce((s, p) => {
		return { exercises: s.exercises + p.exercises };
	});
	return (
		<p>
			<b>Total of {total.exercises} exercises</b>
		</p>
	);
};

const Course = ({ courses }) => {
	return (
		<div>
			{courses.map((course) => {
				return (
					<div key={course.id}>
						<Header course={course.name} />
						<Content parts={course.parts} />
						<Total parts={course.parts} />
					</div>
				);
			})}
		</div>
	);
};
export default Course;
