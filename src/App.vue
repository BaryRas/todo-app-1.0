<template>
  <div id="app" :class="[this.$store.state.darkMode ? greyDark : '']">
    <header-app />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <side-bar></side-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Sidebar from "@/views/Sidebar.vue";

export default {
  components: {
    "header-app": Header,
    "side-bar": Sidebar,
  },
  data() {
    return {
      greyDark: "dark",
    };
  },
};
</script>

<style lang="scss">
@import "@/scss/_variables.scss";
html,
body {
  min-height: 100vh !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f1f3f7;
}

// Sidebar static
.static-list-group {
  margin-top: 20px;

  &-item {
    margin-bottom: 10px;
  }
}

// Sidebar dynamic (bottom list)

// .black {
//   background-color: #333 !important;
//   color: whitesmoke !important;

//   .router-link-active {
//     color: whitesmoke;
//   }
// }

.dark {
  background-color: $--background-dark !important;
}
</style>
