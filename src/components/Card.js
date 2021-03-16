/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _handleLikeCard() {
    // Toggle like button state.
    this.classList.toggle('button_type_like-active');
  }

  _handleDeleteCard(event) {
    // Remove card from page.
    event.target.closest('.card').remove();
  }

  create() {
    // Create card and initialize its elements. Return DOM card element.
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardHeader = cardElement.querySelector('.card__header');
    const buttonLike = cardElement.querySelector('.card__like');
    const buttonDelete = cardElement.querySelector('.card__delete');

    cardHeader.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardImage.addEventListener('click', () => {
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });
    buttonLike.addEventListener('click', this._handleLikeCard);
    buttonDelete.addEventListener('click', this._handleDeleteCard);
    return cardElement;
  }
}
