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
const popupFormEdit = popupEdit.querySelector('.popup__form');
const saveProfileButton = popupFormEdit.querySelector('.popup__input_type_submit');
const popupFormAdd = popupAdd.querySelector('.popup__form');
const saveCardButton = popupFormAdd.querySelector('.popup__input_type_submit');
const cardTemplate = document.querySelector('#card-template').content;

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

function handleLikeCard(event) {
  // Toggle like button state.
  event.target.classList.toggle('button_type_like-active');
}

function handleDeleteCard(event) {
  // Remove card from page.
  event.target.closest('.card').remove();
}

function createCard(data) {
  // Create card and initialize its elements. Return DOM card element.
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardHeader = cardElement.querySelector('.card__header');
  const buttonLike = cardElement.querySelector('.card__like');
  const buttonDelete = cardElement.querySelector('.card__delete');

  cardHeader.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardImage.addEventListener('click', () => handleOpenImagePopup(data));
  buttonLike.addEventListener('click', handleLikeCard);
  buttonDelete.addEventListener('click', handleDeleteCard);

  return cardElement;
}

function renderCard(container, card) {
  // Add card to container.
  container.prepend(createCard(card));
}

function handleEditButtonClick() {
  // Open edit profile popup, initialize field values and toggle button state.
  nameField.value = userName.textContent;
  descriptionField.value = userDescription.textContent;
  toggleButtonState([nameField, descriptionField], saveProfileButton);
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
  toggleButtonState([titleField, linkField], saveCardButton);
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
  popupFormAdd.reset();
  closePopup(popupAdd);
}

// Set elements' click handlers.
editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);
closeButtonEditPopup.addEventListener('click', () => closePopup(popupEdit));
closeButtonAddPopup.addEventListener('click', () => closePopup(popupAdd));
closeButtonImagePopup.addEventListener('click', () => closePopup(popupImage));
popupEdit.addEventListener('click', handleOverlayClick);
popupAdd.addEventListener('click', handleOverlayClick);
popupImage.addEventListener('click', handleOverlayClick);
popupFormEdit.addEventListener('submit', handleEditFormSubmit);
popupFormAdd.addEventListener('submit', handleAddFormSubmit);

// Create cards specified in initial-cards.js
initialCards.forEach(item => renderCard(cardsContainer, item));
