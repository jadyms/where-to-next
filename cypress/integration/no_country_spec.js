describe("My First Test", () => {
  it("display 404 page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/jhkglhj");

    // Force a 404 error
    cy.contains('a[href*="jhkglhj"]').should("not.exist");

    // Display 404 page and click link to redirect
    cy.contains("Click here to go back", { timeout: 60000 }).click();

    //Should go back to home
    cy.url().should("eq", "http://localhost:3000/");
  });
});
