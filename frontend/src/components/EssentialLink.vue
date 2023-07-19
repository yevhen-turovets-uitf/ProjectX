<template>
  <li>
    <router-link
      :to="`/${id}`"
      :class="$route.params.id == id ? 'active' : ''"
      @click="loadNotes()"
    >
      <div class="chats__avatar">
        <img :src="image" />
      </div>
      <div class="chats__des">
        <div class="chats__name" v-text="name"></div>
        <div class="chats__date">{{ formatDate(date_of_birth) }}</div>
      </div>
    </router-link>
  </li>
</template>

<script>
import { defineComponent } from "vue";
import { usersDataStore } from "stores/users";

const usersStore = usersDataStore();

export default defineComponent({
  name: "EssentialLink",
  props: {
    name: {
      type: String,
      required: true,
    },

    date_of_birth: {
      type: String,
      default: "",
    },

    id: {
      type: String,
      default: "#",
    },

    image: {
      type: String,
      default: "../img/avatar.jpg",
    },
  },

  methods: {
    formatDate(dateString) {
      const dateObject = new Date(dateString);
      const year = dateObject.getUTCFullYear();
      const month = dateObject.getUTCMonth() + 1;
      const day = dateObject.getUTCDate();

      return `${day.toString().padStart(2, "0")}.${month
        .toString()
        .padStart(2, "0")}.${year}`;
    },
    loadNotes() {
      usersStore.getUserNotes(this.id);
    },
  },
});
</script>
