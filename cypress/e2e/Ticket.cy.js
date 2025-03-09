describe('TicketCards Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
    });
  
    it('should display the first ticket by default', () => {
      cy.get('[aria-label="Go to ticket 1"]').should('have.class', 'w-6 bg-blue-400');
    });
  
    it('should navigate to the next ticket when clicking next button', () => {
      cy.get('[aria-label="Next ticket"]').click();
      cy.get('[aria-label="Go to ticket 2"]').should('have.class', 'w-6 bg-blue-400');
    });
  
    it('should navigate to the previous ticket when clicking prev button', () => {
      cy.get('[aria-label="Previous ticket"]').click();
      cy.get('[aria-label="Go to ticket 3"]').should('have.class', 'w-6 bg-blue-400'); // Assuming 3 tickets
    });
  
    it('should correctly update ticket details when navigating', () => {
      cy.get('[aria-label="Next ticket"]').click();
      cy.get('.text-xl.font-semibold').should('be.visible'); // Ticket title
      cy.get('.text-3xl.font-bold').should('contain.text', '$'); // Price check
    });
  
    it('should disable button if ticket is not available', () => {
      cy.get('button:contains("Not Available")').should('be.disabled');
    });
  
    it('should navigate using indicator dots', () => {
      cy.get('[aria-label="Go to ticket 2"]').click();
      cy.get('[aria-label="Go to ticket 2"]').should('have.class', 'w-6 bg-blue-400');
    });
  });
  