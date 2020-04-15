<template>
  <b-list-group class="static-list-group">
    <!-- Item Box -->
    <router-link
      :to="{
        name: 'Home',
        params: { idx: 0 },
        hash: '#all',
      }"
      button
    >
      <b-list-group-item
        button
        :class="[this.$store.state.darkMode ? 'black' : '']"
        class="d-flex justify-content-between align-items-center static-list-group-item"
      >
        <div class="d-flex align-items-center">
          <b-icon
            icon="inboxes-fill"
            scale="1.7"
            :class="[this.$store.state.darkMode ? 'icon-light' : 'secondary']"
            class="mr-3"
          ></b-icon>
          <span>Inbox</span>
        </div>
        <b-badge :variant="darkModeBadge" pill>{{ AllItems.length }}</b-badge>
      </b-list-group-item>
    </router-link>

    <!-- Item Important -->
    <router-link
      :to="{
        name: 'Home',
        params: { idx: 1 },
        hash: '#important',
      }"
      button
    >
      <b-list-group-item
        button
        class="d-flex justify-content-between align-items-center static-list-group-item"
        :class="[this.$store.state.darkMode ? 'black' : '']"
      >
        <div class="d-flex align-items-center">
          <b-icon
            icon="alarm-fill"
            :class="[this.$store.state.darkMode ? 'icon-light' : 'secondary']"
            scale="1.7"
            class="mr-3"
          ></b-icon>
          <span>Important</span>
        </div>
        <b-badge :variant="darkModeBadge" pill>{{
          filterPriority(AllItems, "danger").length
        }}</b-badge>
      </b-list-group-item>
    </router-link>

    <!-- Item Warning -->
    <router-link
      :to="{
        name: 'Home',
        params: { idx: 2 },
        hash: '#warning',
      }"
      button
    >
      <b-list-group-item
        button
        class="d-flex justify-content-between align-items-center static-list-group-item"
        :class="[this.$store.state.darkMode ? 'black' : '']"
      >
        <div class="d-flex align-items-center">
          <b-icon
            icon="alert-triangle-fill"
            :class="[this.$store.state.darkMode ? 'icon-light' : 'secondary']"
            scale="1.7"
            class="mr-3"
          ></b-icon>
          <span>Warning</span>
        </div>
        <b-badge :variant="darkModeBadge" pill>{{
          filterPriority(AllItems, "warning").length
        }}</b-badge>
      </b-list-group-item>
    </router-link>

    <!-- Item Completed -->
    <router-link
      :to="{
        name: 'Home',
        params: { idx: 3 },
        hash: '#completed',
      }"
      button
    >
      <b-list-group-item
        button
        class="d-flex justify-content-between align-items-center static-list-group-item"
        :class="[this.$store.state.darkMode ? 'black' : '']"
      >
        <div class="d-flex align-items-center">
          <b-icon
            icon="trash-fill"
            scale="1.7"
            :class="[this.$store.state.darkMode ? 'icon-light' : 'secondary']"
            class="mr-3"
          ></b-icon>
          <span>Completed </span>
        </div>
        <b-badge :variant="darkModeBadge" pill>{{
          filterCompleted(AllItems).length
        }}</b-badge>
      </b-list-group-item>
    </router-link>
  </b-list-group>
</template>

<script>
import { mapGetters } from "vuex"; //

export default {
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
  computed: {
    ...mapGetters(["AllItems", "CompletedItems"]),
    darkModeBadge() {
      if (this.$store.state.darkMode) {
        return "primary";
      }
      return "secondary";
    },
  },
  watch: {
    $route(to, from) {
      this.id = to.params.id; // go to this params id (change my component)
    },
  },
};
</script>

//
<style lang="scss">
@import "@/scss/_variables.scss";

.list-group {
  // margin-top: 20px;
  a:hover {
    text-decoration: none;
  }
  &-item {
    margin-bottom: 5px;
    border: none;
    color: $--primary;

    span {
      margin-left: 20px;
      text-transform: uppercase;
    }
  }

  .black {
    background-color: $--surface-dark;
    color: $--onSurface-dark;
  }

  .black:hover {
    background-color: lighten($--surface-dark, 7.5%);
    color: lighten($--onSurface-dark, 7.5%);
  }

  .icon-light {
    color: $--onSurface-dark;
  }
}
</style>
