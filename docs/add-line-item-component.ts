class AddLineItemComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    private handleClick:EventListener = this.addLineItem.bind(this);

    connectedCallback() : void
    {
        this.addEventListener('click', this.handleClick);
    }

    private addLineItem() : void
    {
        Cart.addLineItem();
    }
}

customElements.define('add-line-item-component', AddLineItemComponent);
