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
        new Notify({ message: `Removed cart with uid ${ uuid() }` });
    }
}

customElements.define('remove-cart-component', RemoveCartComponent);
