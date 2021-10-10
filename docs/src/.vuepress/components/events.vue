<script>
import { Container, Draggable } from "vue-dndrop";
import { applyDrag, generateItems } from "../utils/helpers";
import Vue from "vue";

let i = 0;

function id() {
  return `item-${++i}`;
}

function generate(num) {
  return generateItems(5, (i) => ({
    id: id(),
    data: `Draggable ${num} - ${i + 1}`,
  }));
}

export default {
  name: "Events",

  components: {
    Container,
    Draggable,
  },

  data() {
    return {
      groups: [],
      flags: [],
      logs: {
        "get-child-payload": true,
        "should-accept-drop": false,
        "should-animate-drop": false,
        "drag-start": true,
        "drag-end": true,
        "drag-enter": true,
        "drag-leave": true,
        "drop-not-allowed": true,
        drop: true,
      },
      logPayload: true,
    };
  },

  created() {
    this.addColumn();
  },

  methods: {
    // -----------------------------------------------------------------------------------------------------------------
    // callbacks

    getChildPayload(groupIndex, itemIndex) {
      this.log("get-child-payload", groupIndex, itemIndex);
      return this.groups[groupIndex][itemIndex];
    },

    getShouldAcceptDrop(index, sourceContainerOptions, payload) {
      this.log("should-accept-drop", sourceContainerOptions, payload);
      return this.flags[index].drop;
    },

    getShouldAnimateDrop(index, sourceContainerOptions, payload) {
      this.log("should-animate-drop", sourceContainerOptions, payload);
      return this.flags[index].animate;
    },

    // -----------------------------------------------------------------------------------------------------------------
    // events

    onDragStart(...args) {
      this.log("drag-start", ...args);
    },

    onDragEnd(...args) {
      this.log("drag-end", ...args);
    },
    onDragEnter(...args) {
      this.log("drag-enter", ...args);
    },

    onDragLeave(...args) {
      this.log("drag-leave", ...args);
    },
    fireRelatedEventsOnly(...args) {
      this.log("fireRelatedEventsOnly", ...args);
    },

    onDrop(groupIndex, dropResult) {
      let result = applyDrag(this.groups[groupIndex], dropResult);
      Vue.set(this.groups, groupIndex, result);
      this.log("drop", dropResult);
    },

    dropNotAllowed(...args) {
      this.log("drop-not-allowed", ...args);
    },

    // -----------------------------------------------------------------------------------------------------------------
    // app

    addColumn() {
      this.groups.push(generate(this.groups.length + 1));
      this.flags.push({ drop: true, animate: true });
    },

    removeColumn() {
      this.groups.pop();
      this.flags.pop();
    },

    log(name, ...args) {
      if (this.logs[name]) {
        this.logPayload ? console.log(name, ...args) : console.log(name);
      }
    },
  },
};
</script>
<template>
  <div class="demo">
    <div class="columns">
      <div v-for="(items, index) in groups" :key="index" class="column">
        <div class="column-actions">
          <label>
            <input type="checkbox" v-model="flags[index].drop" /> Accept Drop
          </label>
          <label>
            <input type="checkbox" v-model="flags[index].animate" /> Animate
            Drop
          </label>
        </div>
        <Container
          :data-index="index"
          group-name="column"
          :get-child-payload="(itemIndex) => getChildPayload(index, itemIndex)"
          :should-accept-drop="
            (src, payload) => getShouldAcceptDrop(index, src, payload)
          "
          :should-animate-drop="
            (src, payload) => getShouldAnimateDrop(index, src, payload)
          "
          @drag-start="onDragStart"
          @drag-enter="onDragEnter(index)"
          @drag-leave="onDragLeave(index)"
          @drag-end="onDragEnd"
          @drop-not-allowed="dropNotAllowed"
          @drop="onDrop(index, $event)"
        >
          <Draggable v-for="item in items" :key="item.id">
            <div class="draggable-item">
              {{ item.data }}
            </div>
          </Draggable>
        </Container>
      </div>
    </div>

    <div class="controls">
      <h4 class="title">Fired events</h4>
      <small class="title">
        Choose which events will be used in the columns
      </small>
      <div class="actions">
        <label v-for="(key, name) in logs" :key="name">
          <input type="checkbox" v-model="logs[name]" /> {{ name }}
        </label>
        <hr />
        <label>
          <input type="checkbox" v-model="logPayload" /> log payload
        </label>
      </div>
      <div class="buttons">
        <button
          class="button remove"
          @click="removeColumn()"
          :disabled="groups.length === 1"
        >
          Remove Column
        </button>
        <button class="button add" @click="addColumn()">Add Column</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
}
.controls .title {
  align-self: flex-start;
  margin: 0 1rem;
}
.controls .buttons {
  align-self: flex-end;
  margin: 1rem;
}

.controls .actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 1rem;
}

.controls > div {
  padding-top: 1em;
}

.buttons,
.column-actions {
  display: flex;
  gap: 1rem;
}

.column-actions {
  justify-content: space-evenly;
}

.buttons .button {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-left: 5px solid #c4ebaf;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  transition: border-color 0.2s linear;
}

.buttons .button.remove {
  border-left: 5px solid #dc3545;
}

.buttons .button.remove:disabled {
  border-left: 5px solid #e0e0e0;
}

.buttons .button.add {
  border-left: 5px solid #c4ebaf;
}

label {
  display: block;
  line-height: 1.6em;
}

.columns {
  display: flex;
  gap: 0.5rem;
  justify-content: stretch;
}

.column {
  flex: 1;
  border-radius: 6px;
  /* border: 1px solid #e0e0e0; */
}

.column {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.column .dndrop-container.vertical {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  cursor: pointer;
}
</style>
