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
  validationParams,
} from '../utils/constants.js';

const profile = new UserInfo('.user-info__name', '.user-info__description');
const popupImage = new PopupWithImage('.popup_type_image');
const popupAddForm = new PopupWithForm('.popup_type_add', handleAddFormSubmit);
const popupEditForm = new PopupWithForm('.popup_type_edit', handleEditFormSubmit);
const nameField = popupEditForm.form.querySelector('.popup__input_type_text[name=input-name]');
const descriptionField = popupEditForm.form.querySelector('.popup__input_type_text[name=input-description]');
const formEditValidator = new FormValidator(validationParams, popupEditForm.form);
const formAddValidator = new FormValidator(validationParams, popupAddForm.form);
const cardsList = new Section({ renderer: renderCard }, '.cards');
const api = new Api(apiOptions);

function renderCard(data) {
  // Create new card and add it to container.
  const card = new Card(data, '#card-template', () => popupImage.open(data), profile.id, api);
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

function handleEditFormSubmit(values) {
  // Save values and close popup.

  // data?
  const data = {
    name: values['input-name'],
    about: values['input-description'],
  };

  api.editProfileInfo(data)
    .then((result) => {
      profile.setUserInfo(result);
    })
    .catch((err) => {
      console.log(err);
    });

  this.close();
}

function handleAddFormSubmit(values) {
  // Create the card and close popup.
  

  const data = {
    name: values['input-title'],
    link: values['input-link'],
  };

  api.addCard(data)
    .then((result) => {
      console.log(result);
      renderCard(result);
    })
    .catch((err) => {
      console.log(err);
    });
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
[popupImage, popupAddForm, popupEditForm].forEach(popup => popup.setEventListeners());
editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);

// Enable validation.
[formEditValidator, formAddValidator].forEach(validator => validator.enableValidation());

// Create initial cards.
api.getInitialCards()
  .then((result) => {
    cardsList.items = result;
    cardsList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
