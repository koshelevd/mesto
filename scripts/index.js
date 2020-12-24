let editButton = document.querySelector('.button_type_edit');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.button_type_close');
let nameField = popup.querySelector('.popup__input_type_text[name=input-name]');
let userName = document.querySelector('.user-info__name');
let descriptionField = popup.querySelector('.popup__input_type_text[name=input-description]');
let userDescription = document.querySelector('.user-info__description');
let popupForm = popup.querySelector('.popup__form');


function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function handleFormSubmit (event) {
  event.preventDefault();
  userName.textContent = nameField.value;
  userDescription.textContent = descriptionField.value;
  togglePopup();
}

function openEditForm() {
  nameField.value = userName.textContent;
  descriptionField.value = userDescription.textContent;
  togglePopup();
}

function closePopup(event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
}


editButton.addEventListener('click', openEditForm);

closeButton.addEventListener('click', togglePopup);

popupForm.addEventListener('submit', handleFormSubmit); 

popup.addEventListener('click', closePopup);