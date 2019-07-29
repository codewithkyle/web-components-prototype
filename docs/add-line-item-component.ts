class AddLineItemComponent extends HTMLElement
{
    constructor()
    {
        super();
        document.addEventListener('lineItemsAdded', (e:CustomEvent)=>{
            console.log(e);
        });
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
