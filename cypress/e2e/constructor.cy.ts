beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  cy.visit('http://localhost:4000');
});

describe('проверяем доступность приложения', () => {
  it('сервис должен быть доступен по адресу localhost:4000', () => {
    cy.visit('http://localhost:4000');
  });
});

describe('проверка конструктора', () => {
  it('проверка добавления и замены булки при добавлении', () => {
    cy.get(`[data-cy=ingredient_0]`).contains('Добавить').click();
    cy.get(`[data-cy=ingredient_1]`).contains('Добавить').click();

    cy.get(`[data-cy=construcror]`).contains('Булочка_2');
  });

  it('проверка добавления нескольких ингредиентов', () => {
    cy.get(`[data-cy=ingredient_1]`).contains('Добавить').click();
    cy.get(`[data-cy=ingredient_2]`).contains('Добавить').click();
    cy.get(`[data-cy=ingredient_3]`).contains('Добавить').click();

    cy.get(`[data-cy=construcror]`).contains('Булочка_2');
    cy.get(`[data-cy=construcror]`).contains('Ингредиент_1');
    cy.get(`[data-cy=construcror]`).contains('Соус');
  });
});
