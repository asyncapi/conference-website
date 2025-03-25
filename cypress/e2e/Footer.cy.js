describe("Footer links", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Footer Should be visible", () => {
    cy.get('[data-testid="footer"]').should("be.visible");
  });

  it("Footer Should contain Code of Conduct", () => {
    cy.get('[data-testid="footer"]').contains("Code of Conduct");
  });

  it("Code of Conduct should redirect to the correct page", () => {
    cy.get('[data-testid="footer-CodeOfConduct"]').invoke("removeAttr", "target").click();

    cy.origin("https://github.com", () => {
      cy.url().should("include", "/asyncapi/community/blob/master/CODE_OF_CONDUCT.md");
    });
  });

  it("GitHub should redirect to correct page", () => {
    cy.get('[data-testid="footer-Github"]').invoke("removeAttr", "target").click();

    cy.origin("https://github.com", () => {
      cy.url().should("eq", "https://github.com/asyncapi");
    });
  });

  it("LinkedIn should redirect to correct page", () => {
    cy.get('[data-testid="footer-LinkedIn"]').invoke("removeAttr", "target").click();

    cy.origin("https://www.linkedin.com", () => {
      cy.url().should("eq", "https://www.linkedin.com/company/asyncapi/");
    });
  });

  it("Twitter (X) should redirect to correct page", () => {
    cy.get('[data-testid="footer-Twitter"]').invoke("removeAttr", "target").click();

    cy.origin("https://x.com", () => {
      cy.url().should("match", /.*asyncapispec.*/);
    });
  });

  it("Should contain AsyncAPI Conference Logo", () => {
    cy.get('[data-testid="footer-asyncAPI-logo"]').should("be.visible");
  });
});
