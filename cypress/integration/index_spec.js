describe("My First Test", () => {
  it("finds an existing country", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Click on a country that exists
    cy.get('a[href*="bra"]').click();

    // Opens a page with country details
    cy.url().should("include", "/bra");

    // Click on bordering country
    cy.contains("Argentina").click();

    //Go back to home
    cy.get("a").contains("Back to results").click();
  });
});
