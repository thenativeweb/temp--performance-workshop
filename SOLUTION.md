# Solution

In this file you'll find a list of the performance problems in the app.
You can look at them later, if you want to work through this example again on
your own.

I would _strongly_ recommend not looking at these solutions during the workshop!

## `MessageBoard.jsx`

### Missing `key` property in `map` return values.

Add a key property to the `Message` component.

### Missing `useMemo` for derived state

Wrap the values of the constant at the top of the component in `useMemo`.

### Component `Message` is defined in the render method

Move the component to a separate file.

### Property `config` is too broad

Only pass `highlightNewestMessage` to the component.

## `Logo.jsx`

### The asset `logo.png` is too large for its target size

## `Profile.jsx`

### Component `ProfileButtons` is defined in the render method

### Derived state `tags` is not memoized

### Inline callbacks are used

## `MessageBoardPage.jsx`

### Static constant `config` is defined in the render method

### Inline callbacks are passed to the `Profile` component

## `webpack.config.js`

### `dataUrlCondition.maxSize` is set too large


