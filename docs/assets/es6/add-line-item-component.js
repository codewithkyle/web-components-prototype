class AddLineItemComponent extends HTMLElement {
    constructor() {
        super();
        this.handleClick = this.addLineItem.bind(this);
        document.addEventListener('lineItemsAdded', (e) => {
            console.log(e);
        });
    }
    connectedCallback() {
        this.addEventListener('click', this.handleClick);
    }
    addLineItem() {
        Cart.addLineItem();
    }
}
customElements.define('add-line-item-component', AddLineItemComponent);
