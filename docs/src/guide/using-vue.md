# Vue

For a simple implementation, all you have to do is the following:

```jsx
<template>
  <div>
    <div class="simple-page">
        <Container @drop="onDrop">
          <Draggable v-for="item in items" :key="item.id">
            <div class="draggable-item">
              {{item.data}}
            </div>
          </Draggable>
        </Container>
    </div>
  </div>
</template>
<script>
```

```js
import { Container, Draggable } from "vue-dndrop";
import { applyDrag, generateItems } from "./utils";
export default {
  name: "Simple",
  components: { Container, Draggable },
  data() {
    return {
      items: generateItems(50, i => ({ id: i, data: "Draggable " + i }))
    };
  },
  methods: {
    onDrop(dropResult) {
      this.items = applyDrag(this.items, dropResult);
    }
  }
};

</script>
```

As our helpers are:

```js
export const applyDrag = (arr, dragResult) => {
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
};

export const generateItems = (count, creator) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};
```

::: tip
Import `Container, Draggable` from `vue-dndrop` and have fun.
:::

---

## Simple component

::: tip
See this example [here](https://github.com/amendx/vue-dndrop), and check your console (or [vue-devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=pt-BR)) for some magic.
:::
<cards-kanban />
