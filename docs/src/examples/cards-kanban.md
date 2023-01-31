# Cards kanban
> This is a simple example of how a customized **Kanban** dashboard would look like with `vue-dndrop`


<doc-example title="Cards kanban" file="cards-kanban" />

::: tip Helpers

You can also find the helpers functions used in this example [here](/examples/helpers.html)
- **props**:

  - :column-count: `[Array]` - An array of `values` **or** `Objects` with `{ id, value }` matching your columns' items value
     > *remember if you use this **prop** you'll have to manage the change of values externally*
```js
:column-count="[2, 12, 0]"
:column-count="[
        { id: 2, value: 11 },
        { id: 0, value: 2 },
        { id: 1, value: 90 },
    ]"
```

:::