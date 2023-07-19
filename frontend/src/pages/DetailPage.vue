<template>
  <div class="dasboard">
    <div class="dasboard__top" v-if="activeUser">
      <div class="dasboard__avatar">
        <img :src="activeUser.image" width="110" height="110" />
      </div>
      <div class="dasboard__des">
        <div class="dasboard__name" v-text="activeUser.name"></div>
        <div class="dasboard__info">
          <div class="dasboard__info__item">
            <img src="../img/svg/user.svg" width="20px" height="20px" />
            {{ activeSex }}
          </div>
          <div class="dasboard__info__item">
            <img src="../img/svg/calendar.svg" width="20px" height="20px" />
            {{ formatDate }}
            <span> ({{ fullDate }}) </span>
          </div>
        </div>
      </div>
    </div>
    <div class="dasboard__body">
      <div class="notes" v-if="notes">
        <div class="notes__item">
          <div class="notes__top">
            Notes
            <button type="button" class="btn" @click="openModal(true)">
              Add
            </button>
          </div>
          <div class="notes__list">
            <UserNotes
              v-for="note in notes"
              :key="note.id"
              v-bind="note"
              @openEditModal="openModal(true, note.id)"
              @openDeleteModal="openModal(false, note.id)"
              @closeEditModal="closeModal(true)"
              @closeDeleteModal="closeModal(false)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="modal" :class="textModal ? 'active' : ''">
      <form class="modal__wrap">
        <div class="modal__top">
          {{ editModal ? "Edit note" : "Add new note" }}
          <button type="button" class="modal__close" @click="closeModal(true)">
            <img src="../img/svg/Close.svg" width="24px" height="24px" />
          </button>
        </div>
        <div class="modal__body">
          <div class="modal__row">
            <div class="modal__label">
              Subject
              <span>*</span>
            </div>
            <input type="text" class="input" v-model="title" />
          </div>
          <div class="modal__row">
            <div class="modal__label">
              Note
              <span>*</span>
            </div>
            <textarea class="textarea" v-model="text"></textarea>
          </div>
        </div>
        <div class="modal__bot">
          <button type="button" class="btn" @click="closeModal(true)">
            Cancel
          </button>
          <button
            v-if="editModal"
            type="button"
            class="btn btn-blue"
            @click="editNote"
          >
            Save
          </button>
          <button v-else type="button" class="btn btn-blue" @click="addNote">
            Add note
          </button>
        </div>
      </form>
    </div>

    <div class="modal" :class="deleteModal ? 'active' : ''">
      <div class="modal__wrap">
        <div class="modal__text">
          <div class="modal__text__title">Delete note</div>
          <div class="modal__text__content">
            Are you sure you want to delete your note?
          </div>
        </div>
        <div class="modal__bot">
          <button type="button" class="btn" @click="closeModal(false)">
            Cancel
          </button>
          <button type="button" class="btn btn-blue" @click="deleteNote()">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { usersDataStore } from "stores/users";
import UserNotes from "components/UserNotes.vue";
import "../js/functions/burger";

const usersStore = usersDataStore();

export default defineComponent({
  name: "DetailPage",

  components: {
    UserNotes,
  },

  data() {
    return {
      textModal: false,
      deleteModal: false,
      title: null,
      text: null,
      editModal: false,
    };
  },

  computed: {
    users() {
      return usersStore.getUsers;
    },
    user() {
      return usersStore.getUser;
    },
    notes() {
      return usersStore.getNotes;
    },
    activeUser() {
      let key = Object.keys(this.users).find(
        (key) => this.users[key].id == this.$route.params.id
      );

      return key ? this.users[key] : {};
    },

    formatDate() {
      const dateObject = new Date(this.activeUser.date_of_birth);
      const day = dateObject.getUTCDate();
      const month = dateObject.getUTCMonth() + 1;
      const year = dateObject.getUTCFullYear();

      return `${day.toString().padStart(2, "0")}/${month
        .toString()
        .padStart(2, "0")}/${year}`;
    },

    fullDate() {
      const dateObject = new Date(this.activeUser.date_of_birth);
      const currentDate = new Date();
      const timeDifference = currentDate.getTime() - dateObject.getTime();
      const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;

      return Math.floor(timeDifference / millisecondsInYear);
    },

    activeSex() {
      switch (this.activeUser.sex) {
        case 1:
          return "Male";
        case 2:
          return "Female";
        default:
          return "";
      }
    },
  },

  methods: {
    openModal(type, edit = false) {
      if (type) {
        this.textModal = true;
        if (edit) {
          let note = this.activeNote(edit);
          this.editModal = true;
          this.title = note.title;
          this.text = note.text;
          usersStore.setNoteId(edit);
        } else {
          this.editModal = false;
          this.title = null;
          this.text = null;
        }
      } else {
        if (edit) {
          usersStore.setNoteId(edit);
        }
        this.deleteModal = true;
      }
    },

    closeModal(type) {
      if (type) {
        this.textModal = false;
      } else {
        this.deleteModal = false;
      }
    },
    addNote() {
      usersStore.createNote({
        id: this.user,
        title: this.title,
        text: this.text,
      });
      this.closeModal(true);
      this.loadNotes();
    },
    editNote() {
      usersStore.updateNote({
        id: this.$route.params.id,
        title: this.title,
        text: this.text,
      });
      this.closeModal(true);
      this.loadNotes();
    },
    deleteNote() {
      usersStore.deleteNote(this.id);
      this.closeModal(false);
      this.loadNotes();
    },
    loadNotes() {
      usersStore.getUserNotes(this.$route.params.id);
    },
    activeNote(id) {
      let key = Object.keys(this.notes).find((key) => this.notes[key].id == id);

      return key ? this.notes[key] : {};
    },
  },

  mounted() {
    if (!Object.keys(usersStore.getUsers).length) {
      usersStore.getUsersList();
    }
    this.loadNotes();

    if (this.user === null) {
      usersStore.setActiveUser(this.$route.params.id);
    }
  },
});
</script>
