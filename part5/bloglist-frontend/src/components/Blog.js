import { useState } from 'react';

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleDetails = () => {
		setVisible(!visible);
	};
	// console.log(blog);
	return (
		<div style={blogStyle}>
			<div>
				{blog.title} {blog.author}
				<button onClick={toggleDetails}>{visible ? 'hide' : 'view'}</button>
			</div>
			<div style={showWhenVisible}>
				<a
					href={`https://${blog.url}`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{blog.url}
				</a>
				<br />
				likes {blog.likes} <button>like</button> <br />
				{/* name */}
				{blog.user.name}
				<br />
			</div>
		</div>
	);
};

export default Blog;
