import { defineStore } from "pinia";
import requestService from "../services/ApiRequestService";

export const usersDataStore = defineStore({
  id: "users",
  state: () => ({
    users: [],
    user: null,
    notes: [],
    id: null,
    note: null,
  }),
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getNotes: (state) => state.notes,
    getId: (state) => state.id,
    getNote: (state) => state.note,
  },
  actions: {
    async getUsersList() {
      const response = await requestService.get("users");
      this.users = response?.data;
    },

    async getUserNotes(id) {
      const response = await requestService.get("users/" + id + "/notes");
      this.notes = response?.data;
      this.id = id;
    },

    async createNote(data) {
      const response = await requestService.post(
        "users/" + this.id + "/notes",
        data
      );
      this.notes.unshift(response?.data);
    },

    async updateNote(data) {
      const response = await requestService.put(
        "users/" + this.id + "/notes/" + this.note,
        data
      );
      const item = response?.data;
      let key = Object.keys(this.notes).find(
        (key) => this.notes[key].id === item.id
      );
      if (key) this.notes[key] = item;
    },

    async deleteNote() {
      await requestService.delete("users/" + this.id + "/notes/" + this.note);
      let key = Object.keys(this.notes).find(
        (key) => this.notes[key].id === this.note
      );
      if (key) this.notes.splice(key, 1);
    },

    setActiveUser(id) {
      this.user = id;
    },

    setNoteId(id) {
      this.note = id;
    },
  },
});
