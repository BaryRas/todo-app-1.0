<template>
  <b-container class="home">
    <h3 :class="[this.$store.state.darkMode ? 'dark' : '']">
      Welcome to your favorite Todo-App
    </h3>
    <add-todos />
    <tabs-app :todos="AllItems"></tabs-app>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters } from "vuex";
import AddTodos from "@/components/AddTodos.vue";
import Tabs from "@/components/Tabs.vue";

export default {
  name: "Home",
  components: {
    "add-todos": AddTodos,
    "tabs-app": Tabs,
  },
  data() {
    return {
      hash: this.$route.params.id,
    };
  },
  computed: {
    ...mapState(["todos"]),
    ...mapGetters(["AllItems"]),
  },
  watch: {
    $route(to, from) {
      this.id = to.params.id; // go to this params id (change my component)
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/_variables.scss";

h3 {
  margin: 40px 0;
}
.dark {
  color: $--onSurface-dark;
}
</style>
