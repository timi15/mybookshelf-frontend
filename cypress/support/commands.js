Cypress.Commands.add('removeOverlay', () => {
    cy.window({ log: false }).then((win) => {
        const iframe = win.document.getElementById(
            'webpack-dev-server-client-overlay'
        )
        if (iframe) {
            iframe.remove()
        }
    })
})

Cypress.Commands.add('safeType', (selector, text) => {
    cy.get(selector)
        .scrollIntoView()
        .type(text, { force: true })
})

Cypress.Commands.add('safeClear', (selector) => {
    cy.get(selector)
        .scrollIntoView()
        .clear({ force: true })
})
