describe('CRA app', () => {
  it('teaches react', () => {
    cy.visit('http://localhost:3000')
    cy.contains('a', 'Learn React')
  })
})