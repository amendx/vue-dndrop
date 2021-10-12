<script>
export default {
  name: "TabPanel",
  props: {
    name: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      required: false,
    },
    noTransition: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  mounted() {
    this.isActive = this.selected;
  },
};
</script>
<template>
  <div
    v-if="isActive"
    :class="`tab-panel ${noTransition ? 'tab-panel--no-transition' : ''}`"
  >
    <slot />
  </div>
</template>

<style>
.tab-panel {
  width: 100%;
  animation: fadeEffect 0.8s;
}
.tab-panel--no-transition {
  animation: none;
}

@keyframes fadeEffect {
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
}
</style>
