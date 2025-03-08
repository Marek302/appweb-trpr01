<script setup lang="ts">
import { exportAlbumsAsCSV } from "../repository/AlbumsRepository";

function downloadList(){
    exportAlbumsAsCSV()
}
</script>
<template>
    <button type="button" class="btn btn-primary btn-lg" @click="downloadList">Télécharger</button>
</template>