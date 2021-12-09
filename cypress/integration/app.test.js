
describe('App should', () => {
    before(() => {
        cy.visit('http://localhost:3000/');
    });

    it('display search bar', () => {
        cy.get('[data-cy=search-bar]').should('exist');
    });

});

describe('After clicking location icon app should', () => {
    before(() => {
        cy.visit('http://localhost:3000/');
        cy.get('[data-cy=location-button]').click();
    });

    it('display weather info', () => {
        cy.get('[data-cy=weather-body]').should('exist');
        cy.get('[data-cy=weather-body]').contains('Current');
        cy.get('[data-cy=weather-body]').contains('High');
    });
});

describe('Weather should', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('be visible by hitting return', () => {
        const newPlace = 'Berlin';
        cy.get('[data-cy=place-textField]').type(`${newPlace}{enter}`);
        cy.get('[data-cy=weather-body]').contains(newPlace).should('be.visible');
    });

    it('be visible by clicking search button', () => {
        const newPlace = 'Berlin';
        cy.get('[data-cy=place-textField]').type(newPlace);
        cy.get('[data-cy=place-search-button]').click();
        cy.get('[data-cy=weather-body]').contains(newPlace).should('be.visible');
    });
});
