import v4 from 'uuid/v4';
class CartComponent extends HTMLElement {
    constructor() {
        super();
        this._subtotalDisplay = this.querySelector('.js-subtotal-display');
        const uid = v4();
        console.log(uid);
        this.setAttribute('data-uid', uid);
    }
    connectedCallback() {
        console.log('Cart Connected');
    }
    disconnectedCallback() {
        console.log('Cart Disconnected');
    }
    recalculateSubtotal() {
        console.log('Someone told me to recalculate');
        const lineItemTotalEls = Array.from(this.querySelectorAll('line-item-total'));
        let newSubtotal = 0;
        for (let i = 0; i < lineItemTotalEls.length; i++) {
            const cleanString = lineItemTotalEls[i].innerHTML.replace(/\$/g, '');
            const lineItemPrice = parseFloat(cleanString);
            if (lineItemPrice !== NaN) {
                newSubtotal += lineItemPrice;
            }
        }
        this._subtotalDisplay.innerText = new Intl.NumberFormat(document.documentElement.lang, { style: 'currency', currency: 'USD' }).format(newSubtotal);
    }
}
customElements.define('cart-component', CartComponent);
