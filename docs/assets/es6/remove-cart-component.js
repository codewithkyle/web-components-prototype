"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notifyjs_1 = require("@codewithkyle/notifyjs");
const animejs_1 = require("animejs");
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
        new notifyjs_1.Notify({ message: 'Cart was removed successfully' });
        console.log(animejs_1.default);
    }
}
customElements.define('remove-cart-component', RemoveCartComponent);
