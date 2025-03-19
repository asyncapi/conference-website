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
    // Move directly to the last ticket
    cy.getTestData(`ticket-card-${tickets.length}`).should("be.visible");
  
    cy.getTestData("next-ticket-button").click();
    cy.getTestData("ticket-card-1").should("be.visible");
  });
  

  it("Should loop to the last ticket when clicking previous at the first ticket", () => {
    cy.getTestData("prev-ticket-button").click();
    
    cy.getTestData(`ticket-card-${tickets.length}`).should("be.visible");
  });

  describe("Ticket Indicator Navigation", () => {
    [3, 2, 1].forEach((num) => {
      it(`Should navigate to the correct ticket when clicking indicator (${num} tickets)`, () => {
        if (tickets.length >= num) {
          cy.getTestData(`ticket-indicator-${num}`).click();
          cy.getTestData(`ticket-card-${num}`).should("be.visible");
          cy.getTestData("ticket-title").should("contain", tickets[num - 1].type);
        } else {
          cy.log(`Not enough tickets to test indicator ${num} - skipping this test`);
        }
      });
    });
  });
  

  it("Should display the correct number of indicators", () => {
    cy.get("[data-test^='ticket-indicator-']").should("have.length", tickets.length);
  });

  it("Should display available ticket button correctly", () => {
    const availableTicketIndex = tickets.findIndex(ticket => ticket.url);
    
    if (availableTicketIndex !== -1) {
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