import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notfication';
import BlogForm from './components/BlogForm';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
	const [errorMessage, setErrorMessage] = useState(null);
	const [createVisible, setCreateVisible] = useState(false);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setErrorMessage('Wrong username or password');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const handleLogout = (event) => {
		window.localStorage.removeItem('loggedNoteappUser');
		setUser(null);
	};

	const addBlog = (event) => {
		event.preventDefault();

		blogService.create(newBlog).then((returnedBlog) => {
			setBlogs(blogs.concat(returnedBlog));
			setNewBlog({ title: '', author: '', url: '' });
			setErrorMessage(
				`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
			);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		});
	};

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<h2>Login</h2>
			<div>
				username
				<input
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type='password'
					value={password}
					name='Password'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type='submit'>login</button>
		</form>
	);

	const blogForm = () => {
		const hideWhenVisible = { display: createVisible ? 'none' : '' };
		const showWhenVisible = { display: createVisible ? '' : 'none' };

		return (
			<div>
				<div style={hideWhenVisible}>
					<button onClick={() => setCreateVisible(true)}>new note</button>
				</div>
				<div style={showWhenVisible}>
					<BlogForm
						handleSubmit={addBlog}
						newBlog={newBlog}
						handleTitleChange={({ target }) =>
							setNewBlog({ ...newBlog, title: target.value })
						}
						handleAuthorChange={({ target }) =>
							setNewBlog({ ...newBlog, author: target.value })
						}
						handleUrlChange={({ target }) =>
							setNewBlog({ ...newBlog, url: target.value })
						}
					/>
					<button onClick={() => setCreateVisible(false)}>cancel</button>
				</div>
			</div>
		);
	};

	return (
		<div>
			<Notification message={errorMessage} />
			{user === null && loginForm()}
			{user !== null && (
				<div>
					<h2>blogs</h2>
					<p>{user.name} logged in</p>
					<button type='button' onClick={handleLogout}>
						logout
					</button>
					<h2>create new blog</h2>
					{blogForm()}
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
