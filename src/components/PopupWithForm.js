/* eslint-disable no-return-assign */
/* eslint-disable arrow-parens */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    // Initialize object.
    super(popupSelector);
    this.form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this.form.querySelectorAll('.popup__input_type_text');
  }

  _getInputValues() {
    // Return object with input fields' values.
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    // Add submit form listener.
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    // Close popup and reset form.
    super.close();
    this.form.reset();
  }
}
