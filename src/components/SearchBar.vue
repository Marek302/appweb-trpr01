<script setup lang="ts">
import { ref } from "vue";
import { watch } from "vue";
import { searchAlbum } from "../repository/AlbumsRepository";

const search = ref('');

watch(search, (newValue) => {
    searchAlbum(newValue)
});

</script>

<template>
    <div class="d-flex justify-content-center align-items-center">
        <input type="text" class="form-control rounded-xxl mt-4 mb-3 text-light" placeholder="Recherchez un artiste ou un album"
         style="width: 50%; height:50px; border-radius: 30px; border-color: #00b2ff;background-color: #11002c;"
         v-model="search"/>
    </div>
</template>
<style scoped>
input::placeholder {
    color: lightgray;
}
</style>