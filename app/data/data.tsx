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
  directorofphotography: string;
  producer: string;
}

export interface CardProps {
  itemsData: DataProp[];
  onThumbnailClick: (item: DataProp) => void;
}

const ItemsData = [
  {
    id: 1,
    title: "Title 1 ID 1",
    brand: "Opel",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    director: "x",
    producer: "Ismael Lutefi",
    production: "Onyx",
    directorofphotography: "Leroy Farrel",
    cinematographer: "z",
    editor: "e",
    date: "2023-11-18T08:30:00Z",
    playbackId: "1Rwc00QAWVZrEN6vYHSakQ02SObWCFFCGuKOZ4HCT9jnk",
    videoTitle: "Super Interesting Video 1",
    img: "marcell-rubies-cKGtI-S5EPY-unsplash.webp",
  },
  {
    id: 2,
    title: "Cube",
    brand: "Opel",
    director: "x",
    producer: "Ismael Lutefi",
    production: "SunnySkies",
    directorofphotography: "Leroy Farrel",
    cinematographer: "z",
    editor: "e",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    date: "2023-10-25T14:45:00Z",
    playbackId: "1Rwc00QAWVZrEN6vYHSakQ02SObWCFFCGuKOZ4HCT9jnk",
    videoTitle: "Super Interesting Video 2",
    img: "marcell-rubies-cKGtI-S5EPY-unsplash.webp",
  },
  {
    id: 3,
    title: "Be Like Water",
    brand: "Land Rover",
    director: "x",
    producer: "Ismael Lutefi",
    production: "Beef182",
    directorofphotography: "Leroy Farrel",
    cinematographer: "z",
    editor: "e",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    date: "2023-10-25T14:45:00Z",
    playbackId: "1Rwc00QAWVZrEN6vYHSakQ02SObWCFFCGuKOZ4HCT9jnk",
    videoTitle: "Super Interesting Video 2",
    img: "marcell-rubies-cKGtI-S5EPY-unsplash.webp",
  },
  {
    id: 4,
    title: "Lost & Found",
    brand: "Land Rover",
    director: "x",
    production: "Circa9",
    producer: "Ismael Lutefi",
    directorofphotography: "Leroy Farrel",
    cinematographer: "z",
    editor: "e",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    date: "2023-10-25T14:45:00Z",
    playbackId: "1Rwc00QAWVZrEN6vYHSakQ02SObWCFFCGuKOZ4HCT9jnk",
    videoTitle: "Super Interesting Video 2",
    img: "marcell-rubies-cKGtI-S5EPY-unsplash.webp",
  },
  {
    id: 5,
    title: "Hooray",
    brand: "Hooray",
    director: "x",
    producer: "Ismael Lutefi",
    production: "Hooray Productions",
    directorofphotography: "Leroy Farrel",
    cinematographer: "z",
    editor: "e",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    date: "2023-10-25T14:45:00Z",
    playbackId: "1Rwc00QAWVZrEN6vYHSakQ02SObWCFFCGuKOZ4HCT9jnk",
    videoTitle: "Super Interesting Video 2",
    img: "marcell-rubies-cKGtI-S5EPY-unsplash.webp",
  },
];
export default ItemsData;
