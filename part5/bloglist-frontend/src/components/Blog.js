import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, handleLike, handleRemove }) => {
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
		<div style={blogStyle} id='blog' className='blog'>
			<div className='shortDetails'>
				<span>
					{blog.title} {blog.author}
				</span>
				<button onClick={toggleDetails}>{visible ? 'hide' : 'view'}</button>
			</div>
			<div style={showWhenVisible} className='additionalDetails'>
				<a
					href={`https://${blog.url}`}
					target='_blank'
					rel='noreferrer noopener'
				>
					{blog.url}
				</a>
				<br />
				<span>likes {blog.likes}</span>
				<button id='like-button' onClick={() => handleLike(blog)}>
					like
				</button>
				<br />
				{blog.user.name}
				<br />
				{user.name === blog.user.name ? (
					<button onClick={() => handleRemove(blog)}>remove</button>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

Blog.propsTypes = {
	blog: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	handleLike: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
};

export default Blog;
