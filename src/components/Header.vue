<template>
  <b-navbar
    toggleable="md"
    :class="[this.$store.state.darkMode ? 'dark' : 'light']"
  >
    <b-navbar-brand>
      <router-link
        :to="{
          name: 'Home',
        }"
        class="nav-brand-custom"
      >
        Todo-App
      </router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto align-items-center">
        <b-nav-item right>
          <b-button
            size="sm"
            :class="[this.$store.state.darkMode ? 'dark' : '']"
          >
            <router-link
              :to="{
                name: 'Home',
              }"
              class="active-link-custom"
              ><b-icon icon="plus" scale="1.5"></b-icon> Add Task
            </router-link>
          </b-button>
        </b-nav-item>
        <b-nav-item right>
          <b-button
            size="sm"
            :class="[this.$store.state.darkMode ? 'dark' : '']"
            ><b-icon icon="inboxes-fill"></b-icon> {{ AllItems.length }}
          </b-button>
        </b-nav-item>
        <b-nav-item right>
          <b-button
            @click="switchDark"
            size="sm"
            :class="[this.$store.state.darkMode ? 'dark' : '']"
          >
            <b-icon icon="brightness-high"></b-icon>
            {{ this.$store.state.darkMode ? "Light Mode" : "Dark Mode" }}
          </b-button>
        </b-nav-item>

        <b-nav-item right>
          <b-button
            size="sm"
            :class="[this.$store.state.darkMode ? 'dark' : '']"
          >
            <b-icon icon="people"></b-icon> Log In
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["IF_SHOW"]),
    switchDark() {
      this.IF_SHOW("dark");
      console.log(this.$store.state.darkMode);
    },
  },
  computed: {
    ...mapGetters(["AllItems"]),
  },
};
</script>

<style lang="scss">
@import "@/scss/_variables.scss";

// Header
.light {
  background-color: $--primary;
}

nav.dark {
  background-color: $--surface-dark !important;
}
.router-link,
.active-link-custom,
.nav-brand-custom,
.nav-brand-custom-active {
  color: $--onPrimary !important;
  text-decoration: none;
}

.router-link,
.active-link-custom {
  &-active {
    color: $--secondary;
  }
}
.active-link-custom:hover,
.nav-brand-custom:hover {
  text-decoration: none;
}
</style>
