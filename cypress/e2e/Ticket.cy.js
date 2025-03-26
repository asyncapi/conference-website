describe("Tickets Carousel", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Tickets carousel should be visible", () => {
    cy.getTestData("tickets-carousel").should("be.visible");
  });

  it("Should display initial ticket for Singapore", () => {
    cy.getTestData("ticket-location").contains("Singapore").should("be.visible");
  });

  describe("Navigation", () => {
    it("Next button should change ticket", () => {
      cy.getTestData("next-ticket").click();
      cy.getTestData("ticket-location").contains("Munich, Germany").should("be.visible");
    });

    it("Previous button should change ticket", () => {
      cy.getTestData("next-ticket").click();
      cy.getTestData("prev-ticket").click();
      cy.getTestData("ticket-location").contains("Singapore").should("be.visible");
    });
  });

  describe("Pagination", () => {
    it("Pagination dots should be visible", () => {
      cy.getTestData("pagination-dots").should("be.visible");
    });

    it("Should change ticket when pagination dot is clicked", () => {
      cy.getTestData("pagination-dot-2").click();
      cy.getTestData("ticket-location").contains("Munich, Germany").should("be.visible");
    });
  });

  it('Should have disabled button', () => {
    cy.get('button')
      .contains('Get a Ticket')
      .should('be.visible')
      .and('be.disabled');
  });
});