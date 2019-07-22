class RemoveCartComponent extends HTMLElement {
    constructor() {
        super();
        this.handleClick = this.removeCartComponent.bind(this);
    }
    connectedCallback() {
        this.addEventListener('click', this.handleClick);
    }
    removeCartComponent() {
        const cart = document.body.querySelector('cart-component');
        cart.remove();
    }
}
customElements.define('remove-cart-component', RemoveCartComponent);
