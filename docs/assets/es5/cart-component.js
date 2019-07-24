"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var v4_1 = __importDefault(require("uuid/v4"));
var CartComponent = (function (_super) {
    __extends(CartComponent, _super);
    function CartComponent() {
        var _this = _super.call(this) || this;
        _this._subtotalDisplay = _this.querySelector('.js-subtotal-display');
        var uid = v4_1.default();
        _this.dataset.uid = uid;
        console.log(uid);
        return _this;
    }
    CartComponent.prototype.connectedCallback = function () {
        console.log('Cart Connected');
    };
    CartComponent.prototype.disconnectedCallback = function () {
        console.log('Cart Disconnected');
    };
    CartComponent.prototype.recalculateSubtotal = function () {
        console.log('Someone told me to recalculate');
        var lineItemTotalEls = Array.from(this.querySelectorAll('line-item-total'));
        var newSubtotal = 0;
        for (var i = 0; i < lineItemTotalEls.length; i++) {
            var cleanString = lineItemTotalEls[i].innerHTML.replace(/\$/g, '');
            var lineItemPrice = parseFloat(cleanString);
            if (lineItemPrice !== NaN) {
                newSubtotal += lineItemPrice;
            }
        }
        this._subtotalDisplay.innerText = new Intl.NumberFormat(document.documentElement.lang, { style: 'currency', currency: 'USD' }).format(newSubtotal);
    };
    return CartComponent;
}(HTMLElement));
customElements.define('cart-component', CartComponent);
