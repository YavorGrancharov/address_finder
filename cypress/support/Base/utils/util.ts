export const clickButton = (el) => {
  cy.get(el, { timeout: 40000 }).click();
};

export const enterInput = (el, data) => {
  cy.get(el, { timeout: 40000 }).type(data);
};

export const verifyElementIsVisible = (el) => {
  cy.get(el, { timeout: 40000 }).should('be.visible');
};

export const clearInputField = (el) => {
  cy.get(el).clear();
};
