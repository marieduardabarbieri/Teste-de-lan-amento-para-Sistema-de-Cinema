describe("Release Testing - Sistema de Cinema", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("deve comprar um assento disponível", () => {
    cy.get("#assento").select("A1");

    cy.get("#comprar").click();

    cy.get("#mensagem").should("contain", "Compra realizada");
  });

  it("não deve permitir comprar um assento já ocupado", () => {
    cy.get("#assento").select("A2");

    cy.get("#comprar").click();

    cy.get("#mensagem").should("contain", "Compra realizada");

    cy.get("#comprar").click();

    cy.get("#mensagem").should("contain", "Assento indisponível");
  });

  it("deve cancelar uma compra", () => {
    cy.get("#assento").select("A3");

    cy.get("#comprar").click();

    cy.get("#cancelar").click();

    cy.get("#mensagem").should("contain", "Compra cancelada");
  });

  it("deve permitir comprar novamente após cancelamento", () => {
    cy.get("#assento").select("A4");

    cy.get("#comprar").click();

    cy.get("#cancelar").click();

    cy.get("#comprar").click();

    cy.get("#mensagem").should("contain", "Compra realizada");
  });
});
