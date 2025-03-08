<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Library from "./components/Library.vue";
import AddCard from "./components/AddCard.vue";
import DownloadList from "./components/DownloadList.vue";
import SearchBar from "./components/SearchBar.vue";
import { ref } from "vue";

const isAddingAlbum = ref(false);

</script>

<template>
  <div>
    <div class="d-flex position-absolute top-0 end-0 p-3">
      <div class="container-fluid d-flex align-items-top">
        <div class="col me-5 overlay" v-if="isAddingAlbum">
          <AddCard @add-album="isAddingAlbum = !isAddingAlbum"/>
        </div>
        <div class="col">
          <button class="btn btn-primary rounded-circle text-light"
            style="width: 80px; height: 80px; font-size: 2rem; background-color: #00b2ff;"
            @click="isAddingAlbum = !isAddingAlbum">+</button>
        </div>
      </div>
    </div>
    <h1 class="text-light fs-1 fw-bold position-absolute display-1 top-0 start-0 p-3">Disc-O</h1>
    <h1 class="text-light display-1 fw-bold text-center mt-5">Catalogue</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <SearchBar/>
        </div>
        <div class="col-2 d-flex justify-content-start align-items-end pe-6">
          <DownloadList/>
        </div>
      </div>
    </div>
  </div>
  
  <div class="d-flex justify-content-center">
    <Library />
  </div>
</template>

<style>
  .overlay{
    z-index: 1000;
  }
  
  body{
    background-color: #240353;
  }
</style>
