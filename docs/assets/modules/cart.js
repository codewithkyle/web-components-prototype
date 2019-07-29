(function(){
var Cart = (function () {
    function Cart() {
        console.log('Cart constructor');
        this._lineItemTemplate = document.body.querySelector('.js-line-item-template');
        this._cartComponent = document.body.querySelector('cart-component');
        this._lineItemsContainer = this._cartComponent.querySelector('cart-line-items');
    }
    Cart.prototype.getLineItems = function () {
        console.warn('Line item fetch not yet implemented');
    };
    Cart.prototype.addLineItem = function () {
        var node = document.importNode(this._lineItemTemplate.content, true);
        this._lineItemsContainer.appendChild(node);
        var LineItemEvent = {
            el: node,
            time: performance.now()
        };
        var event = new CustomEvent('lineItemsAdded', { detail: LineItemEvent });
        document.dispatchEvent(event);
    };
    return Cart;
}());

window.Cart = new Cart();
})();
