<template>
  <b-card
    no-body
    class="tabulation"
    :class="[this.$store.state.darkMode ? 'black' : '']"
  >
    <b-tabs
      card
      v-model="classes"
      tab-class="font-weight-bold text-uppercase text-danger"
    >
      <!-- :active="classes === 0" tag for jumping link sidbar       :class="[this.$store.state.darkMode ? 'dark' : '']"-->
      <b-tab :active="classes === 0"
        ><template id="all" v-slot:title>
          <b-icon
            icon="inboxes-fill"
            scale="1.7"
            variant="secondary"
            class="mr-3"
          ></b-icon>
          All</template
        ><todo-item :todos="todos"
      /></b-tab>
      <b-tab :active="classes === 1"
        ><template id="important" v-slot:title>
          <b-icon
            icon="alarm-fill"
            scale="1.7"
            variant="secondary"
            class="mr-3"
          ></b-icon>
          Important</template
        ><todo-item :todos="filterPriority(todos, 'danger')"
      /></b-tab>
      <b-tab :active="classes === 2"
        ><template id="warning" v-slot:title>
          <b-icon
            icon="alert-triangle-fill"
            scale="1.7"
            variant="secondary"
            class="mr-3"
          ></b-icon>
          Warning</template
        ><todo-item :todos="filterPriority(todos, 'warning')"
      /></b-tab>
      <b-tab :active="classes === 3"
        ><template id="completed" v-slot:title>
          <b-icon
            icon="trash-fill"
            scale="1.7"
            variant="secondary"
            class="mr-3"
          ></b-icon>
          Completed</template
        ><todo-item :todos="filterCompleted(todos)"
      /></b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";

export default {
  props: {
    todos: Array,
  },
  data() {
    return {
      classes: this.$route.params.idx,
    };
  },
  components: {
    "todo-item": TodoItem,
  },
  methods: {
    filterCompleted(array) {
      const data = array.filter((arr) => {
        return arr.completed === true;
      });
      return data;
    },
    filterPriority(array, string) {
      const data = array.filter((arr) => {
        return arr.priority === string;
      });
      return data;
    },
  },
  watch: {
    $route(to, from) {
      this.classes = to.params.idx; // go to this params id (change my component)
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/_variables.scss";

.tabulation {
  margin: 50px 0;
  border-radius: 0;
}

.nav-tabs .nav-link.active {
  background-color: $--onSurface-dark !important;
  border-color: $--surface-dark !important;
  color: $--onBackground-dark !important;
}

.black {
  background-color: $--surface-dark !important;
}
</style>
