<script setup lang="ts">
    import { ref } from "vue";
    import type { Album, Style } from '../scripts/types';
    import { addAlbum } from "../repository/AlbumsRepository";

    const isDropdownOpen = ref(false);
    const album = ref<Album>({
        id: 0, //valeur d'id par defaut
        name: "",
        artist: "",
        imageUrl: "",
        style: "undefined",
        price: 20,
        stock: 1
    });

    const emit = defineEmits(['add-album'])

    function toggleDropdown() {
        isDropdownOpen.value = !isDropdownOpen.value;
    }

    function selectDropdownItem(item: Style) {
        isDropdownOpen.value = false;
        album.value.style = item;
    }

    function addCard(){
        addAlbum(album.value);
        confirmAlbumAddition();
    }

    function confirmAlbumAddition(){
        emit('add-album', 'albumAdded')
    }

</script>
<template>
    <div class="card p-4" style="width: 22rem; height: 26rem; background-color: #1d1a21;">
        <div class="row">
            <div class="col-auto" style="width: 110px;">
                <p style="font-size: 1.3rem;" class="text-start text-light me-0">Album:</p>
            </div>
            <div class="col text-start">
                <input type="text" class="form-control text-start bg-dark text-light" id="albumName" placeholder="Nom de l'album" v-model="album.name">
            </div>
        </div>
        <div class="row">
            <div class="col-auto" style="width: 110px;">
                <p style="font-size: 1.3rem;" class="text-start text-light me-0">Artiste:</p>
            </div>
            <div class="col text-start">
                <input type="text" class="form-control text-start bg-dark text-light" id="artistName" placeholder="Nom de l'artist" v-model="album.artist">
            </div>
        </div>
        <div class="row">
            <div class="col-auto" style="width: 110px;">
                <p style="font-size: 1.3rem;" class="text-start text-light me-0">Image:</p>
            </div>
            <div class="col text-start">
                <textarea class="form-control bg-dark text-light" id="imageUrl" rows="3" v-model="album.imageUrl"></textarea>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-auto" style="width: 110px;">
                <p style="font-size: 1.3rem;" class="text-start text-light">Style:</p>
            </div>
            <div class="col text-start">
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" aria-haspopup="true" @click="toggleDropdown">
                    Style
                  </button>
                  <div class="dropdown-menu" :class="{ show: isDropdownOpen }" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#" @click="selectDropdownItem('Rock')">Rock</a>
                    <a class="dropdown-item" href="#" @click="selectDropdownItem('Pop')">Pop</a>
                    <a class="dropdown-item" href="#" @click="selectDropdownItem('R&B')">R&B</a>
                    <a class="dropdown-item" href="#" @click="selectDropdownItem('Hip-Hop')">Hip-Hop</a>
                    <a class="dropdown-item" href="#" @click="selectDropdownItem('Jazz')">Jazz</a>
                    <a class="dropdown-item" href="#" @click="selectDropdownItem('Country')">Country</a>
                    <a class="dropdown-item" href="#" @click="selectDropdownItem('Metal')">Metal</a>
                  </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-auto" style="width: 110px;">
                <p style="font-size: 1.3rem;" class="text-start text-light">prix:</p>
            </div>
            <div class="col text-start">
                <input v-model="album.price" type="text" class="form-control text-start bg-dark text-light" id="price" placeholder="Prix">
            </div>
        </div>
        <div class="row">
            <div class="col-auto" style="width: 110px;">
                <p style="font-size: 1.3rem;" class="text-start text-light">Stock:</p>
            </div>
            <div class="col text-start">
                <input v-model="album.stock" type="text" class="form-control text-start bg-dark text-light" id="stock" placeholder="Stock">
            </div>
        </div>
        <div class="text-center">
            <button type="button" class="btn btn-success btn-lg mt-3" style="height: 45px; width: 180px; background-color: #1fe700;" @click="addCard">Ajouter</button>
        </div>
    </div>
</template>