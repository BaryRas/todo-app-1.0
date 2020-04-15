<template>
  <div class="hello">
    <b-card bg-variant="light">
      <b-form-group
        label-cols-lg="3"
        :label="`Add Task to ${title}`"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
        <b-form-group
          label-cols-sm="3"
          label="Task :"
          label-align-sm="right"
          label-for="nested-country"
        >
          <b-form-input id="nested-country" v-model="item.title"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="Priority order :"
          label-align-sm="right"
          class="mb-0"
        >
          <b-form-radio-group
            class="pt-2"
            v-model="item.priority"
            :options="options"
          ></b-form-radio-group>
        </b-form-group>
      </b-form-group>

      <!-- Sbmit Button -->
      <b-button @click.prevent="handleAddItem" type="submit">
        <b-icon icon="upload"></b-icon> Add
      </b-button>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "AddTodos",
  props: {
    title: String,
    filterCat: String
  },
  data() {
    return {
      options: [
        { text: "Low", value: "success" },
        { text: "Warning", value: "warning" },
        { text: "Important", value: "danger" }
      ],
      cat: this.filterCat,
      it: this.title,
      item: {
        title: "",
        priority: ""
      }
    };
  },
  methods: {
    ...mapActions(["addItem"]),
    handleAddItem() {
      console.log(this.item);
      const payload = {
        cat: this.cat,
        it: this.it,
        add: {
          title: this.item.title,
          priority: this.item.priority,
          id: uuidv4(),
          completed: false
        }
      };
      this.addItem(payload);
      this.item.title = "";
      this.item.priority = "";
      this.item.id = uuidv4();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  margin-top: 50px;
}
.btn {
  border: none;
  border-radius: 0;
}

nav-item > .nav-link {
  color: #333;
}
.card,
.form-control {
  border-radius: 0;
}

.input-group-append {
  background-color: #41b883;
  color: white;
}
</style>
