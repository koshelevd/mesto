export default class FormValidator {
  constructor(params, form) {
    this._formElement = form;
    this._inputSelector = params.inputSelector;
    this._buttonSelector = params.buttonSelector;
    this._activeErrorSelector = params.activeErrorSelector;
    this._inputErrorSelector = params.inputErrorSelector;
  }

  _hasInvalidInput() {
    // Return true if input in list is valid, false otherwise.
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  toggleButtonState() {
    // Disable submit button if list has invalid input, enable otherwise.
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', 'true');
    } else {
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _showInputError(inputElement) {
    // Show validation message if input is not valid.
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorSelector);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._activeErrorSelector);
  }

  _hideInputError(inputElement) {
    // Hide validation message if input is valid.
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorSelector);
    errorElement.classList.remove(this._activeErrorSelector);
    errorElement.textContent = '';
  }

  checkInputValidity(inputElement) {
    // Check whether input valid or not.
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  enableValidation() {
    // Set validity handlers for input fields.
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._buttonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }
}
