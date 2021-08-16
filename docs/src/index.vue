<script>
import pages from "./config/navigation";

export default {
  name: "Demo",
  data: function() {
    return {
      pages,
      isNavOpen: true
    };
  },
  methods: {
    toggleNav: function() {
      this.isNavOpen = !this.isNavOpen;
    },
    openCode() {
      const name = this.$router.currentRoute.name;
      const url = `https://github.com/amendx/vue-dndrop/tree/master/docs/src/pages/${name}.vue`;
      window.open(url, "_blank");
    },
    eeeee(e){
      console.log(e)
    }
  },

  computed: {
    openClass() {
      return this.isNavOpen ? "open" : "closed";
    }
  }
};
</script>

<template>
    <div class="app">
      <div class="nav-button" :class="openClass" @click="toggleNav()">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="nav" :class="openClass">
        <div class="nav-content">
          <div class="nav-header">
            <h3 class="nav-name">vue-dndrop</h3>
          </div>
          <div>
            <div
              v-for="section in pages"
              :key="section.title"
              class="menu-section"
            >
              <h4 class="menu-title">{{ section.title }}</h4>
              <ul>
                <router-link
                  v-for="page in section.pages"
                  :key="page.title"
                  tag="li"
                  :to="page.name"
                  >
                  <label>{{ page.title }}</label>
                </router-link>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="header" :class="openClass">
          {{ $router.currentRoute.meta.title }}
          <div class="source-code" @click="openCode()">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZml0PSIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIGZvY3VzYWJsZT0iZmFsc2UiPgogICAgPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgyNHYyNEgwVjB6Ij48L3BhdGg+CiAgICA8cGF0aCBkPSJNOS40IDE2LjZMNC44IDEybDQuNi00LjZMOCA2bC02IDYgNiA2IDEuNC0xLjR6bTUuMiAwbDQuNi00LjYtNC42LTQuNkwxNiA2bDYgNi02IDYtMS40LTEuNHoiIGZpbGw9IiNGRkYiPjwvcGF0aD4KPC9zdmc+Cg=="
              alt=""
            />
            <span>source</span>
          </div>
        </div>
        <div class="docs">
          <router-view></router-view>
        </div>

      <div class="footer">
        
      </div>
      </div>

    </div>
</template>
