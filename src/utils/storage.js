const defaultDiamondItems = [
  {
    id: 1,
    name: "Mobile Legends",
    diamonds: [
      { id: 1, amount: 86, price: 20000 },
      { id: 2, amount: 172, price: 39000 },
      { id: 3, amount: 257, price: 58000 },
    ],
    image: "/mlbb.jpg",
  },
  {
    id: 2,
    name: "Free Fire",
    diamonds: [
      { id: 1, amount: 100, price: 15000 },
      { id: 2, amount: 200, price: 29000 },
      { id: 3, amount: 500, price: 70000 },
    ],
    image: "/ff.jpg",
  },
  {
    id: 3,
    name: "PUBG Mobile",
    diamonds: [
      { id: 1, amount: 60, price: 25000 },
      { id: 2, amount: 180, price: 70000 },
      { id: 3, amount: 600, price: 200000 },
    ],
    image: "/pubg.jpg",
  },
  {
    id: 4,
    name: "Call of Duty",
    diamonds: [
      { id: 1, amount: 80, price: 30000 },
      { id: 2, amount: 240, price: 85000 },
      { id: 3, amount: 800, price: 250000 },
    ],
    image: "/cod.jpg",
  },
  {
    id: 5,
    name: "Genshin Impact",
    diamonds: [
      { id: 1, amount: 90, price: 50000 },
      { id: 2, amount: 270, price: 140000 },
      { id: 3, amount: 900, price: 450000 },
    ],
    image: "/genshin.jpg",
  },
  {
    id: 6,
    name: "Clash of Clans",
    diamonds: [
      { id: 1, amount: 50, price: 10000 },
      { id: 2, amount: 150, price: 25000 },
      { id: 3, amount: 500, price: 80000 },
    ],
    image: "/coc.jpg",
  },
  {
    id: 7,
    name: "Arena of Valor",
    diamonds: [
      { id: 1, amount: 70, price: 20000 },
      { id: 2, amount: 210, price: 60000 },
      { id: 3, amount: 700, price: 180000 },
    ],
    image: "/aov.jpg",
  },
  {
    id: 8,
    name: "League of Legends: Wild Rift",
    diamonds: [
      { id: 1, amount: 120, price: 40000 },
      { id: 2, amount: 360, price: 110000 },
      { id: 3, amount: 1200, price: 350000 },
    ],
    image: "/wildrift.jpg",
  },
  {
    id: 9,
    name: "Fortnite",
    diamonds: [
      { id: 1, amount: 100, price: 30000 },
      { id: 2, amount: 300, price: 90000 },
      { id: 3, amount: 1000, price: 300000 },
    ],
    image: "/fortnite.jpg",
  },
  {
    id: 10,
    name: "Roblox",
    diamonds: [
      { id: 1, amount: 50, price: 5000 },
      { id: 2, amount: 150, price: 14000 },
      { id: 3, amount: 500, price: 45000 },
    ],
    image: "/roblox.jpg",
  }
]

export const loadDiamondItems = () => {
  const data = localStorage.getItem("diamondItems");
  return data ? JSON.parse(data) : defaultDiamondItems;
};

export const saveDiamondItems = (data) => {
  localStorage.setItem("diamondItems", JSON.stringify(data));
};
