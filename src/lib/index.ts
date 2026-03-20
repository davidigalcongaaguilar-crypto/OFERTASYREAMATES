export const ROUTE_PATHS = {
  HOME: "/",
};
// ─── Branding ─────────────────────────────────────────
export const BRAND = {
  NAME: "Ofertas & Remates",
  SLOGAN: "Electrodomésticos y más",
};

// ─── Contact Info ─────────────────────────────────────
export const CONTACT = {
  PHONE: "966020440",
  WHATSAPP_LINK: "https://wa.me/51966020440",
  ADDRESS: "Av. Ramón Castilla 203",
  CITY: "Ayacucho – Perú",
};

// ─── Types ────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: string;
  specs: string[];
  image: string;
}

export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

// ─── DATA ─────────────────────────────────────────────

// CATEGORÍAS
export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "televisores",
    name: "Televisores",
    description: "",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
  },
];

// SUBCATEGORÍAS
export const INITIAL_SUB_CATEGORIES: SubCategory[] = [
  {
    id: "televisores-nuevo",
    name: "NUEVO (caja sellada)",
    categoryId: "televisores",
    image:
      "https://a-static.mlcdn.com.br/1500x1500/smart-tv-70-4k-uhd-led-samsung-70du7700",
  },
];

// PRODUCTOS (🔥 IMPORTANTE)
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "TV 32 PULGADAS",
    category: "televisores",
    subCategory: "televisores-nuevo",
    price: "450",
    specs: ["Buen estado"],
    image:
      "https://a-static.mlcdn.com.br/1500x1500/smart-tv-70-4k-uhd-led-samsung-70du7700",
  },
];
