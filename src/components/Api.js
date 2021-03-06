/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable arrow-parens */
export default class Api {
  constructor(options) {
    // Initialize object.
    this.profileUrl = `${options.baseUrl}/users/me`;
    this.avatarUrl = `${this.profileUrl}/avatar`;
    this.cardsUrl = `${options.baseUrl}/cards`;
    this.likesUrl = `${this.cardsUrl}/likes`;
    this.headers = {
      authorization: options.token,
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  _processResponse(response) {
    // Return JSON response if status is ok or generate error.
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Ошибка: ${response.status}`));
  }

  getInitialCards() {
    // Get all cards data.
    return fetch(this.cardsUrl, {
      headers: this.headers,
    })
      .then(this._processResponse);
  }

  getProfileInfo() {
    // Get profile info.
    return fetch(this.profileUrl, {
      headers: this.headers,
    })
      .then(this._processResponse);
  }

  editProfileInfo(data) {
    // Patch user's name and description.
    return fetch(this.profileUrl, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    })
      .then(this._processResponse);
  }

  editAvatar(data) {
    // Patch user's avatar.
    return fetch(this.avatarUrl, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    })
      .then(this._processResponse);
  }

  addCard(data) {
    // Post new card.
    return fetch(this.cardsUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    })
      .then(this._processResponse);
  }

  deleteCard(cardId) {
    // Delete the card.
    return fetch(`${this.cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._processResponse);
  }

  like(cardId, isLiked) {
    // Like the card (or dislike if already liked).
    return fetch(`${this.likesUrl}/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this.headers,
    })
      .then(this._processResponse);
  }
}
