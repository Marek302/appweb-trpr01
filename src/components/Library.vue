<script setup lang="ts">
    import type { Album } from '../scripts/types';
    import Card from "./Card.vue";
    import { filteredAlbums, updateAlbum } from "../repository/AlbumsRepository";

    function updateCard(update: Album){
        updateAlbum(update.id, update)
    }

</script>
<template>
    <div class="d-flex justify-content-center mt-4">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 d-flex justify-content-around" style="max-width: fit-content; width: 100%; justify-content: center; flex-wrap: wrap;">
            <div v-for="album in filteredAlbums" :key="album.id" class="col-auto d-flex justify-content-center lign-items-center">
                <div>
                    <Card :album="album" @album-update="updateCard"/>
                </div>
            </div>
        </div>
    </div>
</template>