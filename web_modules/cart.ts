class Cart
{
    private _lineItemTemplate : HTMLTemplateElement;
    private _lineItemsContainer : HTMLElement;
    private _cartComponent : HTMLElement;

    constructor()
    {
        console.log('Cart constructor');
        this._lineItemTemplate = document.body.querySelector('.js-line-item-template');
        this._cartComponent = document.body.querySelector('cart-component');
        this._lineItemsContainer = this._cartComponent.querySelector('cart-line-items');
    }

    public getLineItems() : void
    {
        console.warn('Line item fetch not yet implemented');
    }

    public addLineItem() : void
    {
        const node = document.importNode(this._lineItemTemplate.content, true);
        this._lineItemsContainer.appendChild(node);

        const LineItemEvent = {
            el: node,
            time: performance.now()
        }

        const event = new CustomEvent('lineItemsAdded', { detail: LineItemEvent });
        document.dispatchEvent(event);
    }
}