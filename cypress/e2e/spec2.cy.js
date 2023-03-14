describe('CRA logo', () => {
  it('is there', () => {
    cy.visit('http://localhost:3000')
    cy.get('img.App-logo')
  })
})