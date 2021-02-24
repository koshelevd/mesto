import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initial-cards.js';

const cardsContainer = document.querySelector('.cards');
const popupImage = document.querySelector('.popup_type_image');
const photoElement = popupImage.querySelector('.popup__image');
const photoCaption = popupImage.querySelector('.popup__caption');
const userName = document.querySelector('.user-info__name');
const userDescription = document.querySelector('.user-info__description');
const editButton = document.querySelector('.button_type_edit');
const addButton = document.querySelector('.button_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const closeButtonEditPopup = popupEdit.querySelector('.button_type_close');
const closeButtonAddPopup = popupAdd.querySelector('.button_type_close');
const closeButtonImagePopup = popupImage.querySelector('.button_type_close');
const nameField = popupEdit.querySelector('.popup__input_type_text[name=input-name]');
const descriptionField = popupEdit.querySelector('.popup__input_type_text[name=input-description]');
const titleField = popupAdd.querySelector('.popup__input_type_text[name=input-title]');
const linkField = popupAdd.querySelector('.popup__input_type_text[name=input-link]');
const formEditProfile = popupEdit.querySelector('.popup__form');
const formAddCard = popupAdd.querySelector('.popup__form');
const validationParams = {
  inputSelector: '.popup__input_type_text',
  buttonSelector: '.popup__input_type_submit',
  activeErrorSelector: 'popup__validation-error_active',
  inputErrorSelector: 'popup__input_type_error',
};
const formEditValidator = new FormValidator(validationParams, formEditProfile);
const formAddValidator = new FormValidator(validationParams, formAddCard);

function handleEscapePressed(event) {
  // Close popup if 'Esc' is pressed.
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function closePopup(popup) {
  // Close the popup.
  document.removeEventListener('keydown', handleEscapePressed);
  popup.classList.remove('popup_opened');
}

function handleOverlayClick(event) {
  // Close popup if clicked outside of the form.
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

function openPopup(popup) {
  // Open the popup.
  document.addEventListener('keydown', handleEscapePressed);
  popup.classList.add('popup_opened');
}

function handleOpenImagePopup(data) {
  // Initialize image parameters and caption then show popup.
  photoElement.src = data.link;
  photoElement.alt = data.name;
  photoCaption.textContent = data.name;
  openPopup(popupImage);
}

function renderCard(container, data) {
  // Add card to container.
  const card = new Card(data, '#card-template', handleOpenImagePopup);
  container.prepend(card.create());
}

function handleEditButtonClick() {
  // Open edit profile popup, initialize field values and toggle button state.
  const inputList = [nameField, descriptionField];
  nameField.value = userName.textContent;
  descriptionField.value = userDescription.textContent;

  inputList.forEach((inputElement) => {
    formEditValidator.checkInputValidity(inputElement);
  });
  formEditValidator.toggleButtonState();
  openPopup(popupEdit);
}

function handleEditFormSubmit(event) {
  // Save values and close popup.
  event.preventDefault();
  userName.textContent = nameField.value;
  userDescription.textContent = descriptionField.value;
  closePopup(popupEdit);
}

function handleAddButtonClick() {
  // Open add card popup and toggle button state.
  formAddValidator.toggleButtonState();
  openPopup(popupAdd);
}

function handleAddFormSubmit(event) {
  // Create the card and close popup.
  event.preventDefault();
  renderCard(cardsContainer,
    {
      name: titleField.value,
      link: linkField.value,
    });
  formAddCard.reset();
  closePopup(popupAdd);
}

// Set elements' click handlers.
editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);
closeButtonEditPopup.addEventListener('click', () => closePopup(popupEdit));
closeButtonAddPopup.addEventListener('click', () => closePopup(popupAdd));
closeButtonImagePopup.addEventListener('click', () => closePopup(popupImage));
popupEdit.addEventListener('mousedown', handleOverlayClick);
popupAdd.addEventListener('mousedown', handleOverlayClick);
popupImage.addEventListener('mousedown', handleOverlayClick);
formEditProfile.addEventListener('submit', handleEditFormSubmit);
formAddCard.addEventListener('submit', handleAddFormSubmit);

// Enable validation.
formEditValidator.enableValidation();
formAddValidator.enableValidation();

// Create cards specified in initial-cards.js
initialCards.forEach(item => renderCard(cardsContainer, item));
