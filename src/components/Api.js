/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable arrow-parens */
export default class Api {
  constructor(options) {
    this.profileUrl = `${options.baseUrl}/users/me`;
    this.avatarUrl = `${this.profileUrl}/avatar`;
    this.cardsUrl = `${options.baseUrl}/cards`;
    this.likesUrl = `${this.cardsUrl}/likes`;
    this.token = options.token;
    this.headers = {
      authorization: this.token,
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // GET https://mesto.nomoreparties.co/v1/cohortId/users/me
  // PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me
  // PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar

  // GET https://mesto.nomoreparties.co/v1/cohortId/cards
  // POST https://mesto.nomoreparties.co/v1/cohortId/cards
  // DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId
  // PUT https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId
  // DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId

  _processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Ошибка: ${response.status}`));
  }

  getInitialCards() {
    return fetch(this.cardsUrl, {
      headers: this.headers,
    })
      .then(this._processResponse);
  }

  getProfileInfo() {
    return fetch(this.profileUrl, {
      headers: this.headers,
    })
      .then(this._processResponse);
  }

  editProfileInfo(data) {
    return fetch(this.profileUrl, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    })
      .then(this._processResponse);
  }

  addCard(data) {
    return fetch(this.cardsUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    })
      .then(this._processResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._processResponse);
  }

  like(cardId, isLiked) {
    return fetch(`${this.likesUrl}/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this.headers,
    })
      .then(this._processResponse);
  }
}
