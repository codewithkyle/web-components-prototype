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
var notifyjs_1 = require("@codewithkyle/notifyjs");
var animejs_1 = __importDefault(require("animejs"));
var RemoveCartComponent = (function (_super) {
    __extends(RemoveCartComponent, _super);
    function RemoveCartComponent() {
        var _this = _super.call(this) || this;
        _this.handleClick = _this.removeCartComponent.bind(_this);
        return _this;
    }
    RemoveCartComponent.prototype.connectedCallback = function () {
        this.addEventListener('click', this.handleClick);
    };
    RemoveCartComponent.prototype.removeCartComponent = function () {
        var cart = document.body.querySelector('cart-component');
        cart.remove();
        new notifyjs_1.Notify({ message: 'Cart was removed successfully' });
        console.log(animejs_1.default);
    };
    return RemoveCartComponent;
}(HTMLElement));
customElements.define('remove-cart-component', RemoveCartComponent);
