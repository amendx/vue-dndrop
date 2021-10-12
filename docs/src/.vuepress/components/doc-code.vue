<template>
  <div>
    <code-prism :lang="lang">
      <slot />
    </code-prism>
  </div>
</template>
<script>
import CodePrism from "./code-prism.js";

export default {
  name: "DocCode",
  components: {
    "code-prism": CodePrism,
  },
  props: {
    lang: {
      type: String,
      default: "js",
    },
  },
};
</script>
