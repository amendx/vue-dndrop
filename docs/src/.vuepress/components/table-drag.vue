<script>
import { Container, Draggable } from "../../../../src/main.js";
import { applyDrag, generateItems } from "../utils/helpers";

export default {
  name: "Table",

  components: { Container, Draggable },

  data() {
    return {
      items: generateItems(10, (i) => ({ id: i, data: "Draggable " + i })),
    };
  },

  methods: {
    getGhostParent() {
      return  document.querySelector("tbody");
      
    },
    onDrop(dropResult) {
      this.items = applyDrag(this.items, dropResult);
    },
       onDropReady(dropResult) {
      console.log("drop ready", dropResult);
    },
  },
};
</script>
<template>
  <div class="wide-page">
    <table style="border-spacing: 0">
      <thead>
        <tr>
          <th>Lorem</th>
          <th>Ipsum</th>
          <th>Sit</th>
        </tr>
      </thead>
      <Container @drop="onDrop" tag="tbody" @drop-ready="onDropReady"  lock-axis="y">
        <Draggable v-for="item in items" :key="item.id" tag="tr" style="height: 30px;">
          <td>Row {{ item.data }} Column 1</td>
          <td>Row {{ item.data }} Column 2</td>
          <td>Row {{ item.data }} Column 3</td>
        </Draggable>
      </Container>
    </table>
  </div>
</template>

<style lang="css" scoped>
table {
  display: table;

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
  text-align: center;
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
