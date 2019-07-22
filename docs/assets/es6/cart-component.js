class CartComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        console.log('Cart Connected');
    }
    disconnectedCallback() {
        console.log('Cart Disconnected');
    }
}
customElements.define('cart-component', CartComponent);
