<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer show-if-above bordered>
      <div class="chats">
        <ul class="chats__list">
          <EssentialLink v-for="link in users" :key="link.id" v-bind="link" />
        </ul>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { usersDataStore } from "stores/users";

const usersStore = usersDataStore();

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  computed: {
    users() {
      return usersStore.getUsers;
    },
  },

  mounted() {
    usersStore.getUsersList();
  },
});
</script>
