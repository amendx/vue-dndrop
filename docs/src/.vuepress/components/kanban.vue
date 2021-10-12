<script>
import { Container, Draggable } from "vue-dndrop";
export default {
  name: "Kanban",
  components: { Container, Draggable },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    colWidth: {
      type: [Number, String],
      default: () => "",
    },
    colMinWidth: {
      type: [Number, String],
      default: () => "",
    },
    colMaxWidth: {
      type: [Number, String],
      default: () => "",
    },
    dropText: {
      type: String,
      default: () => "Drop here",
    },
    dropIcon: {
      type: String,
      default: () => "copy",
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
    innerColCount: {
      type: Boolean,
      default: false,
    },
    colBgColor: {
      type: String,
      default: () => "",
    },
    countText: {
      type: String,
      default: () => "itens",
    },
  },
  data() {
    return {
      sourceContainerIndex: null,
      kanbanColumns: [],
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
    };
  },
  computed: {
    colSkeleton() {
      const screenSize = window.innerWidth - 300;
      const quantity = screenSize / (this.colMinWidth || 180);
      return Math.ceil(quantity);
    },

    columnStyle() {
      return `width: ${this.colWidth}px;
          min-width: ${this.colMinWidth}px;
          max-width: ${this.colMaxWidth}px;
          `;
    },
    contentStyle() {
      return `background-color: ${this.colBgColor}`;
    },
  },
  mounted() {
    this.kanbanColumns = [...this.columns];
  },
  methods: {
    dropAction(arr, dragResult, column) {
      const { removedIndex, addedIndex, payload } = dragResult;
      const { status } = column;
      if (removedIndex === null && addedIndex === null) return arr;

      const itens = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = itens.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        itens.splice(addedIndex, 0, itemToAdd);
        if (payload.status.length > 1)
          this.$emit("item-dropped", { item: payload, column: status });
        else if (payload.status !== status)
          this.$emit("status-change", {
            item: payload,
            newStatus: status,
          });
      }

      return itens;
    },
    validation(src, payload, index, validator = () => true) {
      const isSource = index === this.sourceContainerIndex;
      return isSource || validator(src, payload, index);
    },
    onDrop(index, dropResult, column) {
      this.kanbanColumns[index].columnItems = this.dropAction(
        this.kanbanColumns[index].columnItems,
        dropResult,
        column
      );
    },
    getDraggedItem(item, indice, prop) {
      this.sourceContainerIndex = indice;
      return this.kanbanColumns[indice].columnItems[item];
    },
    dropNotAllowed({ payload, container }) {
      console.log("drop not allowed", payload);
    },
  },
};
</script>

<template>
  <div class="kanban">
    <template v-if="!loading">
      <div
        v-for="(column, index) in kanbanColumns"
        :key="index"
        :style="columnStyle"
        class="kanban__column"
      >
        <div class="kanban__header">
          <div class="kanban__description">
            <span v-if="$slots[`icon-${column.id}`]" class="kanban__icon">
              <slot :name="`icon-${column.id}`" />
            </span>
            <h3 class="kanban__title">{{ column.name }}</h3>
          </div>
          <p v-if="!innerColCount" class="kanban__quantity">
            {{ column.columnItems.length }} {{ countText }}
          </p>
        </div>
        <div class="kanban__content" :style="contentStyle">
          <p
            v-if="innerColCount"
            :class="['kanban__quantity', 'kanban__quantity--inner-count']"
          >
            {{ column.columnItems.length }} {{ countText }}
          </p>
          <Container
            group-name="kanban"
            :get-child-payload="(event) => getDraggedItem(event, index)"
            :should-accept-drop="
              (src, payload) =>
                validation(src, payload, index, column.validation)
            "
            :drop-placeholder="dropPlaceholderOptions"
            @drop="onDrop(index, $event, column)"
            @drag-start="
              sourceContainerIndex = index;
              $emit('drag');
            "
            @drop-not-allowed="dropNotAllowed"
            @drag-enter="$emit('selected-column', column)"
          >
            <Draggable
              v-for="(item, indice) in column.columnItems"
              :key="indice"
            >
              <slot name="card" :item="item" />
            </Draggable>

            <div class="kanban__move-icon">
              <span>{{ dropText }}</span>
            </div>
          </Container>
        </div>
      </div>
    </template>
    <div v-else class="kanban__skeleton-container">
      <slot name="skeleton" />
      <div v-if="!$slots.skeleton" class="kanban__skeleton">
        <div
          v-for="(i, index) in colSkeleton"
          :key="i"
          class="kanban__skeleton-column"
          :animation-data="index"
          :style="
            `min-width: ${colMinWidth || 180}px; max-width: ${colMaxWidth ||
              330}px`
          "
        >
          <slot name="skeletonCard" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* kanban */
