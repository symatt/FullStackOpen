const Filter = ({filter, handleSetFilter}) => {
	return (
		<form>
			<div>
				filter shown with: <input value={filter} onChange={handleSetFilter} />
			</div>
		</form>
	);
};
export default Filter;
