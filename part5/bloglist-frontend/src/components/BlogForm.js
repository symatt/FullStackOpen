import { useState } from 'react';

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
					onChange={(e) => setBlog({ ...blog, title: e.target.value })}
				/>
			</div>
			<div>
				Author:
				<input
					value={blog.author}
					onChange={(e) => setBlog({ ...blog, author: e.target.value })}
				/>
			</div>
			<div>
				Url:
				<input
					value={blog.url}
					onChange={(e) => setBlog({ ...blog, url: e.target.value })}
				/>
			</div>

			<button type='submit'>create</button>
		</form>
	);
};

export default BlogForm;
