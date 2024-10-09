import cities from "../../config/city-lists.json"

it("should render guideline for not ended cities and agenda otherwise",()=>{
    cy.wrap(cities).each(city => {
        cy.visit(`http://localhost:3000/venue/${city.name}`);
        
        cy.getTestData(`venue-${city.name}`).then(val=>{
            
            if(!city.ended){
                cy.getTestData("guideline-com").should("be.visible");
            }
            else{
                cy.getTestData("agenda-com").should("be.visible");
            }
        });
           
    })

});

it.only("Form should work",()=>{
    cy.visit('http://localhost:3000/venue/online/register');

    cy.getTestData("cfp-form").should('be.visible');

    cy.getTestData("step-one").should("be.visible");

    cy.getTestData("step-one-name").type("test");

    cy.getTestData("step-one-email").type("test@test.com");

    cy.getTestData("step-one-bio").type("testing the bio section");

    cy.getTestData("step-one-social").type("http://localhost:3000/venue/online/register");

    cy.getTestData("step-one-next").click();

    cy.getTestData("step-two").should("be.visible");

    cy.getTestData("step-two-title").type("test");

    cy.getTestData("step-two-description").type("test");

    cy.getTestData("step-two-next").click();

    cy.get(".step-three-format").should("be.visible").type("{enter}");

    cy.get(".step-three-level").should("be.visible").type("{enter}");

    cy.getTestData("step-three-next").click();

    cy.getTestData("step-four-additional").should("be.visible").type("testing additional info");

    cy.getTestData("step-four-next").click();

    // finally intercept the request and return success

})
