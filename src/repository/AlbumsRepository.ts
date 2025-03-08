import { ref } from "vue";
import type { Album } from "../scripts/types";

var id = 0;
var lastSearch = ''

export const filteredAlbums = ref<Album[]>()
export const albums = ref<Album[]>([
    {
        id: assignId(),
        name: "To Pimp A Butterfly",
        imageUrl: "https://i.scdn.co/image/ab67616d00001e02cdb645498cd3d8a2db4d05e1",
        artist: "Kendrick Lamar",
        style: "Hip-Hop",
        price: 20.00,
        stock: 3
    },
    {
        id: assignId(),
        name: "The Dark Side Of The Moon",
        imageUrl: "https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe",
        artist: "Pink Floyd",
        style: "Rock",
        price: 20.00,
        stock: 5
    },
    {
        id: assignId(),
        name: "My Beautifull Dark Twisted Fantasy",
        imageUrl: "https://i.scdn.co/image/ab67616d00001e02d9194aa18fa4c9362b47464f",
        artist: "Kanye West",
        style: "Hip-Hop",
        price: 20.00,
        stock: 7
    },
    {
        id: assignId(),
        name: "Awaken, My Love!",
        imageUrl: "https://i.scdn.co/image/ab67616d00001e021c29562d6e8c1f55bb1311d5",
        artist: "Childish Gambino",
        style: "R&B",
        price: 20.00,
        stock: 2
    }
]);

export function duplicateAlbum(album: Album){
    addAlbum(album)
    refresh()
}

export function addAlbum(album: Album) {
    album.id = assignId();
    albums.value.push(album);
    console.log(album.name)
    refresh()
}

export function getAlbums() {
    return albums.value;
}

export function updateAlbum(id: number, updatedAlbum: Album){
    var album = getAlbumById(id)
    if (album) {
        album.name = updatedAlbum.name
        album.artist = updatedAlbum.artist
        album.imageUrl = updatedAlbum.imageUrl
        album.price = updatedAlbum.price
        album.style = updatedAlbum.style
      } else {
        console.log("Album not found");
      }
    refresh()
}

export function deleteAlbum(id: number){
    var index = albums.value.findIndex(album => album.id === id);
    albums.value.splice(index, 1);
    refresh()
}

export function searchAlbum(input: string){
    lastSearch = input
    filteredAlbums.value = albums.value.filter(album => 
        album.name.toLowerCase().includes(input.toLowerCase()) ||
        album.artist.toLowerCase().includes(input.toLowerCase())
    );
    console.log(input)
}

export function buyAlbum(id: number){
    var album = getAlbumById(id)
    if(album && album.stock > 0){
        album.stock--
        if(album.stock == 0){
            alert("il ne reste plus de copies de " + album.name + " en stock")
        }
    }
    refresh()
}

function assignId(): number{
    id++;
    return id
}

function getAlbumById(id: number): Album | undefined {
    return albums.value.find(album => album.id === id);
}

function refresh(){
    searchAlbum(lastSearch)
}

export function exportAlbumsAsCSV() { //une grande partie de cette fonction a été faite avec chatgpt
    if (albums.value.length === 0) return;

    const headers = ["ID", "Name", "Artist", "Style", "Price", "Stock", "Image URL"];
    
    const rows = albums.value.map(album =>
        [album.id, album.name, album.artist, album.style, album.price, album.stock, album.imageUrl].join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "albums.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}


refresh()