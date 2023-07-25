const BlogForm = ({
	handleSubmit,
	newBlog,
	handleTitleChange,
	handleAuthorChange,
	handleUrlChange,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				Title:
				<input value={newBlog.title} onChange={handleTitleChange} />
			</div>
			<div>
				Author:
				<input value={newBlog.author} onChange={handleAuthorChange} />
			</div>
			<div>
				Url:
				<input value={newBlog.url} onChange={handleUrlChange} />
			</div>

			<button type='submit'>create</button>
		</form>
	);
};

export default BlogForm;
