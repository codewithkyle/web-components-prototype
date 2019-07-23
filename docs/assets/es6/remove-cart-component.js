import { Notify } from '@codewithkyle/notifyjs';
import anime from 'animejs';
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
        new Notify({ message: 'Cart was removed successfully' });
        console.log(anime);
    }
}
customElements.define('remove-cart-component', RemoveCartComponent);
