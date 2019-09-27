
describe('employee tests', () => {

  before(() => {
    cy.createUser('superManager');
    cy.wait(2000);
  });

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.wait(2000);
  });

  it('should log in', function () {
    cy.fixture(`employee.json`).as('fixt')
      .then(() => {
        cy.visit('/');
        cy.contains('Username').parent().children().first().next().type(this.fixt.username);
        cy.contains('Password').parent().children().first().next().type(this.fixt.password);
        cy.get('.v-card__actions').children().first().click();
      })
    cy.wait(2000);
  });

  it('Should Clock IN / Clock OUT', function () {
    cy.fixture(`employee.json`).as('fixt')
      .then(() => {
        cy.visit('/');
        cy.contains('Username').parent().children().first().next().type(this.fixt.username);
        cy.contains('Password').parent().children().first().next().type(this.fixt.password);
        cy.get('.v-card__actions').children().first().click();
      }).then(() => {
        cy.contains("Clock'")
      }).then(() => {
        cy.contains("Clock'")
      })
    cy.wait(2000);
  });

  it('Should Display good Informations', function () {
    cy.fixture(`employee.json`).as('fixt')
      .then(() => {
        cy.visit('/');
        cy.contains('Username').parent().children().first().next().type(this.fixt.username);
        cy.contains('Password').parent().children().first().next().type(this.fixt.password);
        cy.get('.v-card__actions').children().first().click();
      }).then(() => {
        cy.get('.fa-bars').click();
      }).then(() => {
        cy.contains(this.fixt.email)
      }).then(() => {
        cy.contains(this.fixt.username)
      }).then(() => {
        cy.contains("Employee TimeManager")
      })
    cy.wait(2000);
  });

  it('Should Set Dark Mode', function () {
    cy.fixture(`employee.json`).as('fixt')
      .then(() => {
        cy.visit('/');
        cy.contains('Username').next().type(this.fixt.username);
        cy.contains('Password').next().type(this.fixt.password);
        cy.get('.v-card__actions').children().first().click();
      }).then(() => {
        cy.get('.fa-bars').click();
      }).then(() => {
        cy.get('[type="checkbox"]').next().click()
      }).then(() => {
        cy.get('.hello').should('have.css', 'color').and('equal', 'rgb(44, 62, 80)')
      })
    cy.wait(2000);
  });

  it('Should access WorkingTimes', function () {
    cy.fixture(`employee.json`).as('fixt')
      .then(() => {
        cy.visit('/');
        cy.contains('Username').next().type(this.fixt.username);
        cy.contains('Password').next().type(this.fixt.password);
        cy.get('.v-card__actions').children().first().click();
      }).then(() => {
        cy.get('.fa-bars').click();
      }).then(() => {
        cy.contains('Working Times').click()
      }).then(() => {
        cy.contains(`Dashboard of ${this.fixt.username}`);
      })
    cy.wait(2000);
  });

  it('Should Access Chart Management', function () {
    cy.fixture(`employee.json`).as('fixt')
      .then(() => {
        cy.visit('/');
        cy.contains('Username').next().type(this.fixt.username);
        cy.contains('Password').next().type(this.fixt.password);
        cy.get('.v-card__actions').children().first().click();
      }).then(() => {
        cy.get('.fa-bars').click();
      }).then(() => {
        cy.contains('Chart Manager').click()
      }).then(() => {
        cy.contains('Area Chart');
        cy.contains('Bar Chart');
        cy.contains('Line Chart');
        cy.contains('Donut Chart');
      })
    cy.wait(2000);
  });

  it('Should Access Edit Account', function () {
    cy.fixture(`employee.json`).as('fixt')
      .then(() => {
        cy.visit('/');
        cy.contains('Username').next().type(this.fixt.username);
        cy.contains('Password').next().type(this.fixt.password);
        cy.get('.v-card__actions').children().first().click();
      }).then(() => {
        cy.get('.fa-bars').click();
      }).then(() => {
        cy.contains('Edit Account').click()
      }).then(() => {
        cy.contains('Update Account Informations');
      })
    cy.wait(2000);
  });
});
