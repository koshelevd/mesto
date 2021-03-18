/* eslint-disable arrow-parens */
/* eslint-disable no-underscore-dangle */
export default class Section {
  constructor({ items = [], renderer }, containerSelector) {
    this.items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    // Render initial data.
    this.items.reverse().forEach(item => this._renderer(item));
  }

  addItem(element) {
    // Add item to container.
    this._container.prepend(element);
  }
}
