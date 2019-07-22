class LineItemComponent extends HTMLElement
{
    private _inputButtons : Array<HTMLButtonElement>;
    private _qytInput : HTMLInputElement;
    private _priceDisplay : HTMLElement;

    constructor()
    {
        super();
        this._inputButtons = Array.from(this.querySelectorAll('button'));
        this._qytInput = this.querySelector('input');
        this._priceDisplay = this.querySelector('line-item-total');
    }

    private handleInputButtonClick:EventListener = this.updateInput.bind(this);
    private handleQtyInputKeyup:EventListener = this.getNewQty.bind(this);

    connectedCallback() : void
    {
        console.log('Created a new line item');
        for (let i = 0; i < this._inputButtons.length; i++)
        {
            this._inputButtons[i].addEventListener('click', this.handleInputButtonClick);
        }

        this._qytInput.addEventListener('keyup', this.handleQtyInputKeyup);
    }

    private updatePrice(qty:number) : void
    {
        const newPrice = qty * parseFloat(this._priceDisplay.dataset.rawPrice);
        this._priceDisplay.innerText = new Intl.NumberFormat(document.documentElement.lang, { style: 'currency', currency: this._priceDisplay.dataset.currency }).format(newPrice);
    }

    private getNewQty() : void
    {
        const newQty = parseInt(this._qytInput.value);
        this.updatePrice(newQty);
    }

    private updateInput(e:MouseEvent) : void
    {
        const target = <HTMLButtonElement>e.currentTarget;
        const direction = parseInt(target.dataset.direction);
        
        const currentQty = parseInt(this._qytInput.value);
        let maxQty = parseInt(this._qytInput.getAttribute('max'));
        if(!maxQty)
        {
            maxQty = 999;
        }
        let minQty = parseInt(this._qytInput.getAttribute('min'));
        if(!minQty)
        {
            minQty = 1;
        }

        let newQty = currentQty + direction;

        if(newQty > maxQty)
        {
            newQty = maxQty;
        }
        else if(newQty < minQty)
        {
            newQty = minQty;
        }

        this._qytInput.value = newQty.toString();
        this.updatePrice(newQty);
    }
}

customElements.define('line-item-component', LineItemComponent);
