describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
  })
})


describe('Constructor', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept("GET", "api/auth/user", { fixture: "user.json" }).as("userData");

    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");


    window.localStorage.setItem(
        "refreshToken",
        JSON.stringify("refreshToken")
    );
    window.localStorage.setItem(
        "accessToken",
        JSON.stringify("accessToken")
    );

  });

  afterEach(() => {
    cy.clearLocalStorage();
  });


  it('allows a user to drag and drop an ingredient', () => {

    cy.get("[data-testid=\"ingredient-draggable\"]")
        .first()
        .trigger("dragstart");

    cy.get('[data-testid="constructor-area"]').trigger("drop");

    cy.get("[data-testid=\"ingredient-draggable\"]")
        .last()
        .trigger("dragstart");

    cy.get('[data-testid="constructor-area"]').trigger("drop");


    cy.get('[class*="constructor-element__image"]').should("have.length", 3);
    cy.get('[class*="constructor-element__image"]').first().should("have.attr", "src", "https://code.s3.yandex.net/react/code/bun-02.png");
    cy.get('[class*="constructor-element__image"]').eq(1).should("have.attr", "src", "https://code.s3.yandex.net/react/code/cheese.png");



    cy.get("[data-testid=\"order-button\"]").click();
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");
    cy.get('[id="modal-root"]').should("have.text", "123456идентификатор заказаВаш заказ начали готовитьДождитесь готовности на орбитальной станции");
    cy.get('[id="modal-root"]').children().should("have.length.at.least",1);
    cy.get("[data-testid=\"modal-close\"]").click();
    cy.get('[id="modal-root"]').children().should("have.length",0);


  });

  it('should open modal with ingredient', () => {
    cy.get("[data-testid=\"ingredient-draggable\"]").first().click();

    cy.get('[id="modal-root"]').should("have.text", "Детали ингредиентаКраторная булка N-200iКалории, ккал420Белки, г80Жиры, г24Углеводы, г53");
    cy.get('[id="modal-root"]').children().should("have.length.at.least",1);
    cy.get("[data-testid=\"modal-close\"]").click();


    // cy.get('body').type('{esc}');
    cy.get('[id="modal-root"]').children().should("have.length",0);
  });


})