<script setup lang="ts">
    import type { Album } from '../scripts/types';
    import Card from "./Card.vue";
    import { filteredAlbums, albums } from "../repository/AlbumsRepository";

    function updateAlbum(update: Album){
        albums.value.forEach((album, index) => {
            if (album.id === update.id){
                albums.value[index] = update;
            }
        });
    }

</script>
<template>
    <div class="container-fluid mt-4 d-flex justify-content-center">
        <div class="row d-flex justify-content-center flex-wrap">
            <div v-for="album in filteredAlbums" :key="album.id" class="col-md-3 mb-4 ms-2 me-2">
                <div style="width: 18rem;">
                    <Card :album="album" @album-update="updateAlbum"/>
                </div>
            </div>
        </div>
    </div>
</template>