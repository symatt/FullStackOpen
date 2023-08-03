import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
	const [blog, setBlog] = useState({ title: '', author: '', url: '' });

	const addBlog = (event) => {
		event.preventDefault();
		createBlog(blog);

		setBlog({ title: '', author: '', url: '' });
	};

	return (
		<form onSubmit={addBlog}>
			<div>
				Title:
				<input
					value={blog.title}
					id='title'
					onChange={(e) => setBlog({ ...blog, title: e.target.value })}
					placeholder='Title'
				/>
			</div>
			<div>
				Author:
				<input
					value={blog.author}
					id='author'
					onChange={(e) => setBlog({ ...blog, author: e.target.value })}
					placeholder='Author'
				/>
			</div>
			<div>
				Url:
				<input
					value={blog.url}
					id='url'
					onChange={(e) => setBlog({ ...blog, url: e.target.value })}
					placeholder='Url'
				/>
			</div>

			<button type='submit' id='create-button'>create</button>
		</form>
	);
};

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
