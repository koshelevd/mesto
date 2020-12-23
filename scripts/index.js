let editButton = document.querySelector('.button_type_edit');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.button_type_close');
let nameField = popup.querySelector('.popup__name');
let userName = document.querySelector('.user-info__name');
let descriptionField = popup.querySelector('.popup__description');
let userDescription = document.querySelector('.user-info__description');
let popupForm = popup.querySelector('.popup__form');


function togglePopup () {
  popup.classList.toggle('popup_opened');
}

function handleFormSubmit (event) {
  event.preventDefault();
  userName.textContent = nameField.value;
  userDescription.textContent = descriptionField.value;
  togglePopup();
}

editButton.addEventListener('click', () => {
  nameField.value = userName.textContent;
  descriptionField.value = userDescription.textContent;
  togglePopup();
});

closeButton.addEventListener('click', togglePopup);

popupForm.addEventListener('submit', handleFormSubmit); 

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
})