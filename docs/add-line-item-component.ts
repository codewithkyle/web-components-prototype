class AddLineItemComponent extends HTMLElement
{
    private _lineItemTemplate : HTMLTemplateElement;
    private _cartComponent : HTMLElement;

    constructor()
    {
        super();
        this._lineItemTemplate = document.body.querySelector('.js-line-item-template');
        this._cartComponent = document.body.querySelector('cart-component');
    }

    private handleClick:EventListener = this.addLineItem.bind(this);

    connectedCallback() : void
    {
        this.addEventListener('click', this.handleClick);
    }

    private addLineItem() : void
    {
        const node = document.importNode(this._lineItemTemplate.content, true);
        this._cartComponent.appendChild(node);
    }
}

customElements.define('add-line-item-component', AddLineItemComponent);
