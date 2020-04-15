<template>
  <div class="hello">
    <!-- New Form without warning -->
    <b-card :class="[this.$store.state.darkMode ? 'dark' : '']">
      <b-form @submit.prevent="submitNewTask">
        <b-form-group
          label-cols-lg="3"
          label="Add new project"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <!-- Select existing Project  -->
          <b-form-group
            label-align-sm="right"
            class="mb-3"
            description="Select existing project or enter a new one"
            label-for="new-project"
          >
            <b-input-group>
              <template v-slot:prepend>
                <b-dropdown text="Project" variant="outline-secondary">
                  <b-dropdown-item
                    @click.prevent="dropdownProject(todo.categorie, index)"
                    v-for="(todo, index) in todos"
                    :key="index"
                    >{{ todo.categorie }}
                  </b-dropdown-item>
                </b-dropdown>
              </template>
              <b-form-input
                placeholder="New project..."
                id="new-project"
                v-model="project"
                required
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <!-- Category Task -->
          <b-form-group
            label-align-sm="left"
            class="mb-3"
            label-for="sub-categorie"
            description="Select existing categories or enter a new one"
          >
            <b-input-group>
              <template v-slot:prepend>
                <b-dropdown text="Categorie" variant="outline-secondary">
                  <b-dropdown-item
                    v-for="(cat, i) in categorieList"
                    :key="i"
                    @click.prevent="dropdownCategorie(cat.item, i)"
                    >{{ cat.item }}
                  </b-dropdown-item>
                </b-dropdown>
              </template>
              <b-form-input
                placeholder="New categorie"
                id="sub-categorie"
                v-model="categorieInput"
                required
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <!-- Priority Task -->
          <b-form-group
            label-align-sm="right"
            class="mb-3"
            description="Enter task and select its priority"
          >
            <b-input-group>
              <template v-slot:prepend>
                <b-form-radio-group
                  id="btn-radios-1"
                  button-variant="outline-secondary"
                  v-model="priority"
                  :options="options"
                  buttons
                  name="radios-btn-default"
                ></b-form-radio-group>
              </template>
              <b-form-input
                placeholder="Enter task..."
                id="sub-categorie"
                v-model="task"
                required
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-form-group>
        <b-button type="submit" variant="primary">
          <b-icon icon="upload"></b-icon> Add
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "AddTodos",
  data() {
    return {
      todos: this.$store.state.todos,
      project: "",
      categorieList: [],
      categorieInput: "",
      iP: null,
      iC: null,
      it: "",
      task: "",
      priority: "",
      options: [
        { text: "Low", value: "success" },
        { text: "Warning", value: "warning" },
        { text: "Important", value: "danger" },
      ],
    };
  },
  methods: {
    // ...mapActions(["addItem"]),
    ...mapMutations(["ADD_GLOBAL_ITEM"]),

    // add New Task  { project, categorie, item, iP, iC } project == total object, categorie == object
    submitNewTask() {
      const project = {
        categorie: this.project,
        icon: "wrench",
        items: [
          {
            item: this.categorieInput,
            descriptions: [
              {
                title: this.task,
                priority: this.priority,
                id: uuidv4(),
                completed: false,
              },
            ],
          },
        ],
      };
      const categorie = {
        item: this.categorieInput,
        descriptions: [
          {
            title: this.task,
            priority: this.priority,
            id: uuidv4(),
            completed: false,
          },
        ],
      };

      const item = {
        title: this.task,
        priority: this.priority,
        id: uuidv4(),
        completed: false,
      };

      const iP = this.iP;
      const iC = this.iC;

      if (this.todos.length >= this.iP && this.iP !== null) {
        if (this.todos[this.iP].items.length >= this.iC && this.iC !== null) {
          this.ADD_GLOBAL_ITEM({ item, iP, iC });
        } else {
          this.ADD_GLOBAL_ITEM({ categorie, iP, iC });
        }
      } else {
        this.ADD_GLOBAL_ITEM({ project });
      }
      this.project = "";
      this.categorieInput = "";
      this.iP = null;
      this.iC = null;
      this.task = "";
      this.priority = "";
    },

    // Put Project dropdown value to input
    dropdownProject(value, i) {
      this.project = value;
      this.categorieList = this.todos[i].items;
      this.iP = i;
    },
    dropdownCategorie(value, i) {
      this.categorieInput = value;
      this.iC = i;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/scss/_variables.scss";

.hello {
  margin-top: 50px;
}

.dark {
  background-color: $--surface-dark !important;
  color: $--onSurface-dark !important;

  button {
    color: $--onPrimary-dark !important;
  }

  input.form-control {
    background-color: #e0d5d5 !important;
    border: none;
  }
}
.btn {
  border: none;
  color: $--onPrimary-dark;
}

nav-item > .nav-link {
  color: #333;
}
.card,
.btn,
.form-control,
.dropdown-toggle {
  border-radius: 0;
}

.input-group-append {
  background-color: #41b883;
  color: white;
}
</style>
