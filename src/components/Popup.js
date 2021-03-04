/* eslint-disable no-underscore-dangle */
export default class Popup {
  constructor(popupSelector) {
    // Initialize object.
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.button_type_close');
    this._escHandler = (event) => { this._handleEscClose(event); };
  }

  open() {
    // Show popup.
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._escHandler);
  }

  close() {
    // Hide popup.
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._escHandler);
  }

  _handleEscClose(event) {
    // Close popup if 'Esc' is pressed.
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick(event) {
    // Close popup if clicked outside of the form.
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    // Set event listeners for popup's elements.
    this._closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', (event) => this._handleOverlayClick(event));
  }
}
