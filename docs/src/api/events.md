# Events

Events may call user-defined handlers at particular points in the drag-and-drop lifecycle.

---

### `@drag-start`

Event to be emitted by all containers on drag start.

```jsx
<Container @drag-start="onDragStart">
```

```js
onDragStart (dragResult) {
  const { isSource, payload, willAcceptDrop } = dragResult
}
```

#### Parameters

- **dragResult** : `object`

  - **payload** : `object` : the payload object that is returned by [get-child-payload](#get-child-payload). It will be undefined in case get-child-payload is not set.
  - **isSource** : `boolean` : true if it is called by the container which drag starts from otherwise false.
  - **willAcceptDrop** : `boolean` : true if the dragged item can be dropped into the container, otherwise false.

---

### `@drag-end`

The function to be called by all containers on drag end. Called before [drop](#drop) event.

```jsx
<Container @drag-end="onDragEnd">
```

```js
onDragEnd (dragResult) {
  const { isSource, payload, willAcceptDrop } = dragResult
}
```

#### Parameters

- **dragResult** : `object`

  - **isSource** : `boolean` : true if it is called by the container which drag starts from, otherwise false.
  - **payload** : `object` : the payload object that is returned by [get-child-payload](#get-child-payload) function. It will be undefined in case get-child-payload is not set.
  - **willAcceptDrop** : `boolean` : true if the dragged item can be dropped into the container, otherwise false.

---

### `@drag-enter`

The event to be emitted by the relevant container whenever a dragged item enters its boundaries while dragging.

```jsx
<Container @drag-enter="onDragEnter">
```

```js
onDragEnter () {
  ...
}
```

---

### `@drag-leave`

The event to be emitted by the relevant container whenever a dragged item leaves its boundaries while dragging.

```jsx
<Container @drag-leave="onDragLeave">
```

```js
onDragLeave () {
  ...
}
```

---

### `@drop-ready`

The function to be called by the container which is being drag over, when the index of possible drop position changed in container. Basically it is called each time the draggables in a container slides for opening a space for dragged item. **dropResult** is the only parameter passed to the function which contains the following properties.

```jsx
<Container @drop-ready="onDropReady">
```

```js
onDropReady(dropResult) {
  const { removedIndex, addedIndex, payload, element } = dropResult;
  ...
}
```

#### Parameters

- **dropResult** : `object`
  - **removedIndex** : `number` : index of the removed children. Will be `null` if no item is removed.
  - **addedIndex** : `number` : index to add droppped item. Will be `null` if no item is added.
  - **payload** : `object` : the payload object retrieved by calling _getChildPayload_ function.
  - **element** : `DOMElement` : the DOM element that is moved

---

### `@drop`

The event to be emitted by any relevant container when drop is over. (After drop animation ends). Source container and any container that could accept drop is considered relevant.

```jsx
<Container @drop="onDrop">
```

```js
onDrop (dropResult) {
  const { removedIndex, addedIndex, payload, element } = dropResult;
  ...
}
```

#### Parameters

- **dropResult** : `object`

  - **removedIndex** : `number` : index of the removed child. Will be `null` if no item is removed.
  - **addedIndex** : `number` : index to add dropped item. Will be `null` if no item is added.
  - **payload** : `object` : the payload object retrieved by calling [get-child-payload](#get-child-payload) function.
  - **element** : `DOMElement` : the DOM element that is moved

---

### `@drop-not-allowed`

Event to be emitted by the current container when drop is not allowed or does not fit the rule applied inside the column/element validation.

```jsx
<Container @drop-not-allowed="dropNotAllowed">
```

```ts
dropNotAllowed ({payload, container}) {
  return false
}
```

#### Parameters

- **payload** : `object` : the payload object that is returned by [get-child-payload](#get-child-payload). It will be undefined in case get-child-payload is not set.
- **container** : `object` : return the container which the current payload was unable to be dropped.
