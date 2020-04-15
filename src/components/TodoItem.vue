<template>
  <div class="list-items">
    <b-list-group v-for="todo in todos" :key="todo.id">
      <b-card no-body class="mb-1" :bg-variant="darkMode">
        <b-card-header
          header-tag="header"
          class="p-1 d-flex justify-content-between align-items-center"
          role="tab"
        >
          <div class="d-flex align-items-center justify-content-between">
            <b-dropdown size="sm" class="mr-2" :variant="darkMode">
              <template v-slot:button-content>
                <b-icon
                  icon="circle-fill"
                  :variant="todo.priority"
                  class="mr-2"
                ></b-icon>
              </template>
              <b-dropdown-item
                @click.prevent="priorityHandler(todo.id, 'danger')"
                >Important</b-dropdown-item
              >
              <b-dropdown-item
                @click.prevent="priorityHandler(todo.id, 'warning')"
                >Warning</b-dropdown-item
              >
              <b-dropdown-item
                @click.prevent="priorityHandler(todo.id, 'success')"
                >Low</b-dropdown-item
              >
            </b-dropdown>

            <!-- Switch Checkbox -->
            <b-form-checkbox
              v-model="todo.completed"
              @change="CHANGE_COMPLETED(todo.id)"
              switch
            ></b-form-checkbox>
          </div>
          <span :class="[todo.completed ? 'complete' : '']">{{
            todo.title
          }}</span>

          <!-- Delete Button -->
          <b-button
            class="trash-hover"
            size="sm"
            :variant="darkMode"
            @click.prevent="DELETE_TODO(todo.id)"
            :id="`button-${todo.id}`"
          >
            <b-icon icon="trash" scale="2"></b-icon>
          </b-button>
        </b-card-header>
      </b-card>
    </b-list-group>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import "@/scss/_variables.scss";

export default {
  props: {
    todos: Array,
  },
  data() {
    return {
      priority: "",
      options: [
        { text: "Low", value: "success" },
        { text: "Medium", value: "warning" },
        { text: "Danger", value: "danger" },
      ],
    };
  },
  methods: {
    ...mapMutations(["CHANGE_COMPLETED", "DELETE_TODO", "CHANGE_PRIORITY"]),
    priorityHandler(id, priority) {
      const payload = {
        id,
        priority,
      };
      this.CHANGE_PRIORITY(payload);
    },
  },
  computed: {
    darkMode() {
      if (this.$store.state.darkMode) {
        return "dark";
      }
      return "light";
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/_variables.scss";

.list-items {
  margin: 50px 0;

  // .list-group {
  //   .card {
  //     background-color: #121212;
  //   }
  // }
}
h3 {
  margin-bottom: 50px;
}
.trash-hover:hover {
  font-size: 80%;
}
input[type="radio"] input[value="true"] {
  text-decoration: underline;
}
.complete {
  text-decoration: line-through;
}

.card.bg-dark {
  color: $--onBackground-dark;
}
</style>
