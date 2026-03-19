import { IMAGES } from "@/assets/images";

// ─── Route Paths ───────────────────────────────────────────────────────────
export const ROUTE_PATHS = {
  HOME: "/",
} as const;

// ─── Branding ──────────────────────────────────────────────────────────────
export const BRAND = {
  NAME: "Ofertas & Remates",
  SLOGAN: "Electrodomésticos y más",
};

// ─── Contact Info ──────────────────────────────────────────────────────────
export const CONTACT = {
  PHONE: "966020440",
  WHATSAPP_LINK: "https://wa.me/51966020440",
  ADDRESS: "Av. Ramón Castilla 203",
  CITY: "Ayacucho – Perú",
};

// ─── Types ──────────────────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string; // ID of the subcategory
  price: string;
  specs: string[];
  image: string;
  wa_text?: string;
}

export interface SubCategory {
  id: string;
  name: string;
  categoryId: string; // Which category it belongs to
  image: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

// ─── Initial Data (Maintain what was there) ──────────────────────────────────
export const INITIAL_CATEGORIES: Category[] = [
  { id: "televisores", name: "Televisores", description: "", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop" },
  { id: "audio", name: "Audio", description: "", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=2070&auto=format&fit=crop" },
  { id: "refrigeracion", name: "Refrigeración", description: "", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" },
  { id: "lavanderia", name: "Lavandería", description: "", image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=2070&auto=format&fit=crop" },
  { id: "cocina", name: "Cocina", description: "", image: "https://images.unsplash.com/photo-1556911220-e15023318214?q=80&w=2070&auto=format&fit=crop" },
  { id: "computo", name: "Cómputo", description: "", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2070&auto=format&fit=crop" },
  { id: "muebles", name: "Muebles", description: "", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop" },
];

// Initial subcategories for each category as requested: Nuevo, Seminuevo, Exhibición
export const INITIAL_SUB_CATEGORIES: SubCategory[] = INITIAL_CATEGORIES.flatMap(cat => [
  { id: `${cat.id}-nuevo`, name: "NUEVO (caja sellada)", categoryId: cat.id, image: "https://images.unsplash.com/photo-1589939705384-5185138a047a?q=80&w=2070&auto=format&fit=crop" },
  { id: `${cat.id}-exibicion`, name: "EXIBICION", categoryId: cat.id, image: "https://images.unsplash.com/photo-1556740734-7f96267b118a?q=80&w=2070&auto=format&fit=crop" },
  { id: `${cat.id}-seminuevo`, name: "SEMINUEVO (usado)", categoryId: cat.id, image: "https://images.unsplash.com/photo-1558522195-e1201b090344?q=80&w=2070&auto=format&fit=crop" },
]);

export const PRODUCTS: Product[] = [];
