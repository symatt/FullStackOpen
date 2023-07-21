import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notfication';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
	const [errorMessage, setErrorMessage] = useState(null);

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

	const blogForm = () => (
		<form onSubmit={addBlog}>
			<div>
				Title:
				<input
					value={newBlog.title}
					onChange={({ target }) =>
						setNewBlog({ ...newBlog, title: target.value })
					}
				/>
			</div>
			<div>
				Author:
				<input
					value={newBlog.author}
					onChange={({ target }) =>
						setNewBlog({ ...newBlog, author: target.value })
					}
				/>
			</div>
			<div>
				Url:
				<input
					value={newBlog.url}
					onChange={({ target }) =>
						setNewBlog({ ...newBlog, url: target.value })
					}
				/>
			</div>

			<button type='submit'>create</button>
		</form>
	);

	return (
		<div>
			<Notification message={errorMessage} />
			{user === null && loginForm()}
			{user !== null && (
				<div>
					<h2>blogs</h2>
					<p>{user.name} logged in</p>
					<h2>create new blog</h2>
					{blogForm()}
					<button type='button' onClick={handleLogout}>
						logout
					</button>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
