import { Notify } from '@codewithkyle/notifyjs';
import anime from 'animejs'

class RemoveCartComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    private handleClick:EventListener = this.removeCartComponent.bind(this);

    connectedCallback() : void
    {
        this.addEventListener('click', this.handleClick);
    }

    private removeCartComponent() : void
    {
        const cart = document.body.querySelector('cart-component');
        cart.remove();
        new Notify({ message: 'Cart was removed successfully' });
        console.log(anime);
    }
}

customElements.define('remove-cart-component', RemoveCartComponent);
