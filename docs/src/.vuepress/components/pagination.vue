<script>
import { Container, Draggable } from 'vue-dndrop'

export default {
  name: 'Pagination',
  components: {
    Container,
    Draggable
  },
  data() {
    return {
      cards: [
        { id: 1, title: 'Card 1' },
        { id: 2, title: 'Card 2' }
      ],

      cards2: [
        { id: 201, title: 'Card 1' },
        { id: 202, title: 'Card 2' }
      ]
    }
  },
  methods: {
    getChildPayload(index) {
      return this.cards[index]
    },

    onDrop(dropResult) {
      const { removedIndex, addedIndex } = dropResult

      if (removedIndex !== null && addedIndex !== null) {
        const itemToAdd = this.cards[removedIndex]
        const newCards = [...this.cards]
        newCards.splice(removedIndex, 1)
        newCards.splice(addedIndex, 0, itemToAdd)
        this.cards = newCards
      }
    },

    getChildPayload2(index) {
      return this.cards2[index]
    },

    onDrop2(dropResult) {
      const { removedIndex, addedIndex } = dropResult

      if (removedIndex !== null && addedIndex !== null) {
        const itemToAdd = this.cards2[removedIndex]
        const newCards = [...this.cards2]
        newCards.splice(removedIndex, 1)
        newCards.splice(addedIndex, 0, itemToAdd)
        this.cards2 = newCards
      }
    },

    addCard() {
      const newId = this.cards.length + 1
      this.cards.push({
        id: newId,
        title: `Card ${newId}`
      })
    },

    addCard2() {
      const newId = this.cards2.length + 201
      this.cards2.push({
        id: newId,
        title: `Card ${newId - 200}`
      })
    }
  }
}
</script>
<template>
  <div>
    <h3>Example 1: With Auto-refresh</h3>
    <p>This container has <code>:should-refresh="true"</code> which automatically refreshes drag animations for dynamically added items (pagination, infinite scroll, etc.).</p>

    <Container
      :should-refresh="true"
      :animation-duration="300"
      @drop="onDrop"
      :get-child-payload="getChildPayload"
    >
      <Draggable v-for="card in cards" :key="card.id">
        <div class="draggable-item" :style="{ borderLeft: card.id <= 2 ? '5px solid #28a745' : '5px solid #007bff' }">
          {{ card.title }}
        </div>
      </Draggable>
    </Container>

    <button @click="addCard" style="margin: 10px 0; padding: 8px 12px;">
      Add Card
    </button>

    <hr style="margin: 40px 0;">

    <h3>Example 2: Without Auto-refresh</h3>
    <p>This container has NO <code>should-refresh</code> prop - dynamically added items won't have proper drag animations until manually refreshed.</p>

    <Container
      :animation-duration="300"
      @drop="onDrop2"
      :get-child-payload="getChildPayload2"
    >
      <Draggable v-for="card in cards2" :key="card.id">
        <div class="draggable-item" :style="{ borderLeft: card.id <= 202 ? '5px solid #28a745' : '5px solid #dc3545' }">
          {{ card.title }}
        </div>
      </Draggable>
    </Container>

    <button @click="addCard2" style="margin: 10px 0; padding: 8px 12px;">
      Add Card
    </button>
  </div>
</template>
