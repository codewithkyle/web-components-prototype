// import uuid from 'uuid/v4';

class CartComponent extends HTMLElement
{

    private _subtotalDisplay : HTMLElement;

    constructor()
    {
        super();
        this._subtotalDisplay = this.querySelector('.js-subtotal-display');
        const uid = uuid();
        this.dataset.uid = uid;
        console.log(uid);
    }

    connectedCallback() : void
    {
        console.log('Cart Connected');
    }

    disconnectedCallback() : void
    {
        console.log('Cart Disconnected');
    }

    public recalculateSubtotal() : void
    {
        console.log('Someone told me to recalculate');
        const lineItemTotalEls = Array.from(this.querySelectorAll('line-item-total'));
        
        let newSubtotal = 0;
        for (let i = 0; i < lineItemTotalEls.length; i++)
        {
            const cleanString = lineItemTotalEls[i].innerHTML.replace(/\$/g, '');
            const lineItemPrice = parseFloat(cleanString);
            if(lineItemPrice !== NaN)
            {
                newSubtotal += lineItemPrice;
            }
        }

        this._subtotalDisplay.innerText = new Intl.NumberFormat(document.documentElement.lang, { style: 'currency', currency: 'USD' }).format(newSubtotal);
    }
}

customElements.define('cart-component', CartComponent);
