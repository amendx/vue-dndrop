# Lifecycle

The lifecycle of a drag is both described, and can be controlled, by a series of [callbacks](#callbacks) and [events](#events), which are illustrated below for a example **containing 3 containers**:

```
Mouse     Calls  Callback / Event       Parameters              Notes
down   o                                                        Initial click
move   o                                                        Initial drag
       |
       |         get-child-payload()    index                   Function should return payload
       |
       |   3 x   should-accept-drop()   srcOptions, payload     Fired for all containers
       |
       |   3 x   drag-start             dragResult              Fired for all containers
       |
       |         drag-enter
       v
move   o                                                        Drag over containers
       |
       |   n x   drag-leave                                     Fired as draggable leaves container
       |   n x   drag-enter                                     Fired as draggable enters container
       v
up     o                                                        Finish drag
                 should-animate-drop()  srcOptions, payload     Fires once for dropped container
           3 x   drag-end               dragResult              Fired for all containers
           n x   drop                   dropResult              Fired only for droppable containers
```

> Note that `should-accept-drop` is fired before every `drag-start`, and before every `drag-end`, but has been omitted here for clarity.

---

The `dragResult` parameter has the format:

```js
dragResult: {
    payload,
    isSource,
    willAcceptDrop,
}
```

---

The `dropResult` parameter has the format:

```js
dropResult: {
    addedIndex,
    removedIndex,
    payload,
    element,
}
```

> Note that additional parameters can be passed to callbacks and event handlers by writing an interim handler _inline_ in the markup:

---

The `getShouldAcceptDrop` parameter has the format:

```jsx
<div v-for="(items, index) in groups"
  <Container group-name="column"
    :should-accept-drop="(src, payload) => getShouldAcceptDrop(index, src, payload)"
    >
    ...
  </Container>
</div>
```

> This can provide handler functions context-sensitive data, such as the loop index or current item.
