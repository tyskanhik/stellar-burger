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

describe('проверка модального окна', () => {
  it('проверка открытия модального окна', () => {
    cy.get(`[data-cy=modal]`).should('not.exist');
    cy.get(`[data-cy=ingredient_2]`).click();
    cy.get(`[data-cy=modal]`).should('be.visible');
  });

  it('проверка что в модальном окне корректные данные', () => {
    cy.get(`[data-cy=ingredient_2]`).click();
    cy.get(`[data-cy=modal]`).contains('Ингредиент_1');
  });

  it('проверка закрытия модального окна по крестику', () => {
    cy.get(`[data-cy=ingredient_2]`).click();
    cy.get(`[data-cy=modal-close]`).click();
    cy.get(`[data-cy=modal]`).should('not.exist');
  });

  it('проверка закрытия модального окна по оверлею', () => {
    cy.get(`[data-cy=ingredient_2]`).click();
    cy.get('body').click(0, 0);
    cy.get(`[data-cy=modal]`).should('not.exist');
  });
});
