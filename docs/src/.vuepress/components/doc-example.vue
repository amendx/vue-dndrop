<template>
  <component v-if="renderOnly" :is="component" />
  <div v-else class="doc-card">
    <div class="doc-card-content">
      <tab-component>
        <tab-panel-component :selected="true" name="Example" no-transition>
          <div class="doc-card-preview">
            <component :is="component" />
          </div>
        </tab-panel-component>
        <tab-panel-component name="Source code" no-transition>
          <div class="doc-card-source">
            <tab-component>
              <tab-panel-component
                :name="tab"
                v-for="(tab, index) in tabs"
                :key="`tab-${tab}`"
                :selected="index === 0"
                no-transition
              >
                <doc-code lang="markup">{{ parts[tab] }}</doc-code>
              </tab-panel-component>
            </tab-component>
          </div>
        </tab-panel-component>
      </tab-component>
    </div>
  </div>
</template>
<script>
import DocCode from "./doc-code";

export default {
  name: "DocExample",
  components: {
    DocCode,
  },
  props: {
    title: String,
    file: String,
    renderOnly: Boolean,
  },
  data() {
    return {
      loading: true,
      component: null,
      tabs: [],
      currentView: "preview",
      currentTab: "template",
      expanded: false,
      parts: {},
    };
  },
  async mounted() {
    // await this.parseComponent(this.component);
    Promise.all([
      import(
        /* webpackChunkName: "demo" */
        /* webpackMode: "lazy-once" */
        "./" + this.file + ".vue"
      ).then((comp) => {
        this.component = comp.default;
      }),
      import(
        /* webpackChunkName: "demo-source" */
        /* webpackMode: "lazy-once" */
        "!raw-loader!/" + this.file + ".vue"
      ).then((comp) => {
        this.parseComponent(comp.default);
      }),
    ]).then(() => {
      this.loading = false;
    });
  },
  methods: {
    parseComponent(comp) {
      const template = this.parseTemplate("template", comp),
        script = this.parseTemplate("script", comp),
        style = this.parseTemplate("style", comp);
      this.parts = {
        template,
        script,
        style,
      };
      this.tabs = ["template", "script", "style"].filter(
        (type) => this.parts[type]
      );
    },
    parseTemplate(target, template) {
      const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`,
        regex = new RegExp(string, "g"),
        parsed = regex.exec(template) || [];
      return parsed[1] || "";
    },
  },
};
</script>

<style scoped>
.doc-card {
  margin-top: 1rem;
  border: 1px solid #597ba0aa;
  border-radius: 10px;
}
.doc-card-header__title {
  padding: 0.5em 1em;
  color: #616161;
  background: #597ba0aa;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.doc-card-header__title--alt {
  padding: 0 1em;
  font-weight: bold;
  color: #666;
  text-decoration: underline;
}
.doc-card-header__content {
  padding: 1em;
}
.doc-card-content {
  padding: 1rem;
}
.doc-card-preview,
.doc-card-source {
  margin-top: 1rem;
}
</style>
