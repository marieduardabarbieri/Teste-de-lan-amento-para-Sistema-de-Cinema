describe("Release Testing - Cinema", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("deve comprar um assento disponível", () => {
    cy.get("#assento").select("A1");

    cy.get("#comprar").click();

    cy.get("#mensagem").should("contain", "Compra realizada");
  });
});
