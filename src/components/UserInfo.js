/* eslint-disable no-underscore-dangle */
export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._userNameElement = document.querySelector(nameSelector);
    this._userDescriptionElement = document.querySelector(descriptionSelector);
  }

  _refreshInfo() {
    // Refresh visual elements.
    this._userNameElement.textContent = this._userName;
    this._userDescriptionElement.textContent = this._userDescription;
  }

  setUserInfo(data) {
    // Set profile data.
    this._userName = data.name;
    this._userDescription = data.about;
    this._refreshInfo();
  }

  getUserInfo() {
    // Return profile data.
    return {
      name: this._userName,
      description: this._userDescription,
    };
  }
}
