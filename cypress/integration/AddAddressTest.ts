import { AddAddressData } from '../support/Base/pagedata/AddAddressData';
import * as addAddressPage from '../support/Base/pages/AddAddress.po';

let address = '';

describe('Search address test', () => {
  before(() => {
    address = 'Sofia, Bulgaria';

    cy.visit('http://localhost:4200/');
  });

  it('Should show error field when address is empty', () => {
    addAddressPage.searchButtonClick();
    addAddressPage.errorFieldExists();
  });

  it('Should be able to find address', () => {
    addAddressPage.inputFieldExists();
    addAddressPage.enterInputData(AddAddressData.defaultAddress);
    addAddressPage.searchButtonExists();
    addAddressPage.searchButtonClick();
    addAddressPage.clearInputData();
    addAddressPage.enterInputData(address);
    addAddressPage.searchButtonClick();
  });
});
