import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notfication';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
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

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility();
		blogService.create(blogObject).then((returnedBlog) => {
			setBlogs(blogs.concat(returnedBlog));
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

	const blogFormRef = useRef();

	const blogForm = () => {
		return (
			<Togglable buttonLabel='create new blog' ref={blogFormRef}>
				<BlogForm createBlog={addBlog} />
			</Togglable>
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
