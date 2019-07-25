var Cart = (function () {
    function Cart() {
        console.log('Cart constructor');
    }
    Cart.prototype.getLineItems = function () {
        console.warn('Line item fetch not yet implemented');
    };
    return Cart;
}());
new Cart();
