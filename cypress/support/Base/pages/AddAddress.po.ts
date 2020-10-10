import {
  enterInput,
  verifyElementIsVisible,
  clickButton,
  clearInputField,
} from '../utils/util';
import { AddAddress } from '../pageobject/AddAddressObject';

export const inputFieldExists = () => {
  verifyElementIsVisible(AddAddress.placeInput);
};

export const enterInputData = (data) => {
  enterInput(AddAddress.placeInput, data);
};

export const searchButtonExists = () => {
  verifyElementIsVisible(AddAddress.searchButton);
};

export const searchButtonClick = () => {
  clickButton(AddAddress.searchButton);
};

export const clearInputData = () => {
  clearInputField(AddAddress.placeInput);
};

export const errorFieldExists = () => {
  verifyElementIsVisible(AddAddress.errorField);
}
