export type MediaItem = {
  id: string;
  title: string;
  type: "mv" | "performance" | "behind" | "interview";
  era_id: string;
  image_url: string;
  source?: string;
  year: number;
};

export type Photo = {
  id: string;
  title: string;
  category: "concept" | "stage" | "editorial" | "behind";
  image_url: string;
  date: string;
  era_id?: string;
  size: "large" | "medium" | "small" | "wide";
};

export const mediaItems: MediaItem[] = [
  {
    id: "bm-mv",
    title: "Black Mamba MV",
    type: "mv",
    era_id: "black-mamba",
    image_url: "https://picsum.photos/seed/bmmv/800/600",
    year: 2020,
  },
  {
    id: "nl-mv",
    title: "Next Level MV",
    type: "mv",
    era_id: "next-level",
    image_url: "https://picsum.photos/seed/nlmv/800/600",
    year: 2021,
  },
  {
    id: "savage-mv",
    title: "Savage MV",
    type: "mv",
    era_id: "savage",
    image_url: "https://picsum.photos/seed/savmv/800/600",
    year: 2021,
  },
  {
    id: "spicy-mv",
    title: "Spicy MV",
    type: "mv",
    era_id: "spicy",
    image_url: "https://picsum.photos/seed/spicymv/800/600",
    year: 2023,
  },
  {
    id: "arma-mv",
    title: "Armageddon MV",
    type: "mv",
    era_id: "armageddon",
    image_url: "https://picsum.photos/seed/armamv/800/600",
    year: 2024,
  },
];

export const photos: Photo[] = [
  {
    id: "p1",
    title: "Stage Presence",
    category: "stage",
    image_url: "https://picsum.photos/seed/kp1/800/1000",
    date: "2024-01-15",
    era_id: "armageddon",
    size: "large",
  },
  {
    id: "p2",
    title: "Concept Cut I",
    category: "concept",
    image_url: "https://picsum.photos/seed/kp2/600/800",
    date: "2023-05-10",
    era_id: "spicy",
    size: "medium",
  },
  {
    id: "p3",
    title: "Editorial",
    category: "editorial",
    image_url: "https://picsum.photos/seed/kp3/600/400",
    date: "2023-09-20",
    size: "small",
  },
  {
    id: "p4",
    title: "Stage Blue",
    category: "stage",
    image_url: "https://picsum.photos/seed/kp4/600/400",
    date: "2023-11-05",
    era_id: "spicy",
    size: "small",
  },
  {
    id: "p5",
    title: "Wide Editorial",
    category: "editorial",
    image_url: "https://picsum.photos/seed/kp5/1400/700",
    date: "2024-02-28",
    era_id: "armageddon",
    size: "wide",
  },
  {
    id: "p6",
    title: "Concept Cut II",
    category: "concept",
    image_url: "https://picsum.photos/seed/kp6/700/900",
    date: "2021-10-05",
    era_id: "savage",
    size: "medium",
  },
  {
    id: "p7",
    title: "Performance Shot",
    category: "stage",
    image_url: "https://picsum.photos/seed/kp7/800/1100",
    date: "2021-09-14",
    era_id: "savage",
    size: "large",
  },
  {
    id: "p8",
    title: "Backstage",
    category: "behind",
    image_url: "https://picsum.photos/seed/kp8/600/400",
    date: "2022-04-20",
    size: "small",
  },
  {
    id: "p9",
    title: "Cover Shoot",
    category: "editorial",
    image_url: "https://picsum.photos/seed/kp9/600/400",
    date: "2024-03-10",
    size: "small",
  },
  {
    id: "p10",
    title: "Stage Night",
    category: "stage",
    image_url: "https://picsum.photos/seed/kp10/1200/600",
    date: "2024-05-01",
    era_id: "armageddon",
    size: "wide",
  },
  {
    id: "p11",
    title: "Debut Concept",
    category: "concept",
    image_url: "https://picsum.photos/seed/kp11/700/900",
    date: "2020-11-17",
    era_id: "black-mamba",
    size: "medium",
  },
  {
    id: "p12",
    title: "Next Level Era",
    category: "stage",
    image_url: "https://picsum.photos/seed/kp12/800/1000",
    date: "2021-05-17",
    era_id: "next-level",
    size: "large",
  },
];
