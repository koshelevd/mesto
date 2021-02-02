function hasInvalidInput(inputList) {
  // Return true if input in list is valid, false otherwise.
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
  // Disable submit button if list has invalid input, enable otherwise.
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.removeAttribute('disabled');
  }
}

function showInputError(formElement, inputElement, params) {
  // Show validation message if input is not valid.
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(params.activeErrorSelector);
}

function hideInputError(formElement, inputElement, params) {
  // Hide validation message if input is valid.
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  errorElement.classList.remove(params.activeErrorSelector);
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, params) {
  // Check whether input valid or not.
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
}

function handleInput(inputElement, formElement, params) {
  // Handle input validity.
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.buttonSelector);
  checkInputValidity(formElement, inputElement, params);
  toggleButtonState(inputList, buttonElement);
}

function setEventListeners(formElement, params) {
  // Set validity handlers for input fields.
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  inputList.forEach(inputElement => inputElement.addEventListener('input', () => handleInput(inputElement, formElement, params)));
}

function enableValidation(params) {
  // Set validation logic for every form.
  const formList = Array.from(document.forms);
  formList.forEach(formElement => setEventListeners(formElement, params));
}

enableValidation({
  inputSelector: '.popup__input_type_text',
  buttonSelector: '.popup__input_type_submit',
  activeErrorSelector: 'popup__validation-error_active',
});
