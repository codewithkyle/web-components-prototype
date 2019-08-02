# Web Components Prototype

The purpose of this prototype is to experiment with what the current (July 2019) implementation of Web Components looks like along with determining the best way to polyfill their functionality for IE 11.

## Goals

1. Allow for current module tracking logic
    - Tracking custom elements
    - Communicating with static components
    - Communicating with parent components
    - Communicating with child components
1. Allow multiple instance of a single component on a page
1. Provide a polyfill solution for IE 11 that limits the overhead applied to all other modern browsers
1. Create an example utilizing the `<template>` element
1. Demonstrate the ability to utilize NPM packages on the front-end
1. Demonstrate how components communicate between one another
1. Demonstrate how components communicate with web modules

## Postmortem

This prototype showcases several important use cases and confirms a few theories about how web components behave.

### ELI5 Web Components


We'll start with the `this` keyword's context when referring to web components. When a custom element is defined the `this` keyword refers to the class, however, since the class extends the `HTMLElement` printing the value of `this` will result in the DOM node being output in the console.

This is a key difference between the current way JavaScript was executed. Before, when creating a class that was paired with a node the developer had to find the node (or nodes) and instantiate the class. They then had to store a reference to the node within the class. In the example below a class gets the first instance of a card carousel element and stores the element. It then uses the stored element to query for all of the slide elements within the carousel.

```javascript
class CardCarousel
{
    constructor()
    {
        this.element = document.body.querySelector('card-carousel');
        this.slides = Array.from(this.element.querySelectorAll('carousel-slide'));

        console.log(this.element); // Prints out the Node returned by the query selector
        console.log(this.slides); // Prints out an array of nodes returned by by the query selector
    }
}
```

Now that an instance of a class can reference the node that it's paired with we would need to come up with a way to reference a class from an element. That way, if the node is ever removed from the DOM by another script we have a reference to the class that needs to be removed from memory. One possible way to do this would be to store all instances of classes in a global array and refer to them by a unique identifier. That identifier would be be attached to the node when the class in instantiated.

```javascript
self.uid = 0;
self.classes = [];

class CardCarousel
{
    constructor()
    {
        this.element = document.body.querySelector('card-carousel');
        this.uid = self.uid;
        self.uid++;
        this.element.dataset.uid = this.uid; // Sets the `data-uid` attribute equal to the classes uid
        self.classes.push(this);
    }
}
```

Now when you want remove a node from the DOM that has a `data-uid` attribute you would call some sort of global removal function to handle destroying the instance of the class before removing the node.

```javascript
function purge(uid)
{
    if (!uid)
    {
        console.error('Please provide a uid');
        return;
    }

    const classToRemove = getClasses(uid);
    classToRemove.destroy();
}

function getClass(uid)
{
    for (let i = 0; i < self.classes.length; i++)
    {
        if (self.classes[i].uid === uid)
        {
            return self.classes[i];
        }
    }
}
```

In this example a custom destroy method is called allowing the class the ability to remove any event listeners before handling it's own element removal.

```javascript
class CardCarousel
{
    constructor()
    {
        this.element = document.body.querySelector('card-carousel');
        this.uid = self.uid;
        self.uid++;
        this.element.dataset.uid = this.uid; // Sets the `data-uid` attribute equal to the classes uid
        self.classes.push(this);
        this.init();
    }

    doSomething(event)
    {
        console.log(event);
    }

    init()
    {
        this.element.addEventListener('click', this.doSomething);
    }

    destroy()
    {
        this.element.removeEventListener('click', this.doSomething);
        this.element.remove();
    }
}
```

Now that the element is removed and the class has handled cleaning up after itself the final thing to do would be to remove the instance of the class from the global classes array.

```javascript
function purge(uid)
{
    ...snip...

    for (let i = 0; i < self.classes.length; i++)
    {
        if (self.classes[i].uid === uid)
        {
            self.classes.splice(i, 1);
            break;
        }
    }
}
```

Obviously this isn't the only solution to the node & class pairing problem but it's simple enough to use for this example.

*So, how are web components better?* You may ask.

Well, essentially web components removes the (for lack of a better term) distance between the node and the instance of the class. Since the class extends the node there are no lookups, there are no global class arrays, there is less overhead. Let's look at our card carousel example again, but this time using web components.

```javascript
class CardCarousel extends HTMLElement
{
    constructor()
    {
        this.slides;
    }

    connectedCallback()
    {
        this.slides = Array.from(this.querySelectorAll('carousel-slide');
    }
}

customElements.define('card-carousel', CardCarousel);
```

By using web components the `this` keyword's context both the class and the DOM node. Also, by extending `HTMLElement` be get access to the `connectedCallback()` method. This method is called when the custom element is "mounted" onto the node.

For the most part, the initiation is mostly the same, it's the cleanup and additional usability that web components provide that make them better. In the example below we'll walk though the process of remove a web component.

```javascript
class CardCarousel extends HTMLElement
{
    constructor()
    {
        this.slides;
    }

    handleClickEvent = this.doSomething(event).bind(this);

    doSomething(event)
    {
        console.log(event);
    }

    connectedCallback()
    {
        this.slides = Array.from(this.querySelectorAll('carousel-slide'));

        for (let i = 0; i < this.slides.length; i++)
        {
            this.slides[i].addEventListener('click', this.handleClickEvent);
        }
    }

    disconnectedCallback()
    {
        for (let i = 0; i < this.slides.length; i++)
        {
            this.slides[i].removeEventListener('click', this.handleClickEvent);
        }
    }
}

customElements.define('card-carousel', CardCarousel);

setTimeout(function(){ document.body.querySelector('card-carousel').remove(); }, 5000);
```

