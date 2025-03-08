export type Style = "Rock" | "Pop" | "R&B" | "Hip-Hop" | "Jazz" | "Country" | "Metal" | "undefined";

export interface Album {
    id: number
    name: string;
    imageUrl: string;
    artist: string;
    style: Style;
    price: number;
    stock: number;
}