<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Characters</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
      v-model="loveMyNotes"
      type="text"
      class="input"
      placeholder="Do you love myNotes App??"
      maxlength="50"
      v-autofocus
    />
  </div>
</template>

<script setup>
// imports
import { ref } from "vue";
import { useStoreNotes } from "../stores/storeNotes";
import { vAutofocus } from "../directives/vAutofocus";
import { useWatchCharacters } from "../use/useWatchCharacters";

// store

const storeNotes = useStoreNotes();

// love my notes

const loveMyNotes = ref("");
useWatchCharacters(loveMyNotes, 50);
</script>
