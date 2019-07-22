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
var LineItemComponent = (function (_super) {
    __extends(LineItemComponent, _super);
    function LineItemComponent() {
        var _this = _super.call(this) || this;
        _this.handleInputButtonClick = _this.updateInput.bind(_this);
        _this.handleQtyInputKeyup = _this.getNewQty.bind(_this);
        _this._inputButtons = Array.from(_this.querySelectorAll('button'));
        _this._qytInput = _this.querySelector('input');
        _this._priceDisplay = _this.querySelector('line-item-total');
        return _this;
    }
    LineItemComponent.prototype.connectedCallback = function () {
        console.log('Created a new line item');
        for (var i = 0; i < this._inputButtons.length; i++) {
            this._inputButtons[i].addEventListener('click', this.handleInputButtonClick);
        }
        this._qytInput.addEventListener('keyup', this.handleQtyInputKeyup);
    };
    LineItemComponent.prototype.updatePrice = function (qty) {
        var newPrice = qty * parseFloat(this._priceDisplay.dataset.rawPrice);
        this._priceDisplay.innerText = new Intl.NumberFormat(document.documentElement.lang, { style: 'currency', currency: this._priceDisplay.dataset.currency }).format(newPrice);
        var cart = this.closest('cart-component');
        cart.recalculateSubtotal();
    };
    LineItemComponent.prototype.getNewQty = function () {
        var newQty = parseInt(this._qytInput.value);
        this.updatePrice(newQty);
    };
    LineItemComponent.prototype.updateInput = function (e) {
        var target = e.currentTarget;
        var direction = parseInt(target.dataset.direction);
        var currentQty = parseInt(this._qytInput.value);
        var maxQty = parseInt(this._qytInput.getAttribute('max'));
        if (!maxQty) {
            maxQty = 999;
        }
        var minQty = parseInt(this._qytInput.getAttribute('min'));
        if (!minQty) {
            minQty = 1;
        }
        var newQty = currentQty + direction;
        if (newQty > maxQty) {
            newQty = maxQty;
        }
        else if (newQty < minQty) {
            newQty = minQty;
        }
        this._qytInput.value = newQty.toString();
        this.updatePrice(newQty);
    };
    return LineItemComponent;
}(HTMLElement));
customElements.define('line-item-component', LineItemComponent);
