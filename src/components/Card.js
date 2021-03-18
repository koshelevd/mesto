/* eslint-disable arrow-parens */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, userId, api) {
    // Initialize object.
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._currentUserId = userId;
    this._api = api;
  }

  _handleLikeCard() {
    // Like the card (dislike if already liked).
    this._api.like(this._id, this._isLikedByCurrentUser())
      .then((result) => {
        this._likes = result.likes;
        this._refreshLikesInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _isLikedByCurrentUser() {
    // Return true if current user already liked the card, false otherwise.
    return this._likes.map(val => val._id).includes(this._currentUserId);
  }

  _refreshLikesInfo() {
    // Set actual likes count and indicate whether current user liked the card.
    if (this._likes.length > 0) {
      this._counterElement.classList.add('card__like-counter_active');
      this._counterElement.textContent = this._likes.length;
    } else {
      this._counterElement.classList.remove('card__like-counter_active');
    }
    if (this._isLikedByCurrentUser()) {
      this._buttonLike.classList.add('button_type_like-active');
    } else {
      this._buttonLike.classList.remove('button_type_like-active');
    }
  }

  deleteCard(cardElement) {
    // Delete card and remove from page.
    this._api.deleteCard(this._id)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  create() {
    // Create card and initialize its elements. Return DOM card element.
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardHeader = cardElement.querySelector('.card__header');
    this._buttonLike = cardElement.querySelector('.card__like-button');
    this._counterElement = cardElement.querySelector('.card__like-counter');

    if (this._owner._id === this._currentUserId) {
      const buttonDelete = cardElement.querySelector('.card__delete');
      buttonDelete.classList.add('card__delete_active');
      buttonDelete.addEventListener('click', (event) => this._handleDeleteClick(event, this));
    }

    cardHeader.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._refreshLikesInfo();
    cardImage.addEventListener('click', () => {
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });
    this._buttonLike.addEventListener('click', this._handleLikeCard.bind(this));
    return cardElement;
  }
}
