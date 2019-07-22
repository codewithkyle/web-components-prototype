class CartComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback() : void
    {
        console.log('Cart Connected');
    }

    disconnectedCallback() : void
    {
        console.log('Cart Disconnected');
    }
}

customElements.define('cart-component', CartComponent);
