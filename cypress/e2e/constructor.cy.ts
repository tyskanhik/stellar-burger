import token from '../fixtures/user.json';

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  cy.visit('/');
});

describe('проверяем доступность приложения', () => {
  it('сервис должен быть доступен по адресу localhost:4000', () => {
    cy.visit('/');
  });
});

const DOM = {
  bun_1: `[data-cy=ingredient_0]`,
  bun_2: `[data-cy=ingredient_1]`,
  main: `[data-cy=ingredient_2]`,
  sauce: `[data-cy=ingredient_3]`,
  constructor: `[data-cy=construcror]`,
  modal: `[data-cy=modal]`,
  submitOrder: `[data-cy=checkout]`
};

describe('проверка конструктора', () => {
  it('проверка добавления и замены булки при добавлении', () => {
    cy.search(DOM.bun_1, 'Добавить').click();
    cy.search(DOM.bun_2, 'Добавить').click();

    cy.search(DOM.constructor, 'Булочка_2');
  });

  it('проверка добавления нескольких ингредиентов', () => {
    cy.search(DOM.bun_2, 'Добавить').click();
    cy.search(DOM.main, 'Добавить').click();
    cy.search(DOM.sauce, 'Добавить').click();

    cy.search(DOM.constructor, 'Булочка_2');
    cy.search(DOM.constructor, 'Ингредиент_1');
    cy.search(DOM.constructor, 'Соус');
  });
});

describe('проверка модального окна', () => {
  it('проверка открытия модального окна', () => {
    cy.modal('not.exist');
    cy.get(DOM.main).click();
    cy.modal('be.visible');
  });

  it('проверка что в модальном окне корректные данные', () => {
    cy.get(DOM.main).click();
    cy.search(DOM.modal, 'Ингредиент_1');
  });

  it('проверка закрытия модального окна по крестику', () => {
    cy.get(DOM.main).click();
    cy.get(`[data-cy=modal-close]`).click();
    cy.modal('not.exist');
  });

  it('проверка закрытия модального окна по оверлею', () => {
    cy.get(DOM.main).click();
    cy.get('body').click(0, 0);
    cy.modal('not.exist');
  });
});

describe('проверка оформления заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });
    localStorage.setItem('refreshToken', token.refreshToken);
    cy.setCookie('accessToken', token.accessToken);
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
  });

  after(() => {
    localStorage.clear();
    cy.clearCookie('accessToken');
  });

  it('проверка отправки заказа', () => {
    cy.search(DOM.bun_2, 'Добавить').click();
    cy.search(DOM.main, 'Добавить').click();
    cy.search(DOM.sauce, 'Добавить').click();

    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'submitOrder'
    );
    cy.search(DOM.submitOrder, 'Оформить заказ').click();
    cy.wait('@submitOrder')
      .its('request.body')
      .should('deep.equal', { ingredients: ['1', '2', '3'] });

    cy.modal('be.visible');
    cy.search(DOM.modal, '1111').click();
    cy.get('body').click(0, 0);
    cy.modal('not.exist');

    cy.get(`[data-cy=construcror]`).contains('ul').should('have.length', 0);
    cy.search(DOM.constructor, 'ul').should('have.length', 0);
    cy.search(DOM.constructor, 'Выберите булки').click();
  });
});
