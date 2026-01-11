import './commands'

Cypress.on('uncaught:exception', (err) => {
    if (
        err.message.includes('ResizeObserver') ||
        err.message.includes('webpack-dev-server-client-overlay')
    ) {
        return false
    }
})