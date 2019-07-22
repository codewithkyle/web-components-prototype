class CartComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        console.log('Cart Connected');
        console.log(this);
    }
    disconnectedCallback() {
        console.log('Cart Disconnected');
        console.log(this);
    }
}
customElements.define('cart-component', CartComponent);