In the example above we mount our card carousel class onto the card carousel element and after 5 seconds the node is removed from the DOM. The `disconnectedCallback()` method is fired when the node that the class instance is mounted to is removed.

However, the power of web components doesn't end there. Besides removing the runtime overhead of tracking all the instances of all the classes and handling their removal web components also allows us to easily have components communicate between one another. We'll start with the cart web components logic.

```javascript
class CartComponent extends HTMLElement
{
    constructor()
    {
        this.subtotal = 0;
        this.lineItems = [];
    }

    connectedCallback()
    {
        this.lineItems = Array.from(this.querySelectorAll('line-item-component'));
    }

    updateTotal()
    {
        this.subtotal = 0;
        for (let i = 0; i < this.lineItems.length; i++)
        {
            this.subtotal += this.lineItems[i].total;
        }

        console.log(subtotal);
    }
}

customElements.define('cart-component', CartComponent);
```

Now for the line item web component logic.

```javascript
class LineItemComponent extends HTMLElement
{
    constructor()
    {
        this.total = 5;
        this.cart = this.parentElement;
    }

    handleClickEvent = this.updateCart().bind(this);

    updateCart()
    {
        this.cart.updateTotal();
    }

    connectedCallback()
    {
        this.addEventListener('click', this.handleClickEvent);
    }
}

customElements.define('line-item-component', LineItemComponent);
```

So, what does the code above actually do?

When a line item is clicked the cart component is told to run it's `updateTotal()` method. It then loops through all of its line items and adds their totals to the overall subtotal of the cart.

Great, now what does the code above actually mean?

It means that since the instance of a class and the node in the DOM are the same thing we can use a query selector to get a reference to another component and call any public method or retrieve (and set) any public value. This cleans up any codebase, no longer would we have to track all the different nodes along with their paired classes. We don't have to import our Cart Component class into our Line Item Component class just to have access to the public methods or variables. It means tools like Webpack don't need to spend time figuring out where, why, and how a class is being used throughout a code base.

Using web components means less treeshaking, less Webpack configuration headaches, and less overhead since everything works natively.

Seams wonderful right? Well, it is, until you have to support IE 11. I'm not going to say it's not possible, but it does add a new level of complexity. Although the solution I'll explain is simple, it does extend your compile times since we'll be doing everything twice.

### Supporting Legacy Browsers

In the context of this section by legacy browsers I'll mostly be referring to IE 11.

As of time time of writing this (August 2nd, 2019) the polyfill used to support web components in legacy browsers breaks support in modern browsers (or at least the most recent build of Chrome Canary).

That no bueno.

So how do we fix this issue? We can't really break support for 98% of the internet just because some people don't want to (or can't) upgrade.

ES Modules to the rescue.

How do ES Modules work? Yeah, I'm not going cover that here so just [read up on them yourself](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/).

The part of ES Modules that we care about is the `type="module"` and `nomodule` attributes. Let's break down how they work.

```html
<script type="module">
    console.log('I run on modern browsers!');
</script>

<script nomodule type="text/javascript">
    console.log('I run on legacy browsers but not new browsers!');
</script>
```

Scripts can be typed as a "module". Since modern browsers know of ES Modules they'll run the script, however we couldn't break backwards compatibility so the `nomodule` attribute as created. Modern browsers know to ignore scripts when they have a `nomodule` attribute.

That half the problem, now for how legacy browsers handle things.

When a legacy browser sees the `type="module"` attribute instead of a `type="text/javascript"` they do nothing since they know it's not something they understand. However, the `nomodule` attribute means nothing to them, legacy browsers treat it like any other random attribute a developer could attach to an element and when it sees a type that it understands the script is parsed and then it runs.

It's nice that we can double up our script tags and by using the new types and attributes we can avoid loading unnecessary scripts but what needs to happen to the JavaScript itself?

Nothing, well, at least nothing that you have to do manually.

We can continue to write code the way we want, using all the new features of modern ecmascirpt, we just have to compile and bundle everything, twice.

How do we do this? With TypeScript. When running the TypeScript compiler we can actually tell the compiler what project it needs to use through the `--p <path to config>` flag. Our scripts section of the `package.json` file could look something like this:

```json
"scripts": {
    "compile": "npm run compile:es5 && npm run compile:es6 && bundle:es5 && bundle:es6",
    "compile:es5": "tsc --p ./tsconfig-es5.json",
    "compile:es6": "tsc --p ./tsconfig.json",
    "bundle:es5": "webpack cli config",
    "bundle:es5": "webpack cli config"
}
```

That's a heavy workload for node, but it's what must be done. You could break the scripts into different types such as adding a dev compile script that only runs the ES6 scripts but you'll figure out how to optimize later.

What does our `tsconfig.json` look like? It's mostly the same between the two versions, I'll show the differences below.

**tsconfig-es5.json**

```json
{
    "compilerOptions": {
        "outDir": "./_compiled/es5",
        "target": "es5",
        "module": "commonjs",
    }
}
```

**tsconfig.json**

```json
{
    "compilerOptions": {
        "outDir": "./_compiled/es6",
        "target": "es6",
        "module": "esnext",
    }
}
```

Those are the only changes that matter, it's basically just running the compiler twice where the output of the ES5 version of your code is bloated with the backwards compatibility changes.

Now for the Webpack bundling process? Yeah, I'm not going to cover that here since it depends on what you're building. You can figure that out yourself.
