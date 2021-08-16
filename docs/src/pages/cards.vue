<template>
  <div class="card-scene">
    <Container
      orientation="horizontal"
      @drop="onColumnDrop($event)"
      drag-handle-selector=".column-drag-handle"
      @drag-start="dragStart"
      :drop-placeholder="upperDropPlaceholderOptions"
    >
      <Draggable v-for="column in scene.children" :key="column.id">
        <div :class="column.props.className">
          <div class="card-column-header">
            <span class="column-drag-handle">&#x2630;</span>
            {{ column.name }}
          </div>
          <Container
            group-name="col"
            @drop="e => onCardDrop(column.id, e)"
            @drag-start="e => log('drag start', e)"
            @drag-end="e => log('drag end', e)"
            :get-child-payload="getCardPayload(column.id)"
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
            :drop-placeholder="dropPlaceholderOptions"
          >
            <Draggable v-for="card in column.children" :key="card.id">
              <div :class="card.props.className" :style="card.props.style">
                <h3> Task # {{card.number}}</h3> 
                <p class="card-text">{{ card.data }}</p>
              </div>
            </Draggable>
          </Container>
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-dndrop";
import { applyDrag, generateItems } from "../utils/helpers";

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

const columnNames = ["Backlog", "To do", "Doing", "Finished"];

const cardColors = [
"#117cb3ff",
"#2989bbff",
"#4297c2ff",
"#5aa4caff",
"#73b2d1ff",
"#8bbfd9ff",
"#a4cde0ff",
"#bcdae8ff",
"#73b2d1ff",
"#4297c2ff"
];



const pickColor = () => {
  const rand = Math.floor(Math.random() * 10);
  return cardColors[rand];
};

const scene = {
  type: "container",
  props: {
    orientation: "horizontal"
  },
  children: generateItems(4, i => ({
    id: `column${i}`,
    type: "container",
    name: columnNames[i],
    props: {
      orientation: "vertical",
      className: "card-container"
    },
    children: generateItems(+(Math.random() * 10).toFixed() + 5, j => ({
      type: "draggable",
      id: `${i}${j}`,
      props: {
        className: "card",
        style: { backgroundColor: pickColor() }
      },
      number: Math.floor(Math.random() * 100),
      data: lorem.slice(0, Math.floor(Math.random() * 150) + 30)
    }))
  }))
};

export default {
  name: "Cards",

  components: { Container, Draggable },

  data() {
    return {
      scene,
      upperDropPlaceholderOptions: {
        className: "cards-drop-preview",
        animationDuration: "150",
        showOnTop: true
      },
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true
      }
    };
  },

  methods: {
    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.scene);
      scene.children = applyDrag(scene.children, dropResult);
      this.scene = scene;
    },

    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene);
        const column = scene.children.filter(p => p.id === columnId)[0];
        const columnIndex = scene.children.indexOf(column);

        const newColumn = Object.assign({}, column);
        newColumn.children = applyDrag(newColumn.children, dropResult);
        scene.children.splice(columnIndex, 1, newColumn);

        this.scene = scene;
      }
    },

    getCardPayload(columnId) {
      return index => {
        return this.scene.children.filter(p => p.id === columnId)[0].children[
          index
        ];
      };
    },

    dragStart() {
      console.log("drag started");
    },

    log(...params) {
      console.log(...params);
    }
  }
};
</script>
