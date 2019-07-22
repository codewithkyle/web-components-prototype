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
var AddLineItemComponent = (function (_super) {
    __extends(AddLineItemComponent, _super);
    function AddLineItemComponent() {
        var _this = _super.call(this) || this;
        _this.handleClick = _this.addLineItem.bind(_this);
        _this._lineItemTemplate = document.body.querySelector('.js-line-item-template');
        _this._cartComponent = document.body.querySelector('cart-component');
        _this._lineItemsContainer = _this._cartComponent.querySelector('cart-line-items');
        return _this;
    }
    AddLineItemComponent.prototype.connectedCallback = function () {
        this.addEventListener('click', this.handleClick);
    };
    AddLineItemComponent.prototype.addLineItem = function () {
        var node = document.importNode(this._lineItemTemplate.content, true);
        this._lineItemsContainer.appendChild(node);
    };
    return AddLineItemComponent;
}(HTMLElement));
customElements.define('add-line-item-component', AddLineItemComponent);
