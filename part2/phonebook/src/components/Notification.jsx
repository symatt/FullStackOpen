const Notification = ({ text, type }) => {
	let notificationStyle = {
		color: 'green',
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '10px',
	};

	switch (type) {
		case 'error':
			notificationStyle.color = 'red';
			break;
		default:
			notificationStyle.color = 'green';
	}

	if (text === null) {
		return null;
	}

	return <div style={notificationStyle}>{text}</div>;
};
export default Notification;
