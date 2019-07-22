class LineItemComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback() : void
    {
        console.log('Created a new line item');
    }
}

customElements.define('line-item-component', LineItemComponent);
