<script>
export default {
  name: "ShrTabPanel",
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
    :class="
      `shr-tab-panel ${noTransition ? 'shr-tab-panel--no-transition' : ''}`
    "
  >
    <slot />
  </div>
</template>

<style>
.shr-tab-panel {
  width: 100%;
  animation: fadeEffect 0.8s;
}
.shr-tab-panel--no-transition {
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
