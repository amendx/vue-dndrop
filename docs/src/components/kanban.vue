<script>
import { Container, Draggable } from "vue-dndrop";
export default {
  name: "Kanban",
  components: { Container, Draggable },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => []
    },
    colWidth: {
      type: [Number, String],
      default: () => ""
    },
    colMinWidth: {
      type: [Number, String],
      default: () => ""
    },
    colMaxWidth: {
      type: [Number, String],
      default: () => ""
    },
    dropText: {
      type: String,
      default: () => "Arraste e solte aqui"
    },
    dropIcon: {
      type: String,
      default: () => "copy"
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    innerColCount: {
      type: Boolean,
      default: false
    },
    colBgColor: {
      type: String,
      default: () => "var(--shr-color-grayscale-bg-secondary)"
    },
    countText: {
      type: String,
      default: () => "itens"
    }
  },
  data() {
    return {
      sourceContainerIndex: null,
      kanbanColumns: [],
      dropPlaceholderOptions: {
        className: "shr-kanban__drop-preview",
        animationDuration: "150",
        showOnTop: true
      }
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
    columnClasses() {
      const classes = [];
      if (this.noBorder) classes.push("shr-kanban__column--no-border");
      return classes;
    }
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
            newStatus: status
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
    }
  }
};
</script>

<template>
  <div class="shr-kanban">
    <template v-if="!loading">
      <div
        v-for="(column, index) in kanbanColumns"
        :key="index"
        :style="columnStyle"
        :class="['shr-kanban__column', columnClasses]"
      >
        <div class="shr-kanban__header">
          <div class="shr-kanban__description">
            <span v-if="$slots[`icon-${column.id}`]" class="shr-kanban__icon">
              <slot :name="`icon-${column.id}`" />
            </span>
            <h3 class="shr-kanban__title">{{ column.name }}</h3>
          </div>
          <p v-if="!innerColCount" class="shr-kanban__quantity">
            {{ column.columnItems.length }} {{ countText }}
          </p>
        </div>
        <div class="shr-kanban__content" :style="contentStyle">
          <p
            v-if="innerColCount"
            :class="[
              'shr-kanban__quantity',
              'shr-kanban__quantity--inner-count'
            ]"
          >
            {{ column.columnItems.length }} {{ countText }}
          </p>
          <Container
            group-name="kanban"
            :get-child-payload="event => getDraggedItem(event, index)"
            :should-accept-drop="
              (src, payload) =>
                validation(src, payload, index, column.validation)
            "
            :drop-placeholder="dropPlaceholderOptions"
            @drag-start="
              sourceContainerIndex = index;
              $emit('drag');
            "
            @drag-enter="$emit('selected-column', column)"
            @drop="onDrop(index, $event, column)"
          >
            <Draggable
              v-for="(item, indice) in column.columnItems"
              :key="indice"
            >
              <slot name="card" :item="item" />
            </Draggable>

            <div class="shr-kanban__move-icon">
             <span>{{ dropText }}</span>
            </div>
          </Container>
        </div>
      </div>
    </template>
    <div v-else class="shr-kanban__skeleton-container">
      <slot name="skeleton" />
      <div v-if="!$slots.skeleton" class="shr-kanban__skeleton">
        <div
          v-for="(i, index) in colSkeleton"
          :key="i"
          class="shr-kanban__skeleton-column"
          :animation-data="index"
          :style="
            `min-width: ${colMinWidth || 180}px; max-width: ${colMaxWidth ||
              330}px`
          "
        >
          <slot name="skeletonCard" />
          <template v-if="!$slots.skeletonCard">
            <div
              v-for="j in Math.floor(Math.random() * (7 - 2) + 2)"
              :key="j"
              class="shr-kanban__skeleton-card"
            >
              <div class="shr-kanban__skeleton-card--one">
                <ShrSkeleton
                  type="rect"
                  width="50"
                  height="12"
                  color="#efefe9"
                />
              </div>
              <div class="shr-kanban__skeleton-card--two">
                <ShrSkeleton
                  type="rect"
                  width="50"
                  height="12"
                  color="#efefe9"
                />
              </div>
              <div class="shr-kanban__skeleton-card--three">
                <ShrSkeleton
                  type="rect"
                  width="120"
                  height="12"
                  color="#e9e9e9"
                />
              </div>
              <div class="shr-kanban__skeleton-card--four">
                <ShrSkeleton
                  type="rect"
                  width="70"
                  height="12"
                  color="#efefe9"
                />
              </div>
              <div class="shr-kanban__skeleton-card--five">
                <ShrSkeleton
                  type="rect"
                  width="100"
                  height="12"
                  color="#efefe9"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

