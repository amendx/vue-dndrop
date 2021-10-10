<script>
export default {
  name: "ShrTab",
  props: {
    headerAlign: {
      type: String,
      required: false,
      default: "left",
      validator(value) {
        return ["center", "left"].includes(value);
      },
    },
    defaultTab: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      tabs: [],
    };
  },
  created() {
    this.tabs = this.$children;
  },
  mounted() {
    if (this.defaultTab) this.selectTab({ name: this.defaultTab });

    const slider = this.$refs.refTabs;
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.offsetLeft;
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();

      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;

      slider.scrollLeft = scrollLeft - walk;
    });
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        const tabMatch = tab.name === selectedTab.name;
        tab.isActive = tabMatch;
        if (tabMatch) this.$emit("change-tab", tab.name);
      });
    },
  },
};
</script>

<template>
  <div :class="`shr-tab --${headerAlign}`">
    <div class="shr-tab__header">
      <div ref="refTabs" class="shr-tab__header__list">
        <div
          v-for="tab in tabs"
          :key="tab.name"
          class="shr-tab__header__list__item"
          :class="{ 'is-active': tab.isActive }"
        >
          <div
            class="shr-tab__header__list__item__clickable"
            @click="selectTab(tab)"
          >
            {{ tab.name }}
            <div class="shr-tab__header__list__item__clickable__bar" />
          </div>
        </div>
      </div>
      <div class="shr-tab__header__line-bar" />
    </div>
    <div class="shr-tab__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.shr-tab {
  width: 100%;
}
.shr-tab__header {
  position: relative;
}
.shr-tab__header__line-bar {
  position: absolute;
  right: 0;
  bottom: 3px;
  left: 0;
  z-index: 1;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.shr-tab__header__list {
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  align-items: center;
  padding: 4px 0;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  list-style: none;
  user-select: none;
  scrollbar-width: none;
}
.shr-tab__header__list::-webkit-scrollbar {
  display: none;
}
.shr-tab__header__list__item__clickable {
  position: relative;
  display: flex;
  justify-content: center;
  min-width: calc(10% - 50px);
  padding: 6px 24px;
  font-weight: 700;
  color: #597ba0aa;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  background-color: initial;
  border: 1px solid transparent;
}
.shr-tab__header__list__item__clickable__bar {
  position: absolute;
  bottom: -4px;
  width: 100%;
  min-width: calc(10% - 50px);
  min-height: 5px;
  content: "";
  background-color: transparent;
  border-radius: 15px;
}
.shr-tab__header__list__item__clickable:hover {
  color: #263c53aa;
}
.shr-tab__header__list__item.is-active .shr-tab__header__list__item__clickable {
  color: #597ba0aa;
  letter-spacing: 0;
}
.shr-tab__header__list__item.is-active
  .shr-tab__header__list__item__clickable__bar {
  z-index: 2;
  background-color: #597ba0aa;
}
.shr-tab__content {
  display: flex;
  width: 100%;
}
.--center .shr-tab__header__list {
  justify-content: center;
}
.--left .shr-tab__header__list {
  justify-content: flex-start;
}
.--right .shr-tab__header__list {
  justify-content: flex-end;
}
</style>
