<template>
  <div>
    <b-list-group v-for="(item, index) in items" :key="index">
      <router-link
        :to="{
          name: 'MainTodos',
          params: { id: item.item, categorie: cat },
        }"
        :cat="cat"
      >
        <b-list-group-item
          button
          class="d-flex justify-content-between align-items-center"
          :class="darkModeItems"
        >
          <div class="d-flex align-items-center">
            <b-icon
              icon="inboxes-fill"
              scale="1.7"
              variant=""
              class="mr-3"
              :class="darkModeIcons"
            ></b-icon>
            <span>{{ item.item }}</span>
          </div>
          <b-badge :variant="darkModeBadge" pill>{{
            item.descriptions.length
          }}</b-badge>
        </b-list-group-item>
      </router-link>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from "vuex"; //

export default {
  props: {
    items: Array,
    cat: String,
  },
  data() {
    return {};
  },
  computed: {
    darkModeItems() {
      if (this.$store.state.darkMode) {
        return "black";
      }
      return "";
    },
    darkModeIcons() {
      if (this.$store.state.darkMode) {
        return "icon-light";
      }
      return "secondary";
    },
    darkModeBadge() {
      if (this.$store.state.darkMode) {
        return "primary";
      }
      return "secondary";
    },
  },
};
</script>

<style lang="scss" scoped>
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
// span.badge-primary {
//   background-color: $--secondary;
// }
</style>
