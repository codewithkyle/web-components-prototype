class AddLineItemComponent extends HTMLElement {
    constructor() {
        super();
        this.handleClick = this.addLineItem.bind(this);
        this._lineItemTemplate = document.body.querySelector('.js-line-item-template');
        this._cartComponent = document.body.querySelector('cart-component');
        this._lineItemsContainer = this._cartComponent.querySelector('cart-line-items');
    }
    connectedCallback() {
        this.addEventListener('click', this.handleClick);
    }
    addLineItem() {
        const node = document.importNode(this._lineItemTemplate.content, true);
        this._lineItemsContainer.appendChild(node);
    }
}
customElements.define('add-line-item-component', AddLineItemComponent);
