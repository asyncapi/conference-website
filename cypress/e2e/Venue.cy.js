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
