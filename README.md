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

## Additional Goals

1. Create a service worker
1. Server the cached site when in offline mode
1. Experiment with an offline first protocall alongside the ability to reload page with a cache bust when available
1. Experiment with lazy loading / dynamically importing all scripts and stylesheets
