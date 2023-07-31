import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Note/>', () => {
	let container;
	const handleLike = jest.fn();
	const blog = {
		title: 'short details only',
		author: 'test author',
		url: 'testing.com',
		likes: 100,
		user: {
			name: 'user',
		},
	};

	const loggedUser = {
		name: 'user',
	};

	beforeEach(() => {
		container = render(
			<Blog blog={blog} user={loggedUser} handleLike={handleLike} />
		).container;
	});

	test('renders short details of a blog but has hidden elements', () => {
		const hiddenElement = container.querySelector('.additionalDetails');
		expect(hiddenElement).toHaveStyle('display : none');
	});

	test('after clicking the button, additional details are displayed', async () => {
		const user = userEvent.setup();
		const button = screen.getByText('view');
		await user.click(button);

		const div = container.querySelector('.additionalDetails');
		expect(div).not.toHaveStyle('display: none');
	});

	test('after clicking the like button twice, the handler is called twice', async () => {
		const user = userEvent.setup();

		const showAdditionalButton = screen.getByText('view');
		await user.click(showAdditionalButton);

		const likeButton = screen.getByText('like');
		await user.click(likeButton);
		await user.click(likeButton);

		expect(handleLike.mock.calls).toHaveLength(2);
	});
});
