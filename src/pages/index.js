/* eslint-disable arrow-parens */
/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
import './index.css';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  apiOptions,
  editButton,
  addButton,
  avatarElement,
  validationParams,
} from '../utils/constants.js';

let currentButtonValue;
const profile = new UserInfo('.user-info__avatar', '.user-info__name', '.user-info__description');
const popupImage = new PopupWithImage('.popup_type_image');
const popupAddForm = new PopupWithForm('.popup_type_add', handleAddFormSubmit);
const popupEditForm = new PopupWithForm('.popup_type_edit', handleEditFormSubmit);
const popupAvatarEditForm = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit);
const popupConfirmForm = new PopupWithForm('.popup_type_confirm', handleConfirmFormSubmit);
const nameField = popupEditForm.form.querySelector('.popup__input_type_text[name=input-name]');
const descriptionField = popupEditForm.form.querySelector('.popup__input_type_text[name=input-description]');
const formEditValidator = new FormValidator(validationParams, popupEditForm.form);
const formAddValidator = new FormValidator(validationParams, popupAddForm.form);
const formAvatarEditValidator = new FormValidator(validationParams, popupAvatarEditForm.form);
const cardsList = new Section({ renderer: renderCard }, '.cards');
const api = new Api(apiOptions);

function renderCard(data) {
  // Create new card and add it to container.
  const card = new Card(data,
    '#card-template',
    () => popupImage.open(data),
    handleDeleteCardClick,
    profile.id,
    api);
  cardsList.addItem(card.create());
}

function handleEditButtonClick() {
  // Open edit profile popup, initialize field values and toggle button state.
  const inputList = [nameField, descriptionField];
  const userInfo = profile.getUserInfo();
  nameField.value = userInfo.name;
  descriptionField.value = userInfo.description;

  inputList.forEach((inputElement) => {
    formEditValidator.checkInputValidity(inputElement);
  });
  formEditValidator.toggleButtonState();
  popupEditForm.open();
}

function handleAddButtonClick() {
  // Open add card popup and toggle button state.
  formAddValidator.toggleButtonState();
  popupAddForm.open();
}

function handleAvatarElementClick() {
  // Open edit avatar popup and toggle button state.
  formAvatarEditValidator.toggleButtonState();
  popupAvatarEditForm.open();
}

function handleDeleteCardClick(event, card) {
  // popupConfirmForm.form.elements['input-card-id'].value = cardId;
  popupConfirmForm.cardElement = event.target.closest('.card');
  popupConfirmForm.card = card;
  popupConfirmForm.open();
}

function renderLoading(button, isLoading) {
  // Set form's button value to indicate request's fetching.
  if (isLoading) {
    currentButtonValue = button.value;
    button.value = 'Сохранение...';
  } else {
    button.value = currentButtonValue;
  }
}

function handleEditFormSubmit(values) {
  // Save values and close popup.
  renderLoading(popupEditForm.form.elements['submit-button'], true);
  api.editProfileInfo({
    name: values['input-name'],
    about: values['input-description'],
  })
    .then((result) => {
      profile.setUserInfo(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(popupEditForm.form.elements['submit-button'], false);
    });

  this.close();
}

function handleAddFormSubmit(values) {
  // Create the card and close popup.
  renderLoading(popupAddForm.form.elements['submit-button'], true);
  api.addCard({
    name: values['input-title'],
    link: values['input-link'],
  })
    .then((result) => {
      renderCard(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(popupAddForm.form.elements['submit-button'], false);
    });
  this.close();
}

function handleAvatarFormSubmit(values) {
  // Edit profile image and close popup.
  renderLoading(popupAvatarEditForm.form.elements['submit-button'], true);
  api.editAvatar({
    avatar: values['input-link'],
  })
    .then((result) => {
      profile.setUserInfo(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(popupAvatarEditForm.form.elements['submit-button'], false);
    });
  this.close();
}

function handleConfirmFormSubmit() {
  // Delete card.
  this.card.deleteCard(this.cardElement);
  this.close();
}

// Set initial values for UserInfo object.
api.getProfileInfo()
  .then((result) => {
    profile.setUserInfo(result);
  })
  .catch((err) => {
    console.log(err);
  });

// Set elements' click handlers.
[popupImage, popupAddForm, popupEditForm, popupAvatarEditForm, popupConfirmForm]
  .forEach(popup => popup.setEventListeners());
editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);
avatarElement.addEventListener('click', handleAvatarElementClick);

// Enable validation.
[formEditValidator, formAddValidator, formAvatarEditValidator]
  .forEach(validator => validator.enableValidation());

// Create initial cards.
api.getInitialCards()
  .then((result) => {
    cardsList.items = result;
    cardsList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
