describe("Navbar links", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should redirect to about", () => {
    // Click on the navbar link that you want to test
    cy.get("nav").contains("Home").click(); // Replace 'Home' with the text of your navbar link

    // Assert that the current URL matches the expected URL
    cy.url().should("eq", "http://example.com/home"); // Replace 'http://example.com/home' with the expected URL

    // Repeat the above steps for other navbar links if needed
    // ...

    // Add more assertions or tests as needed
  });
});