.kanban {
  display: flex;
  justify-content: stretch;
  width: 100%;
  height: 100%;
  user-select: none;
}
.kanban__move-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #b0b0b0;
  user-select: none;
}
.kanban__move-icon span {
  margin-left: 10px;
}
.kanban__move-icon svg {
  width: 20px;
  height: 20px;
}
.kanban__drop-preview {
  position: relative;
  margin: 10px;
  background-color: #edf1f3;
  border: 2px dashed rgba(0, 0, 0, 0.059);
  border-radius: 4px;
}
.kanban__drop-preview::before {
  position: absolute;
  top: 50%;
  left: 50%;
  color: #b0b0b0;
  transform: translate(-50%, -50%);
}
.kanban__drop-preview::after {
  position: absolute;
  top: 50%;
  left: 27%;
  width: 20px;
  height: 20px;
  content: "";
  transform: translate(-50%, -50%);
}
.kanban__description {
  display: flex;
  align-items: center;
}
.kanban__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #edf5f7;
  padding: 0.5rem;
  border-radius: 8px;
}
.kanban__title {
  margin: 0 0 0 5px;
  font-size: 1rem;
  font-weight: bold;
  color: #555;
}
.kanban__quantity {
  margin-top: 0;
  font-size: small;
  color: #b0b0b0;
  text-align: right;
}
.kanban__quantity--inner-count {
  margin: 1rem 1rem 0 1rem;
  padding-top: 0.5rem;
}
.kanban__column {
  flex: 1;
  height: fit-content;
  padding: 10px;
  border-radius: 6px;
  transition: height 0.5s ease;
  border: 1px solid #e0e0e0;
}
.kanban__column:not(:first-of-type) {
  margin-left: 15px;
}
.kanban__column--no-border {
  border: none;
}
.kanban__header {
  margin-bottom: 15px;
  background-color: #fff;
}
.kanban__content {
  position: relative;
}
.kanban__skeleton {
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 15px;
  padding-right: 15px;
  background-color: #f8f8f8;
  border-radius: 4px;
  overflow: auto;
}
.kanban__skeleton-container {
  width: 100%;
}
.kanban__skeleton-column {
  flex: 1;
  height: calc(100% - 30px);
  padding: 10px;
  margin-left: 15px;
  background-color: #e9e9e9;
  border-radius: 6px;
}
.kanban__skeleton-card {
  position: relative;
  height: 100px;
  padding: 15px;
  margin-top: 16px;
  background-color: #f5f5f5;
  border-radius: 6px;
}
.kanban__skeleton-card--one {
  position: absolute;
  top: 8px;
}
.kanban__skeleton-card--two {
  position: absolute;
  top: 8px;
  right: 10px;
}
.kanban__skeleton-card--three {
  position: absolute;
  top: 30px;
}
.kanban__skeleton-card--four {
  position: absolute;
  bottom: 2rem;
}
.kanban__skeleton-card--five {
  position: absolute;
  left: 1rem;
  bottom: 0.5rem;
}

.item,
.draggable-item,
.draggable-item-horizontal {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 8px;
  cursor: pointer;
  user-select: none;
  background-color: white;
  border: 1px solid transparent;
  border-left: 5px solid #e0e0e0;
  border-radius: 4px;
  transition: border-color 0.2s linear;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.1);
}
.item .card {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.item .card small {
  color: #838383;
}
.item.open {
  border-left: 5px solid #f3c1c1;
}
.item.executing {
  border-left: 5px solid #c4ebaf;
}
.item.finished {
  border-left: 5px solid #b3d5e9;
}
.item.paralised {
  border-left: 5px solid #dc3545;
}
.item.review {
  border-left: 5px solid #e0e0e0;
}
.badge {
  margin: 1rem 0;
  cursor: pointer;
}
.label {
  color: #838383;
}

.kanban-action {
  display: flex;
  justify-content: space-between;
}

.kanban-button {
  max-width: 130px;
  pointer-events: none;
  border: none;
  color: #f7f7f7;
  padding: 1px 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 100px;
}

.kanban-button.open {
  background-color: #f3c1c1;
}
.kanban-button.executing {
  background-color: #c4ebaf;
}
.kanban-button.finished {
  background-color: #b3d5e9;
}
.kanban-button.paralised {
  background-color: #dc3545;
}
.kanban-button.review {
  background-color: #e0e0e0;
}

/* end of kanban  */
</style>
