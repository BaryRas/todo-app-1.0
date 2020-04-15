<template>
  <b-container fluid>
    <b-row>
      <!-- SIDEBAR SECTION -->
      <b-col
        lg="3"
        :class="[this.$store.state.darkMode ? 'sidebar-black' : 'sidebar']"
      >
        <list-group />

        <!-- Project -->
        <h5>Projects</h5>

        <!-- Accordion -->
        <div role="tablist" class="tablist">
          <b-card
            no-body
            class="mb-1"
            v-for="(todo, index) in todos"
            :key="index"
          >
            <b-card-header header-tag="header" class="p-1 " role="tab">
              <b-button
                block
                href="#"
                class="d-flex align-items-center"
                v-b-toggle="'accordion-' + index"
                :class="darkMode"
              >
                <b-icon :icon="todo.icon" scale="2" font-scale="0.75"></b-icon>
                <span>{{ todo.categorie }}</span>
              </b-button>
            </b-card-header>
            <b-collapse
              :id="`accordion-${index}`"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <list-group-custom :items="todo.items" :cat="todo.categorie" />
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
        <b-button
          block
          id="button-add"
          @click.prevent="handleSubmit"
          variant="primary"
          class="d-flex justify-content-center align-items-center"
          :class="[this.$store.state.darkMode ? 'btn-black' : '']"
        >
          <b-icon icon="plus" scale="2" font-scale="0.75"></b-icon>
          <span class="ml-2">Add Task</span>
          <b-tooltip
            target="button-add"
            title="Add Item inside categorie selected"
            placement="bottom"
            variant="secondary"
          ></b-tooltip>
        </b-button>
      </b-col>

      <!-- MAIN TODOS -->
      <b-col lg="9"><router-view /></b-col>
    </b-row>
  </b-container>
</template>

<script>
import ListGroup from "@/components/ListGroup.vue";
import ListGroupCustom from "@/components/ListGroupCustom.vue";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      variant: "",
    };
  },
  components: {
    "list-group": ListGroup,
    "list-group-custom": ListGroupCustom,
  },
  computed: {
    ...mapState(["todos"]),
    darkMode() {
      if (this.$store.state.darkMode) {
        return "btn-info";
      }
      return "btn-light";
    },
  },
  methods: {
    ...mapMutations(["IF_SHOW"]),
    handleSubmit() {
      this.IF_SHOW("show");
      console.log(this.$store.state.show);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.sidebar {
  @media only screen and (min-width: 992px) {
    border-right: 1px solid $--primary;
    min-height: 100vh;
  }

  h5 {
    border-bottom: 1px solid $--primary;
    margin: 50px 0 20px 0;
  }

  .card-body {
    padding: 0.25rem;
    background-color: #f1f3f7;
  }

  &-black {
    @media only screen and (min-width: 992px) {
      border-right: 1px solid #333;
      min-height: 100vh;
    }
    .card {
      background-color: $--surface-dark;
    }
    h5 {
      color: whitesmoke;
      margin: 50px 0 20px 0;
      border-bottom: 1px solid $--onBackground-dark;
    }

    .card-body {
      padding: 0.25rem;
      background-color: #343a40 !important;
    }
  }
}

.btn-secondary {
  // background-color: $--secondary;
  color: $--onSurface-dark;
}
span {
  margin-left: 20px;
}
.btn {
  border: none;
  border-radius: 0;
}

.note {
  font-size: 8px;
  margin-left: 10px !important;
}

.tablist {
  margin-bottom: 40px;
}
</style>
