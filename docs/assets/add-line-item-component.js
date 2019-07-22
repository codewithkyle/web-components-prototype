class AddLineItemComponent extends HTMLElement {
    constructor() {
        super();
        this.handleClick = this.addLineItem.bind(this);
        this._lineItemTemplate = document.body.querySelector('.js-line-item-template');
        this._cartComponent = document.body.querySelector('cart-component');
    }
    connectedCallback() {
        this.addEventListener('click', this.handleClick);
    }
    addLineItem() {
        const node = document.importNode(this._lineItemTemplate.content, true);
        console.log(node);
        this._cartComponent.appendChild(node);
    }
}
customElements.define('add-line-item-component', AddLineItemComponent);
