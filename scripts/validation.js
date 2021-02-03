const validationParams = {
  inputSelector: '.popup__input_type_text',
  buttonSelector: '.popup__input_type_submit',
  activeErrorSelector: 'popup__validation-error_active',
  inputErrorSelector: 'popup__input_type_error',
};

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
  inputElement.classList.add(params.inputErrorSelector);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(params.activeErrorSelector);
}

function hideInputError(formElement, inputElement, params) {
  // Hide validation message if input is valid.
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(params.inputErrorSelector);
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

function setEventListeners(formElement, params) {
  // Set validity handlers for input fields.
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.buttonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, params);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation(params) {
  // Set validation logic for every form.
  const formList = Array.from(document.forms);
  formList.forEach(formElement => setEventListeners(formElement, params));
}

enableValidation(validationParams);
