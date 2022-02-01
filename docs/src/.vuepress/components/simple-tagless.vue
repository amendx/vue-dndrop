<script>
import { Container, Draggable } from "../../../../src/main.js";
import { applyDrag, generateItems } from "../utils/helpers";

export default {
  name: "SimpleTagless",

  components: { Container, Draggable },

  data() {
    return {
      items: generateItems(10, (i) => ({ id: i, data: "Draggable " + i })),
    };
  },

  methods: {
    onDrop(dropResult) {
      console.log("drop result ", dropResult);
      this.items = applyDrag(this.items, dropResult);
    },
    getGhostParent() {
      return document.body;
    },
    onDropReady(dropResult) {
      console.log("drop ready", dropResult);
    },
    dropNotAllowed({ payload, container }) {
      console.log("drop not allowed");
    },
    getChildPayload(index) {
      return this.items[index];
    },
  },
};
</script>
<template>
  <div class="simple-page">
    <Container
      :get-ghost-parent="getGhostParent"
      :get-child-payload="getChildPayload"
      remove-on-drop-out
      @drop="onDrop"
      @drop-ready="onDropReady"
      @drop-not-allowed="dropNotAllowed"
    >
      <Draggable v-for="item in items" :key="item.id">
        {{ item.data }}
      </Draggable>
    </Container>
  </div>
</template>
