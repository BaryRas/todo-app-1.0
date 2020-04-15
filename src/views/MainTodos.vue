<template>
  <b-container class="home">
    <!-- Add form group -->
    <div v-if="changedShow">
      <add-todos />
    </div>

    <!-- Title -->
    <div class="title" :class="[this.$store.state.darkMode ? 'black' : '']">
      <h3>{{ filterCat.toUpperCase() }}</h3>
      <h4>{{ title }}</h4>
    </div>

    <!-- Search field -->
    <b-input-group
      prepend="Search your Todo"
      class="mt-4"
      :class="[this.$store.state.darkMode ? 'black' : '']"
    >
      <b-form-input
        class=" form-control shadow-none"
        placeholder="..."
        type="text"
        v-model="search"
        @input="onChange"
      ></b-form-input>
    </b-input-group>

    <!-- Tabs Todos Items -->
    <tabs-app v-show="!isOpen" :todos="filterTodos(title)"></tabs-app>
    <tabs-app v-show="isOpen" :todos="results"></tabs-app>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import AddTodos from "@/components/AddTodos.vue";
import TodoItem from "@/components/TodoItem.vue";
import Tabs from "@/components/Tabs.vue";

export default {
  name: "Home",
  data() {
    return {
      todos: this.$store.state.todos,
      title: this.$route.params.id,
      filterCat: this.$route.params.categorie,
      search: "",
      results: [],
      isOpen: false,
    };
  },
  components: {
    "add-todos": AddTodos,
    "todo-item": TodoItem,
    "tabs-app": Tabs,
  },
  computed: {
    ...mapState(["show"]),
    changedShow() {
      return this.show;
    },
  },
  methods: {
    filterTodos(categorie) {
      const data = this.todos.filter((todo) => {
        return todo.categorie === this.filterCat;
      });
      const filter = data[0].items.filter((item) => {
        return item.item === categorie;
      });
      const filterItems = filter[0].descriptions;
      return filterItems;
    },
    onChange() {
      this.isOpen = true;
      this.filterResults();
    },
    filterResults() {
      this.results = this.filterTodos(this.title).filter(
        (item) =>
          item.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
  },
  watch: {
    $route(to, from) {
      this.title = to.params.id; // go to this params id (change my component)
      this.filterCat = to.params.categorie;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/_variables.scss";

.title {
  margin: 30px 0;
  color: #5a6268;
  padding: 20px 0;
  background-color: #f8f9fa;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
input,
.input-group-text {
  border-radius: 0;
}

.black {
  background-color: $--surface-dark !important;
  color: $--onSurface-dark !important;

  .input-group-text {
    background-color: $--primary !important;
    color: $--onBackground-dark !important;
    // border-color: $--primary;
  }
}
</style>
