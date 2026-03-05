export type Era = {
  id: string;
  name: string;
  year: number;
  description: string;
  cover_image: string;
  theme_color: string;
  accent_color: string;
  songs: string[];
  album?: string;
};

export const eras: Era[] = [
  {
    id: "black-mamba",
    name: "Black Mamba",
    year: 2020,
    description:
      "The debut that shook the industry. aespa entered the world with a concept unlike any other — SM's first metaverse-centered girl group. Black Mamba introduced ae-Karina alongside Karina herself, setting the tone for a dual existence that would define the group's identity.",
    cover_image: "https://picsum.photos/seed/blackmamba/1200/800",
    theme_color: "#1a0a2e",
    accent_color: "#9b59b6",
    songs: ["Black Mamba", "I'll Make You Cry", "Illusion"],
    album: "Black Mamba",
  },
  {
    id: "next-level",
    name: "Next Level",
    year: 2021,
    description:
      "A sonic leap into the future. Sampling the Fast & Furious soundtrack and transforming it into something wholly their own, Next Level became one of the most-streamed K-pop songs of 2021. Karina's stage presence reached new heights.",
    cover_image: "https://picsum.photos/seed/nextlevel/1200/800",
    theme_color: "#0a1628",
    accent_color: "#1A5FD2",
    songs: ["Next Level", "Forever", "Lucid Dream", "Aenergy"],
    album: "Savage",
  },
  {
    id: "savage",
    name: "Savage",
    year: 2021,
    description:
      "aespa's first mini-album arrived with full force. Savage redefined what K-pop could sound like — hyperpop influences, glitched production, and Karina at the center of it all, commanding every frame with ice-cold precision.",
    cover_image: "https://picsum.photos/seed/savage2021/1200/800",
    theme_color: "#050a0f",
    accent_color: "#C9D3E6",
    songs: ["Savage", "YEPPI YEPPI", "Iconic", "Deja Vu", "Taste"],
    album: "Savage",
  },
  {
    id: "spicy",
    name: "Spicy",
    year: 2023,
    description:
      "Confidence weaponized. Spicy marked a new chapter — warmer tones, sharper choreography, and an undeniable magnetism from Karina that pulled every eye in the room. The era showed growth without losing edge.",
    cover_image: "https://picsum.photos/seed/spicy2023/1200/800",
    theme_color: "#1a0500",
    accent_color: "#ff6b35",
    songs: ["Spicy", "Salty & Sweet", "Better Things", "My World"],
    album: "MY WORLD",
  },
  {
    id: "armageddon",
    name: "Armageddon",
    year: 2024,
    description:
      "The culmination of the aespa universe. Armageddon was cinematic in scope — a full narrative arc rendered in sound and image. Karina embodied the epicness of the concept, carrying the weight of the era with poise.",
    cover_image: "https://picsum.photos/seed/armageddon2024/1200/800",
    theme_color: "#0F3F8C",
    accent_color: "#6FAEFF",
    songs: ["Armageddon", "Whiplash", "Hot Mess", "Supernova"],
    album: "Armageddon",
  },
];
