<script>
import { Container, Draggable } from "vue-dndrop";
import { applyDrag, generateItems } from "../utils/helpers";

export default {
  name: "DragClass",

  components: { Container, Draggable },

  data() {
    return {
      items: generateItems(50, (i) => ({ id: i, data: "Draggable " + i })),
    };
  },

  methods: {
    onDrop(dropResult) {
      this.items = applyDrag(this.items, dropResult);
    },
  },
};
</script>

<template>
  <div :class="['simple-page', 'limited-height']">
    <Container
      @drop="onDrop"
      drag-class="opacity-ghost"
      drop-class="opacity-ghost-drop"
    >
      <Draggable v-for="item in items" :key="item.id">
        <div class="draggable-item">
          {{ item.data }}
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<style scoped>
.limited-height {
  height: 60vh;
  overflow: auto;
}
</style>
