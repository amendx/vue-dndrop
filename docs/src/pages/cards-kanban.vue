<script>
import { applyDrag, scene, lorem } from '../utils/helpers'
import Kanban from '../components/kanban.vue'

export default {
  name: 'Cards',

  components: { Kanban },
  computed: {
    notMobile() {
      return window.innerWidth >= 1025
    },
  },
  data() {
    return {
      item: {},
      columns: [
        {
          name: 'Backlog',
          id: 0,
          status: ['open'],
          columnItems: [],
          validation: (src, payload, index, origins) =>
            this.columnValidation(src, payload, index, (origins = [''])),
        },
        {
          name: 'Executing',
          id: 1,
          status: ['executing', 'review', 'paralised'],
          columnItems: [],
          validation: (src, payload, index, origins) =>
            this.columnValidation(
              src,
              payload,
              index,
              (origins = ['open', 'paralised'])
            ),
        },
        {
          name: 'Finished',
          id: 2,
          status: ['finished', 'closed'],
          columnItems: [],
          validation: (src, payload, index, origins) =>
            this.columnValidation(
              src,
              payload,
              index,
              (origins = ['executing', 'review'])
            ),
        },
      ],
      showDropdown: {},
      opcoesDropdownMenu: [
        { type: 'customAction' },
        { type: 'separator', color: 'yellow' },
        { type: 'customAction' },
      ],
      scene,
      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true,
      },
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true,
      },
    }
  },
  mounted() {
    this.cardsKanban(0, 3, 'open', ['executing', 'paralised'])
    this.cardsKanban(1, 2, 'executing', ['paralised', 'review'])
    this.cardsKanban(2, 0, 'finished', ['closed', 'finished'])
  },

  methods: {
    iconType(status) {
      switch (status) {
        case 'finished':
          return '🚀'
        case 'executing':
          return '🔥'
        default:
          return '🤠'
      }
    },
    cardsKanban(colunaId, items, currentStatus, statusList) {
      const current = this.columns.find((item) => item.id === colunaId)
      const random = Math.floor(Math.random() * 99)
      for (let index = 0; index <= items; index++) {
        current.columnItems.push({
          id: random + index + 1,
          task: lorem.slice(0, Math.floor(Math.random() * 50) + 10),
          date: `11/2${index}/2020`,
          status: statusList,
          currentStatus,
          icon: this.iconType(currentStatus),
          dropdownId: index,
          corStatus: {
            nome: currentStatus,
            corTexto: `#2${index}1ba8`,
            cor: `#2${index}3ced`,
          },
        })
      }
    },
    selectStatus(item) {
      this.showDropdown = {
        id: item.id,
      }
    },
    columnChange({ item, column }) {
      setTimeout(() => {
        this.columns.reduce((total, el) => {
          const items = el.columnItems.map((i) => i.id)
          if (items.includes(item.id)) {
            const newStatus = el.columnItems.find((i) => i.id === item.id)
            if (Array.isArray(column) && column.length) {
              console.log(column)
              newStatus.icon = this.iconType(column[0])
              return (newStatus.currentStatus = column[0])
            }
            newStatus.currentStatus = column
            newStatus.icon = this.iconType(column)
            const ab = el.columnItems.findIndex((i) => i.id === newStatus.id)
            const colunaDestino = this.columns.findIndex((col) =>
              col.status.includes(newStatus.currentStatus)
            )
            el.columnItems.splice(ab, 1)
            this.columns[colunaDestino].columnItems.push(newStatus)
            return newStatus
          } else return this.columns
        }, 0)
      })
    },
    columnValidation(src, payload, index, possibleOrigins) {
      return possibleOrigins.includes(payload.currentStatus)
    },

    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.scene)
      scene.children = applyDrag(scene.children, dropResult)
      this.scene = scene
    },

    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene)
        const column = scene.children.filter((p) => p.id === columnId)[0]
        const columnIndex = scene.children.indexOf(column)

        const newColumn = Object.assign({}, column)
        newColumn.children = applyDrag(newColumn.children, dropResult)
        scene.children.splice(columnIndex, 1, newColumn)

        this.scene = scene
      }
    },

    getCardPayload(columnId) {
      return (index) => {
        return this.scene.children.filter((p) => p.id === columnId)[0].children[
          index
        ]
      }
    },

    dragStart() {
      console.log('drag started')
    },

    log(...params) {
      console.log(...params)
    },
  },
}
</script>

<template>
  <div class="kanban-cards">
    <Kanban
      :columns.sync="columns"
      col-min-width="100"
      col-max-width="300"
      count-text="items here"
      drop-text="Change to this status"
      @item-dropped="columnChange"
    >
      <template v-slot:card="{ item }">
        <div :class="['item', `${item.currentStatus}`]">
          <div class="kanban-card">
            <span class="card">
              <div class="kanban-action">
                <label
                  ><strong>#{{ item.id }}</strong></label
                >
                <button :class="['kanban-button', `${item.currentStatus}`]">
                  <span v-if="notMobile">{{
                    item.currentStatus || item.corStatus.nome
                  }}</span>
                  {{ item.icon }}
                </button>
              </div>

              <label class="label"> {{ item.task }}</label>
              <small> Due date: {{ item.date }} </small>
            </span>
          </div>
        </div>
      </template>
    </Kanban>
  </div>
</template>
