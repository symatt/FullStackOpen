import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
	const createBlog = jest.fn();
	const user = userEvent.setup();

	render(<BlogForm createBlog={createBlog} />);

	const titleInput = screen.getByPlaceholderText('Title');
	const authorInput = screen.getByPlaceholderText('Author');
	const urlInput = screen.getByPlaceholderText('Url');
	const sendButton = screen.getByText('create');

	await user.type(titleInput, 'test title');
	await user.type(authorInput, 'test author');
	await user.type(urlInput, 'test url');
	await user.click(sendButton);

	expect(createBlog.mock.calls).toHaveLength(1);
	expect(createBlog.mock.calls[0][0].title).toBe('test title');
	expect(createBlog.mock.calls[0][0].author).toBe('test author');
	expect(createBlog.mock.calls[0][0].url).toBe('test url');
});
