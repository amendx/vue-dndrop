<script>
import { Container, Draggable } from "vue-dndrop";
import { applyDrag, generateItems } from "../utils/helpers";

export default {
  name: "Copy",

  components: { Container, Draggable },

  data() {
    return {
      items1: generateItems(15, (i) => ({
        id: "1" + i,
        data: `Source Draggable - ${i}`,
      })),
      items2: generateItems(15, (i) => ({
        id: "2" + i,
        data: `Draggable 2 - ${i}`,
      })),
      items3: generateItems(15, (i) => ({
        id: "3" + i,
        data: `Draggable 3 - ${i}`,
      })),
    };
  },

  methods: {
    onDrop(collection, dropResult) {
      this[collection] = applyDrag(this[collection], dropResult);
    },

    getChildPayload1(index) {
      return this.items1[index];
    },

    getChildPayload2(index) {
      return this.items2[index];
    },

    getChildPayload3(index) {
      return this.items3[index];
    },
  },
};
</script>

<template>
  <div class="copy">
    <div class="item">
      <Container
        class="item"
        behaviour="copy"
        group-name="1"
        :get-child-payload="getChildPayload1"
      >
        <Draggable v-for="item in items1" :key="item.id">
          <div class="draggable-item">
            {{ item.data }}
          </div>
        </Draggable>
      </Container>
    </div>
    <div class="item">
      <Container
        group-name="1"
        :get-child-payload="getChildPayload2"
        @drop="onDrop('items2', $event)"
      >
        <Draggable v-for="item in items2" :key="item.id">
          <div class="draggable-item">
            {{ item.data }}
          </div>
        </Draggable>
      </Container>
    </div>
    <div class="item">
      <Container
        group-name="1"
        :get-child-payload="getChildPayload3"
        @drop="onDrop('items3', $event)"
      >
        <Draggable v-for="item in items3" :key="item.id">
          <div class="draggable-item">
            {{ item.data }}
          </div>
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<style>
.copy {
  display: flex;
  gap: 1rem;
}
.item {
  flex: 1;
}
</style>
