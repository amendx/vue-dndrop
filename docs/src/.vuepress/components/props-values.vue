<script>
import { Container, Draggable } from "vue-dndrop";

export default {
  name: "SimpleScroller",

  components: { Container, Draggable },

  data() {
    return {
      list: [
        { name: "Neil", category: "Engineering", value: 13 },
        { name: "Norah", category: "Marketing", value: 23 },
        { name: "Kasey", category: "Sales", value: 120 },
        { name: "Sabrina", category: "Marketing", value: 40 },
        { name: "Paul", category: "Sales", value: 45 },
      ],
    };
  },
};
</script>
<template>
  <div class="wide-page">
    <p>Properties define the visual behaviour of the library:</p>
    <table style="border-spacing: 0">
      <thead>
        <tr>
          <th>Property</th>
          <th style="text-align:center">Type</th>
          <th style="text-align:center">Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="prop">:orientation</td>
          <td style="text-align:center">string</td>
          <td style="text-align:center"><code>vertical</code></td>
          <td class="prop">
            Orientation of the container. Can be <strong>horizontal</strong> or
            <strong>vertical</strong>.
          </td>
        </tr>
        <tr>
          <td class="prop">:behaviour</td>
          <td style="text-align:center">string</td>
          <td style="text-align:center"><code>move</code></td>
          <td class="prop">
            Property to describe weather the dragging item will be moved or
            copied to target container. Can be <strong>move</strong> or
            <strong>copy</strong> or <strong>drop-zone</strong> or
            <strong>contain</strong>.
          </td>
        </tr>
        <tr>
          <td class="prop">:tag</td>
          <td style="text-align:center">string or NodeDescription</td>
          <td style="text-align:center"><code>div</code></td>
          <td class="prop"><em>See descriptions below</em></td>
        </tr>
        <tr>
          <td class="prop">:group-name</td>
          <td style="text-align:center">string</td>
          <td style="text-align:center"><code>undefined</code></td>
          <td class="prop">
            Draggables can be moved between the containers having the same group
            names. If not set container will not accept drags from outside. This
            behaviour can be overriden by shouldAcceptDrop function. See below.
          </td>
        </tr>
        <tr>
          <td class="prop">:lock-axis</td>
          <td style="text-align:center">string</td>
          <td style="text-align:center"><code>undefined</code></td>
          <td class="prop">
            Locks the movement axis of the dragging. Possible values are
            <strong>x</strong>, <strong>y</strong> or
            <strong>undefined</strong>.
          </td>
        </tr>
        <tr>
          <td class="prop">:drag-handle-selector</td>
          <td style="text-align:center">string</td>
          <td style="text-align:center"><code>undefined</code></td>
          <td class="prop">
            Css selector to test for enabling dragging. If not given item can be
            grabbed from anywhere in its boundaries.
          </td>
        </tr>
        <tr>
          <td class="prop">:non-drag-area-selector</td>
          <td style="text-align:center">string</td>
          <td style="text-align:center"><code>undefined</code></td>
          <td class="prop">
            Css selector to prevent dragging. Can be useful when you have form
            elements or selectable text somewhere inside your draggable item. It
            has a precedence over <strong>dragHandleSelector</strong>.
          </td>
        </tr>
        <tr>
          <td class="prop">:drag-begin-delay</td>
          <td style="text-align:center">number</td>
          <td style="text-align:center">
            <code>0</code> (<code>200</code> for touch devices)
          </td>
          <td class="prop">
            Time in milisecond. Delay to start dragging after item is pressed.
            Moving cursor before the delay more than 5px will cancel dragging.
          </td>
        </tr>
        <tr>
          <td class="prop">:animation-duration</td>
          <td style="text-align:center">number</td>
          <td style="text-align:center"><code>250</code></td>
          <td class="prop">
            Animation duration in milisecond. To be consistent this animation
            duration will be applied to both drop and reorder animations.
          </td>
        </tr>
        <tr>
          <td class="prop">:auto-scroll-enabled</td>
          <td style="text-align:center">boolean</td>
          <td style="text-align:center"><code>true</code></td>
          <td class="prop">
            First scrollable parent will scroll automatically if dragging item
            is close to boundaries.
          </td>
        </tr>
        <tr>
          <td class="prop">:drag-class</td>
          <td style="text-align:center">string</td>
          <td style="text-align:center"><code>undefined</code></td>
          <td class="prop">
            Class to be added to the ghost item being dragged. The class will be
            added after it&#39;s added to the DOM so any transition in the class
            will be applied as intended.
          </td>
        </tr>
        <tr>
          <td class="prop">:drop-class</td>
          <td style="text-align:center">string</td>
          <td style="text-align:center"><code>undefined</code></td>
          <td class="prop">
            Class to be added to the ghost item just before the drop animation
            begins.
          </td>
        </tr>
        <tr>
          <td class="prop">:remove-on-drop-out</td>
          <td style="text-align:center">boolean</td>
          <td style="text-align:center"><code>undefined</code></td>
          <td class="prop">
            When set true onDrop will be called with a removedIndex if you drop
            element out of any relevant container
          </td>
        </tr>
        <tr>
          <td class="prop">:drop-placeholder</td>
          <td style="text-align:center">boolean,object</td>
          <td style="text-align:center"><code>undefined</code></td>
          <td class="prop">
            Options for drop placeholder. <strong>className</strong>,
            <strong>animationDuration</strong>, <strong>showOnTop</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="css" scoped>
table {
  display: table;
  /* border-collapse: collapse does not work when rows are dragged (transformed) */
  border-collapse: separate;
}

tr {
  display: table-row !important;
}

tr[style*="transform"] {
  border-collapse: separate !important;
}

td {
  padding: 5px;
  border: 1px solid #ccc !important;
  background-color: white;
}

.table,
td,
th {
  border: 1px solid #ddd;
  text-align: left;
  font-family: monospace;
}

.table {
  border-collapse: collapse;
  width: 1200px;
}

th,
td {
  padding: 15px;
}

.page {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 2rem;
}

.prop:nth-child(odd) {
  background-color: #f2f2f2;
}
</style>
