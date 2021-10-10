const { description } = require("../../package");

module.exports = {
  base: "/vue-dndrop/",

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "Documentation - vue-dndrop",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "https://github.com/amendx/vue-dndrop",
    editLinks: false,
    smoothScroll: true,
    docsDir: "docs",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "Guide",
        link: "/guide/",
      },
      {
        text: "Examples",
        link: "/examples/events",
      },
    ],
    sidebar: [
      {
        title: "Guide",
        path: "/guide/",
        collapsable: false,
        children: ["/guide/installation", "/guide/using-vue"],
      },

      {
        title: "API",
        path: "/api/",
        collapsable: false,
        children: [
          "/api/container",
          "/api/draggable",
          "/api/lifecycle",
          "/api/events",
          "/api/callbacks",
        ],
      },
      {
        title: "Examples",
        path: "/examples/",
        collapsable: false,
        children: [
          "/examples/events",
          "/examples/cards",
          "/examples/cards-kanban",
          "/examples/copy",
          "/examples/drag-class",
          "/examples/drag-handle",
          "/examples/form",
          "/examples/groups",
          "/examples/lock-axis",
          "/examples/nested",
          "/examples/simple",
          "/examples/simple-horizontal",
          "/examples/simple-scroller",
          "/examples/transition-duration",
          "/examples/table-drag",
        ],
      },
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
