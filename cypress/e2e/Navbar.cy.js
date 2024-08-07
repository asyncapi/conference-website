describe("Navbar links", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should redirect to about", () => {
    // Click on the navbar link that you want to test   
    cy.getTestData("nav-About").click();

    // Assert that the current URL matches the expected URL
    cy.url().should("eq", "http://localhost:3000/#about");
    cy.getTestData("about-section").should("be.visible");

  });

  it("should redirect to speakers", () => {

    cy.getTestData("nav-Speakers").click();

    cy.url().should("eq", "http://localhost:3000/#speakers");
    cy.getTestData("speakers-section").should("be.visible");

  });

  it("should redirect to sponsors", () => {

    cy.getTestData("nav-Sponsors").click();

    cy.url().should("eq", "http://localhost:3000/#sponsors");
    cy.getTestData("sponsor-section").should("be.visible");

  });

  it("should redirect to home", () => {

    cy.getTestData("nav-Home").click();

    cy.url().should("eq", "http://localhost:3000/");

  });

});
