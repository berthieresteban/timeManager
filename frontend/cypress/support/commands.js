// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import administrator from '../fixtures/administrator.json';
import manager from '../fixtures/manager.json';
import superManager from '../fixtures/superManager.json';
import employee from '../fixtures/employee.json';

Cypress.Commands.add("createUser", fixt => {
  let user = null;
  switch (fixt) {
    case 'employee':
      user = employee;
      break;
    case 'manager':
      user = manager;
      break;
    case 'superManager':
      user = superManager;
      break;
    case 'administrator':
      user = administrator;
      break;
    default:
      break;
  }
  if (!user) { return; }

  cy.request({
    url: `http://localhost:4000/auth`,
    method: 'POST',
    body: {
      "auth": {
        username: 'admin',
        password: 'admin'
      }
    }
  }).its('body')
    .then((body) => {
      cy.log(JSON.stringify(body));

      Cypress.env('token', body.token);
    })
    .then(() => {
      cy.request({
        url: `http://localhost:4000/api/users`,
        method: 'POST',
        headers: {'session_jwt': Cypress.env('token')},
        body: {
          "user": user
        }
      }).its('body')
        .then((body) => {
          cy.log(JSON.stringify(body));
        })
    })
});


