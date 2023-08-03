describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
		const user = {
			name: 'Lebron James',
			username: 'lebron',
			password: 'lebronjames',
		};
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
		const user2 = {
			name: 'Stephen Curry',
			username: 'curry',
			password: 'stephcurry',
		};
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2);
		cy.visit('http://localhost:3000');
	});

	it('Login form is shown', function () {
		cy.contains('login');
		cy.contains('username');
		cy.contains('password');
	});

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#username').type('lebron');
			cy.get('#password').type('lebronjames');
			cy.get('#login-button').click();

			cy.contains('Lebron James logged in');
		});

		it('fails with wrong credentials', function () {
			cy.get('#username').type('lebron');
			cy.get('#password').type('wrong');
			cy.get('#login-button').click();

			cy.contains('Wrong username or password');
		});
	});

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'lebron', password: 'lebronjames' });
		});

		it('A blog can be created', function () {
			cy.get('#toggleOn').click();
			cy.get('#title').type('a blog created by cypress');
			cy.get('#author').type('cypress');
			cy.get('#url').type('cypress.com');
			cy.get('#create-button').click();
			cy.contains('a blog created by cypress');
		});

		describe('and a blog exists', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'first blog',
					author: 'first author',
					url: 'first.com',
				});
			});

			it('user can like the blog', async function () {
				cy.contains('view').click();
				cy.contains('like').click();
				cy.contains('likes 1');
			});

			it('creator can delete blog', function () {
				cy.contains('view').click();
				cy.contains('remove').click();
				cy.get('#blogs').should('not.contain', 'first blog');
			});

			it('non creator can not see delete button', function () {
				cy.contains('logout').click();
				cy.login({ username: 'curry', password: 'stephcurry' });
				cy.contains('view').click();
				cy.contains('remove').should('not.exist');
			});
		});

		describe('and blogs exist', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'second most liked blog',
					author: 'first author',
					url: 'first.com',
				});
				cy.createBlog({
					title: 'most liked blog',
					author: 'second author',
					url: 'second.com',
				});
			});

			it.only('the most liked blog is on top of the list', function () {
				cy.get('.blog').eq(1).contains('view').click();
				cy.get('.blog')
					.eq(1)
					.children('.additionalDetails')
					.find('button')
					.eq(0)
					.click();
				cy.get('.blog').eq(0).should('contain', 'most liked blog');
				cy.get('.blog').eq(1).should('contain', 'second most liked blog');
			});
		});
	});
});
