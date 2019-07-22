var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CartComponent = (function (_super) {
    __extends(CartComponent, _super);
    function CartComponent() {
        return _super.call(this) || this;
    }
    CartComponent.prototype.connectedCallback = function () {
        console.log('Cart Connected');
    };
    CartComponent.prototype.disconnectedCallback = function () {
        console.log('Cart Disconnected');
    };
    return CartComponent;
}(HTMLElement));
customElements.define('cart-component', CartComponent);
