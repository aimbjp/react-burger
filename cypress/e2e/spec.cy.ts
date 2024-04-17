// Выносим селекторы в константы
const SELECTORS = {
  ingredientDraggable: '[data-testid="ingredient-draggable"]',
  constructorArea: '[data-testid="constructor-area"]',
  constructorElementImage: '[class*="constructor-element__image"]',
  orderButton: '[data-testid="order-button"]',
  modalRoot: '#modal-root',
  modalClose: '[data-testid="modal-close"]'
};

describe('Constructor', () => {
  beforeEach(() => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" }).as("userData");
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");

    window.localStorage.setItem("refreshToken", JSON.stringify("refreshToken"));
    window.localStorage.setItem("accessToken", JSON.stringify("accessToken"));

    cy.visit('/');

  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  it('allows a user to drag and drop an ingredient', () => {
    cy.wait(200);
    cy.get(SELECTORS.ingredientDraggable).first().trigger("dragstart");
    cy.get(SELECTORS.constructorArea).trigger("drop");

    cy.get(SELECTORS.ingredientDraggable).last().trigger("dragstart");
    cy.get(SELECTORS.constructorArea).trigger("drop");

    cy.get(SELECTORS.constructorElementImage).should("have.length", 3);
    cy.get(SELECTORS.constructorElementImage).first().should("have.attr", "src", "https://code.s3.yandex.net/react/code/bun-02.png");
    cy.get(SELECTORS.constructorElementImage).eq(1).should("have.attr", "src", "https://code.s3.yandex.net/react/code/cheese.png");

    cy.get(SELECTORS.orderButton).click();
    cy.get(SELECTORS.modalRoot).should("have.text", "123456идентификатор заказаВаш заказ начали готовитьДождитесь готовности на орбитальной станции");
    cy.get(SELECTORS.modalRoot).children().should("have.length.at.least", 1);
    cy.get(SELECTORS.modalClose).click();
    cy.get(SELECTORS.modalRoot).children().should("have.length", 0);
  });

  it('should open modal with ingredient', () => {
    cy.get(SELECTORS.ingredientDraggable).first().click();
    cy.get(SELECTORS.modalRoot).should("have.text", "Детали ингредиентаКраторная булка N-200iКалории, ккал420Белки, г80Жиры, г24Углеводы, г53");
    cy.get(SELECTORS.modalRoot).children().should("have.length.at.least", 1);
    cy.get(SELECTORS.modalClose).click();
    cy.get(SELECTORS.modalRoot).children().should("have.length", 0);
  });
})
