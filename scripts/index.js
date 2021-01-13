const initialCards = [
  {
    name: 'Байкал',
    link: './images/card-baikal.jpg'
  },
  {
    name: 'Роза Хутор, Россия',
    link: './images/card-roza.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/card-kamchatka.jpg'
  },
  {
    name: 'Парк Монрепо, Выборг',
    link: './images/card-vyborg.jpg'
  },
  {
    name: 'Урал',
    link: './images/card-ural.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/card-peter.jpg'
  }
];

const cardsContainer = document.querySelector('.cards');
const popupImage = document.querySelector('.popup_type_image');
const photoElement = popupImage.querySelector('.popup__image');
const photoCaption = popupImage.querySelector('.popup__caption');
const pageContainer = document.querySelector('.page__container');
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


const submitButtonEditPopup = popupEdit.querySelector('.popup__input_type_submit');
const popupFormEdit = popupEdit.querySelector('.popup__form');
const popupFormAdd = popupAdd.querySelector('.popup__form');

function addCard(data) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardImage.addEventListener('click', openImagePopup); 
  cardElement.querySelector('.card__header').textContent = data.name;
  cardElement.querySelector('.card__like').addEventListener('click', toggleLike);
  cardElement.querySelector('.card__delete').addEventListener('click', deleteCard);

  cardsContainer.prepend(cardElement);
}


function openImagePopup(event) {
  
  photoElement.src = event.target.src;
  console.log();
  photoCaption.textContent = event.target.closest('.card').querySelector('.card__header').textContent;
  popupImage.classList.toggle('popup_opened');
}




function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}


function toggleLike(event) {
  event.target.classList.toggle('button_type_like-active');
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

function closePopup(event) {
  const currentPopup = document.querySelector('.popup_opened')
  if (event.target === event.currentTarget) {
    togglePopup(currentPopup);
  }
}

function openEditForm() {
  nameField.value = userName.textContent;
  descriptionField.value = userDescription.textContent;
  togglePopup(popupEdit);
}

function openAddForm() {
  titleField.value = '';
  linkField.value = '';
  togglePopup(popupAdd);
}


function handleEditFormSubmit(event) {
  event.preventDefault();
  userName.textContent = nameField.value;
  userDescription.textContent = descriptionField.value;
  togglePopup(popupEdit);
}

function handleAddFormSubmit(event) {
  event.preventDefault();
  const data = {
    name: titleField.value,
    link: linkField.value
  };
  addCard(data);
  togglePopup(popupAdd);
}


editButton.addEventListener('click', openEditForm);
addButton.addEventListener('click', openAddForm);
closeButtonEditPopup.addEventListener('click', () => { togglePopup(popupEdit) });
closeButtonAddPopup.addEventListener('click', () => { togglePopup(popupAdd) });
closeButtonImagePopup.addEventListener('click', () => { togglePopup(popupImage) });
popupEdit.addEventListener('click', closePopup);
popupAdd.addEventListener('click', closePopup);
popupImage.addEventListener('click', closePopup);

popupFormEdit.addEventListener('submit', handleEditFormSubmit);
popupFormAdd.addEventListener('submit', handleAddFormSubmit);

initialCards.forEach(item => { addCard(item) });