import tickets from "../../data/tickets.json";

describe("TicketCards Component Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should display the ticket cards container", () => {
    cy.getTestData("ticket-cards").should("be.visible");
  });

  it("Should display the navigation buttons", () => {
    cy.getTestData("prev-ticket-button").should("be.visible");
    cy.getTestData("next-ticket-button").should("be.visible");
  });

  it("Should display the first ticket by default", () => {
    cy.getTestData("ticket-card-1").should("be.visible");
    cy.getTestData("ticket-title").should("contain", tickets[0].type);
    cy.getTestData("ticket-description").should("contain", tickets[0].description);
    cy.getTestData("ticket-status").should("contain", tickets[0].status);
    cy.getTestData("ticket-price").should("contain", `$${tickets[0].price}`);
  });

  it("Should display correct benefits for the first ticket", () => {
    tickets[0].benefits.forEach((benefit) => {
      cy.getTestData("ticket-benefit").contains(benefit).should("be.visible");
    });
  });

  it("Should navigate to the next ticket when clicking next button", () => {
    cy.getTestData("next-ticket-button").click();
    cy.getTestData("ticket-card-2").should("be.visible");
    cy.getTestData("ticket-title").should("contain", tickets[1].type);
  });

  it("Should navigate to the previous ticket when clicking previous button", () => {
    cy.getTestData("next-ticket-button").click();
    cy.getTestData("prev-ticket-button").click();
    
    cy.getTestData("ticket-card-1").should("be.visible");
    cy.getTestData("ticket-title").should("contain", tickets[0].type);
  });

  it("Should loop back to the first ticket when clicking next at the last ticket", () => {
    for (let i = 0; i < tickets.length - 1; i++) {
      cy.getTestData("next-ticket-button").click();
    }

    cy.getTestData(`ticket-card-${tickets.length}`).should("be.visible");
    cy.getTestData("next-ticket-button").click();
    cy.getTestData("ticket-card-1").should("be.visible");
  });

  it("Should loop to the last ticket when clicking previous at the first ticket", () => {
    // Click previous on the first ticket to go to the last ticket
    cy.getTestData("prev-ticket-button").click();
    
    // Verify we're on the last ticket
    cy.getTestData(`ticket-card-${tickets.length}`).should("be.visible");
  });

  it("Should navigate to the correct ticket when clicking an indicator", () => {
    if (tickets.length >= 3) {
      cy.getTestData("ticket-indicator-3").click();
      cy.getTestData("ticket-card-3").should("be.visible");
      cy.getTestData("ticket-title").should("contain", tickets[2].type);
    } else {
      cy.log("Not enough tickets to test indicator 3 - skipping this test");
    }
  });

  it("Should display the correct number of indicators", () => {
    cy.get("[data-test^='ticket-indicator-']").should("have.length", tickets.length);
  });

  it("Should display available ticket button correctly", () => {
    // Find a ticket with a URL and navigate to it
    const availableTicketIndex = tickets.findIndex(ticket => ticket.url);
    
    if (availableTicketIndex !== -1) {
      // Navigate to the available ticket if not already there
      if (availableTicketIndex > 0) {
        for (let i = 0; i < availableTicketIndex; i++) {
          cy.getTestData("next-ticket-button").click();
        }
      }
      
      // Check the button exists and contains correct text
      cy.getTestData("ticket-button").should("be.visible");
      cy.getTestData("ticket-button").should("contain", "Get a Ticket");
      
      // Check the button links to the correct URL
      cy.getTestData("ticket-button")
        .parent("a")
        .should("have.attr", "href", tickets[availableTicketIndex].url);
    } else {
      cy.log("No available tickets found - skipping available button test");
    }
  });
});