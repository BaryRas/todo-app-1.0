import Vue from "vue";
import Vuex from "vuex";
import todos from "@/data/Todos";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos,
    show: false,
    darkMode: false,
  },
  getters: {
    CompletedItems: (state) => {
      let allItems = [];
      state.todos.map((todo) => {
        todo.items.map((item) => {
          item.descriptions.map((n) => {
            return allItems.push(n);
          });
        });
      });
      const data = allItems.filter((arr) => {
        return arr.completed === true;
      });
      return data;
    },
    DangerItems: (state) => {
      let allItems = [];
      state.todos.map((todo) => {
        todo.items.map((item) => {
          item.descriptions.map((n) => {
            return allItems.push(n);
          });
        });
      });
      const data = allItems.filter((arr) => {
        return arr.priority === "danger";
      });
      console.log(data);
      return data;
    },
    WarningItems: (state) => {
      let allItems = [];
      state.todos.map((todo) => {
        todo.items.map((item) => {
          item.descriptions.map((n) => {
            return allItems.push(n);
          });
        });
      });
      const data = allItems.filter((arr) => {
        return arr.priority === "warning";
      });
      return data;
    },
    AllItems: (state) => {
      const allItems = [];
      state.todos.map((todo) => {
        todo.items.map((item) => {
          item.descriptions.map((n) => {
            return allItems.push(n);
          });
        });
      });
      return allItems;
    },
  },
  mutations: {
    IF_SHOW: (state, payload) => {
      if (payload === "show") {
        state.show = !state.show;
      } else {
        state.darkMode = !state.darkMode;
      }
    },
    DELETE_TODO: (state, payload) => {
      state.todos.forEach((el) => {
        el.items.forEach((element) => {
          element.descriptions = element.descriptions.filter(
            (res) => res.id !== payload
          );
        });
      });
    },
    ADD_ITEM: (state, { cat, it, add }) => {
      const categorie = state.todos.filter((todo) => todo.categorie === cat);
      const items = categorie[0].items.filter((cat) => cat.item === it);
      items[0].descriptions.push(add);
    },

    ADD_GLOBAL_ITEM: (state, { project, categorie, item, iP, iC }) => {
      if (state.todos.length >= iP) {
        if (state.todos[iP].items.length >= iC && iC !== null) {
          state.todos[iP].items[iC].descriptions.push(item);
        } else {
          state.todos[iP].items.push(categorie);
        }
      } else {
        state.todos.push(project);
      }
    },

    CHANGE_PRIORITY: (state, { id, priority }) => {
      let data = [];
      state.todos.forEach((el) => {
        el.items.forEach((item) => {
          item.descriptions.map((n) => {
            if (n.id === id) {
              return data.push(n);
            }
          });
        });
      });

      data[0].priority = priority;
    },

    CHANGE_COMPLETED: (state, id) => {
      let data = [];
      state.todos.forEach((el) => {
        el.items.forEach((item) => {
          item.descriptions.map((n) => {
            if (n.id === id) {
              return n.completed !== n.completed;
            }
          });
        });
      });

      // data[0].completed !== data[0].completed;
    },
  },
  // actions: {
  //   deleteTodo({ commit }, payload) {
  //     commit("DELETE_TODO", payload);
  //   },
  //   addItem({ commit }, payload) {
  //     commit("ADD_ITEM", payload);
  //   },
  //   handlePriority({ commit }, payload) {
  //     commit("CHANGE_PRIORITY", payload);
  //   },
  //   handleCompleted({ commit }, payload) {
  //     commit("CHANGE_COMPLETED", payload);
  //   }
  // },
  modules: {},
});
