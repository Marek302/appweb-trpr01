<script setup lang="ts">
import { ref } from "vue";
import { duplicateAlbum, deleteAlbum, buyAlbum } from "../repository/AlbumsRepository";
import type { Album, Style } from "../scripts/types";

const props = defineProps<{
  album: Album;
}>();

const MODIFY_BUTTON = "modifier";
const SAVE_BUTTON = "sauvegarder";

const isFlipped = ref(false);
const modifyButtonText = ref("Modifier");
const isModifyingElements = ref<boolean>(false);
const isDropdownOpen = ref(false);

const emit = defineEmits(["albumUpdate"]);

const albumName = ref();
const imageUrl = ref();
const artist = ref();
const style = ref(props.album?.style);
const price = ref<number>();
const stock = ref<number>();

function modifyAlbumElements() {
  if (isModifyingElements) {
    isModifyingElements.value = !isModifyingElements.value;
    modifyButtonText.value = isModifyingElements.value ? SAVE_BUTTON : MODIFY_BUTTON;

    emit("albumUpdate",  {
      id: props.album?.id,
      name: albumName.value || props.album?.name,
      imageUrl: imageUrl.value || props.album?.imageUrl,
      artist: artist.value || props.album?.artist,
      style: style.value || props.album?.style,
      price: price.value || props.album?.price,
      stock: stock.value || props.album.stock
    });
  }
}

function flipCard() {
  if (event && !(event.target as HTMLElement).closest('.dropdown')) { 
    isFlipped.value = !isFlipped.value;
  }
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function selectDropdownItem(item: Style) {
  style.value = item
  isDropdownOpen.value = false;
}

function duplicateCard(){
  duplicateAlbum(props.album);
}

function deleteCard(){
  deleteAlbum(props.album.id);
}

function buyItem(){
  buyAlbum(props.album.id)
}
</script>

<template>
  <div class="card-container" @click="flipCard">
    <div class="card-inner" :class="{ flipped: isFlipped }">
      <div class="card-face front">
        <img class="card-img-top img-fluid mb-4" :src="props.album?.imageUrl" alt="No album Cover to show">
        <div class="card-body">
          <h5 class="card-title text-light text-center">{{ props.album?.name }}</h5>
        </div>
        <div class="container-fluid">
          <div class="row d-flex justify-content-between align-items-end">
            <div class="col-auto">
              <p style="font-size: 1.3rem;" class="text-light mb-0 p-0 mt-auto">{{ props.album.price }}$</p>
            </div>
            <div class="col-auto">
              <div class="row">
                <p style="font-size: 0.9rem; color: black;" class="mb-0 text-center">Stock: {{ props.album.stock }}</p>
              </div>
              <div class="row">
                <button type="button" class="btn btn-success" @click.stop="buyItem">Acheter</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-face back">
        <div class="card-body text-light text-center">

          <button type="button" class="position-absolute top-0 start-0 p-3 duplicateButton"
           style="background-color: transparent; border: none;" @click.stop="deleteCard">
            <i class="bi bi-trash"></i>
          </button>

          <h3 class="mb-4">Détails</h3>

          <button type="button" class="position-absolute top-0 end-0 p-3 duplicateButton"
           style="background-color: transparent; border: none;" @click.stop="duplicateCard">
            <i class="bi bi-copy"></i>
          </button>

          <div class="text-start" v-if="!isModifyingElements">
            <p style="font-size: 1.3rem;">Album: {{ props.album?.name }}</p>
            <p style="font-size: 1.3rem;">Artiste: {{ props.album?.artist }}</p>
            <p style="font-size: 1.3rem;">Style: {{ props.album?.style }}</p>
            <p style="font-size: 1.3rem;">Prix: ${{ props.album?.price }}</p>
          </div>
          <div v-if="isModifyingElements">
            <div class="row">
              <div class="col-auto" style="width: 110px;">
                <p style="font-size: 1.3rem;" class="text-start">Album:</p>
              </div>
              <div class="col text-start">
                <input type="text" class="form-control text-start bg-dark text-light" id="albumName" placeholder="Nom de l'album" @click.stop v-model="albumName">
              </div>
            </div>
            <div class="row">
              <div class="col-auto" style="width: 110px;">
                <p style="font-size: 1.3rem;" class="text-start">Artiste:</p>
              </div>
              <div class="col text-start">
                <input type="text" class="form-control text-start bg-dark text-light" id="artistName" placeholder="Nom de l'artiste" @click.stop v-model="artist">
              </div>
            </div>
            <div class="row">
              <div class="col-auto" style="width: 110px;">
                <p style="font-size: 1.3rem;" class="text-start">Image(Url):</p>
              </div>
              <div class="col text-start">
                <input type="text" class="form-control text-start bg-dark text-light" id="imageUrl" placeholder="Url de l'image" @click.stop v-model="imageUrl">
              </div>
            </div>
            <div class="row">
              <div class="col-auto" style="width: 110px;">
                <p style="font-size: 1.3rem;" class="text-start">Style:</p>
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
                  <p style="font-size: 1.3rem;" class="text-start">prix:</p>
                </div>
                <div class="col text-start">
                  <input type="text" class="form-control text-start bg-dark text-light" id="artistName" placeholder="Prix de l'album" @click.stop v-model="price">
                </div>
              </div>
              <div class="row">
                <div class="col-auto" style="width: 110px;">
                  <p style="font-size: 1.3rem;" class="text-start">Stock:</p>
                </div>
                <div class="col text-start">
                  <input type="text" class="form-control text-start bg-dark text-light" id="stock" placeholder="albums en stock" @click.stop v-model="stock">
                </div>
              </div>
          </div>
          <div class="text-center">
            <button type="button" class="btn btn-info btn-lg" style="height: 45px; width: 180px;" @click.stop="modifyAlbumElements">{{modifyButtonText}}</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
.card-container {
  width: 18rem;
  height: 25rem;
  perspective: 1000px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.card-container:hover {
  transform: rotateY(10deg) rotateX(8deg);
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
}

.flipped {
  transform: rotateY(180deg);
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1d1a21;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
}

.card-img-top {
  max-height: 60%;
  margin: 10px;
  object-fit: contain;
}

.back {
  transform: rotateY(180deg);
}

.duplicateButton:hover {
  transform: scale(1.2);
}
</style>
