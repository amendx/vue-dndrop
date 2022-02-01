# Simple

> If a `Container` does **not** bind with [:get-child-payload](/api/callbacks.html#get-child-payload), the `element` returned inside both `@drop` and `@dropReady` come as `undefined`.

::: tip Helpers

You can also find the helpers functions [here](/examples/utils.html)

:::

<doc-example title="Simple" file="simple" />

::: details Click here to expand the code for the helpers functions

```js
applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;

      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }

      return result;
},

generateItems(count, creator) {
      const result = [];
      for (let i = 0; i < count; i++) {
        result.push(creator(i));
      }
      return result;
},
```

:::
