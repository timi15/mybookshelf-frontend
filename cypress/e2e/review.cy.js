describe('Reviews – CRUD E2E', () => {

    const review = {
        isbn13: '9781538742570',
        rate: 4,
        startDate: '2026-01-01',
        finishDate: '2026-01-10',
        reflection: 'Great book',
        genres: ['Thriller'],
        book: {
            isbn13: '9781538742570',
            title: 'THE HOUSEMAID',
            author: 'Freida McFadden',
            plot: 'Troubles surface when a woman looking to make a fresh start takes a job in the home of the Winchesters.',
            coverUrl: 'https://static01.nyt.com/bestsellers/images/9781538742570.jpg'
        }
    }

    const secondReview = {
        isbn13: '9781534467637',
        rate: 5,
        startDate: '2026-01-02',
        finishDate: '2026-01-11',
        reflection: 'Amazing book',
        genres: ['Romance'],
        book: {
            isbn13: '9781534467637',
            title: 'BETTER THAN THE MOVIES',
            author: 'Lynn Painter',
            plot: 'Romantic story.',
            coverUrl: 'https://static01.nyt.com/bestsellers/images/9781534467637.jpg'
        }
    }

    beforeEach(() => {

        cy.intercept('GET', '**/book-reviews', {
            statusCode: 200,
            body: [review]
        }).as('getReviews')


        cy.intercept('GET', '**/book-reviews/9781538742570', {
            statusCode: 200,
            body: review
        }).as('getReview')


        cy.intercept('POST', '**/book-reviews', {
            statusCode: 201,
            body: secondReview
        }).as('createReview')


        cy.intercept('PUT', '**/book-reviews/9781538742570', {
            statusCode: 200
        }).as('updateReview')


        cy.intercept('DELETE', '**/book-reviews/9781538742570', {
            statusCode: 204
        }).as('deleteReview')


        cy.intercept('GET', '**/to-read', {
            statusCode: 200,
            body: []
        }).as('getToRead')

        cy.intercept('GET', '**/loved', {
            statusCode: 200,
            body: []
        }).as('getLoved')

        cy.visit('/reviews')

        cy.wait('@getReviews')
        cy.wait('@getToRead')
        cy.wait('@getLoved')
    })

    it('READ', () => {
        cy.get('[data-cy="book-cover"]')
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0)
            })
        cy.contains('THE HOUSEMAID').should('be.visible')
        cy.contains('Freida McFadden').should('be.visible')
        cy.contains('Great book').should('be.visible')
        cy.screenshot('read-review-success')
    })

    it('CREATE', () => {

        cy.removeOverlay()

        cy.contains('Create Review')
            .scrollIntoView()
            .click({ force: true })

        cy.safeType('input[name="isbn13"]', secondReview.isbn13)
        cy.safeType('input[name="coverUrl"]', secondReview.book.coverUrl)
        cy.safeType('input[name="title"]', secondReview.book.title)
        cy.safeType('input[name="author"]', secondReview.book.author)
        cy.safeType('textarea[name="plot"]', secondReview.book.plot)

        cy.safeType('input[name="startDate"]', secondReview.startDate)
        cy.safeType('input[name="finishDate"]', secondReview.finishDate)

        cy.get('#demo-multiple-chip').click({ force: true })
        cy.get('[data-cy="genre-Romance"]').click({ force: true })

        cy.safeType('textarea[name="reflection"]', secondReview.reflection)

        cy.get('button[type="submit"]')
            .scrollIntoView()
            .click({ force: true })

        cy.wait('@createReview')

        cy.intercept('GET', '**/book-reviews', {
            statusCode: 200,
            body: [review, secondReview]
        }).as('getReviewsAfterCreate')

        cy.contains('BETTER THAN THE MOVIES').should('be.visible')

        cy.screenshot('create-review-success')
    })

    it('UPDATE', () => {
        cy.removeOverlay()

        cy.get('[data-cy="edit-review"]')
            .first()
            .scrollIntoView()
            .click({force: true})

        cy.wait('@getReview')
        cy.removeOverlay()

        cy.safeClear('textarea[name="reflection"]')
        cy.safeType('textarea[name="reflection"]', 'Updated reflection')

        cy.get('button[type="submit"]')
            .scrollIntoView()
            .click({force: true})

        cy.wait('@updateReview')
        cy.screenshot('update-review-success')
    })

    it('DELETE', () => {
        cy.get('[data-cy="delete-review"]')
            .first()
            .scrollIntoView()
            .click({force: true})

        cy.wait('@deleteReview')
        cy.screenshot('delete-review-success')
    })
})
