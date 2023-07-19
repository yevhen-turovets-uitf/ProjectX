<template>
  <div
    class="notes__list__item"
    :class="isMyNote ? 'notes__list__item--line' : ''"
  >
    <button
      type="button"
      class="notes__more"
      v-if="isMyNote"
      @click="toggleMenu"
    >
      <img class="author_img" src="../img/svg/more.svg" />
    </button>
    <div
      class="notes__list__menu"
      :class="openMenu ? 'active' : ''"
      v-if="isMyNote"
    >
      <ul>
        <li @click="toggleMenu">
          <button type="button" @click="$emit('openEditModal')">
            <img src="../img/svg/Edit.svg" width="24px" height="24px" />
            Edit
          </button>
        </li>
        <li @click="toggleMenu">
          <button type="button" @click="$emit('openDeleteModal')">
            <img src="../img/svg/Delete.svg" width="24px" height="24px" />
            Delete
          </button>
        </li>
      </ul>
    </div>

    <div class="notes__list__item__wrap">
      <div class="notes__title" v-text="title"></div>
      <div class="notes__text" v-text="text"></div>
      <div class="notes__bot" v-if="author">
        <div class="notes__author">
          <div class="notes__author__img">
            <img :src="author.image" />
          </div>
          <div class="notes__author__name" v-text="author.name"></div>
        </div>
        <div class="notes__item__date">
          {{ formatDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { usersDataStore } from "stores/users";

const usersStore = usersDataStore();

export default defineComponent({
  name: "UserNotes",
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "#",
    },
    updated_at: {
      type: String,
      default: "",
    },
    author_id: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      openMenu: false,
    };
  },

  computed: {
    author() {
      let key = Object.keys(usersStore.getUsers).find(
        (key) => usersStore.getUsers[key].id == this.author_id
      );

      return key ? usersStore.getUsers[key] : null;
    },

    formatDate() {
      const dateObject = new Date(this.updated_at);
      const day = dateObject.getUTCDate();
      const month = dateObject.getUTCMonth() + 1;
      const year = dateObject.getUTCFullYear();
      const hours = dateObject.getUTCHours();
      const minutes = dateObject.getUTCMinutes();

      let ampm = "am";
      let formattedHours = hours;
      if (hours >= 12) {
        ampm = "pm";
        formattedHours = hours === 12 ? 12 : hours - 12;
      }

      return `${month.toString().padStart(2, "0")}/${day
        .toString()
        .padStart(2, "0")}/${year}, ${formattedHours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    },

    isMyNote() {
      return parseInt(this.author_id) === parseInt(usersStore.getUser);
    },
  },

  methods: {
    toggleMenu() {
      this.openMenu = !this.openMenu;
    },
  },
});
</script>
