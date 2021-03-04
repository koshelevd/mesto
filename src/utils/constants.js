import baikalImage from '../images/card-baikal.jpg';
import sochiImage from '../images/card-roza.jpg';
import kamchatkaImage from '../images/card-kamchatka.jpg';
import vyborgImage from '../images/card-vyborg.jpg';
import uralImage from '../images/card-ural.jpg';
import spbImage from '../images/card-peter.jpg';

export const initialCards = [
  {
    name: 'Байкал',
    link: baikalImage,
  },
  {
    name: 'Роза Хутор, Россия',
    link: sochiImage,
  },
  {
    name: 'Камчатка',
    link: kamchatkaImage,
  },
  {
    name: 'Парк Монрепо, Выборг',
    link: vyborgImage,
  },
  {
    name: 'Урал',
    link: uralImage,
  },
  {
    name: 'Санкт-Петербург',
    link: spbImage,
  },
];
export const validationParams = {
  inputSelector: '.popup__input_type_text',
  buttonSelector: '.popup__input_type_submit',
  activeErrorSelector: 'popup__validation-error_active',
  inputErrorSelector: 'popup__input_type_error',
};
export const editButton = document.querySelector('.button_type_edit');
export const addButton = document.querySelector('.button_type_add');
