import { defineStore } from "pinia";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { db } from "../js/firebase";
import { controlledRef } from "@vueuse/core";
import { useStoreAuth } from "../stores/storeAuth";

let notesCollectionRef;
let notesCollectionQuery;

let getNoteSnapshot = null;

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [],
      notesLoaded: false,
    };
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth();

      notesCollectionRef = collection(db, "users", storeAuth.user.id, "notes");
      notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
      this.getNotes();
    },
    async getNotes() {
      this.notesLoaded = false;

      getNoteSnapshot = onSnapshot(
        notesCollectionQuery,
        (querySnapshot) => {
          let notes = [];
          querySnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              content: doc.data().content,
              date: doc.data().date,
            };
            notes.push(note);
          });
          this.notes = notes;
          this.notesLoaded = true;
        },
        (error) => {
          console.log("error.message: ", error.message);
        }
      );
    },
    clearNotes() {
      this.notes = [];
      if (getNoteSnapshot) getNoteSnapshot();
    },
    async addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
        date = currentDate.toString();

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date,
      });
    },
    async deleteNote(noteId) {
      await deleteDoc(doc(notesCollectionRef, noteId));
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content,
      });
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter((note) => {
          return note.id === id;
        })[0].content;
      };
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharactersCount: (state) => {
      let count = 0;
      state.notes.forEach((note) => {
        count += note.content.length;
      });
      return count;
    },
  },
});
