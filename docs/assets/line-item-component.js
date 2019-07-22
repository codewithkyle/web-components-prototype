class LineItemComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        console.log('Created a new line item');
    }
}
customElements.define('line-item-component', LineItemComponent);
