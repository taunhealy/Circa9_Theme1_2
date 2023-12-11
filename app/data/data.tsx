export interface DataProp {
  id: number;
  title: string;
  brand: string;
  img: string;
  desc: string;
  director: string;
  production: string;
  cinematographer: string;
  editor: string;
  date: string;
  playbackId: string;
  videoTitle: string; // Add the videoTitle property here
}

export interface CardProps {
  itemsData: DataProp[];
}

const ItemsData = [
  {
    id: 1,
    title: "Title 1 ID 1",
    brand: "Opel",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    director: "x",
    production: "Circa9",
    cinematographer: "z",
    editor: "e",
    date: "2023-11-18T08:30:00Z",
    playbackId: "c2TJN49C38GO47tF7rgQA6XTs18AwUl7JbEe00wu2Vuk",
    videoTitle: "Super Interesting Video 1",
    img: "",
  },
  {
    id: 2,
    title: "Cube",
    brand: "Opel",
    director: "z",
    production: "Cube Productions",
    cinematographer: "z",
    editor: "e",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    date: "2023-10-25T14:45:00Z",
    playbackId: "01qdIiHGB5imOPPAAMCO5X5b2iD3pb2d6BaiVgS1dpB4",
    videoTitle: "Super Interesting Video 2",
    img: "",
  },
  {
    id: 3,
    title: "Be Like Water",
    brand: "Land Rover",
    director: "z",
    production: "Solo Dev",
    cinematographer: "z",
    editor: "e",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    date: "2023-10-25T14:45:00Z",
    playbackId: "yiKLBPJabwv8LvHtr5fud9vJuo01jyyjWuUGMNTF7adw",
    videoTitle: "Super Interesting Video 2",
    img: "",
  },
  {
    id: 4,
    title: "Lost & Found",
    brand: "Land Rover",
    director: "z",
    production: "Solo Devotion",
    cinematographer: "z",
    editor: "e",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    date: "2023-10-25T14:45:00Z",
    playbackId: "q1jhiBg0000kYsoIHzYilyx9TZcmHeSuw02JiVouekarbI",
    videoTitle: "Super Interesting Video 2",
    img: "",
  },
];
export default ItemsData;
