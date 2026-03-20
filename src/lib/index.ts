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
export const INITIAL_CATEGORIES = [
  {"id":"televisores","name":"Televisores","description":"","image":"https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop"},
  {"id":"audio","name":"Audio","description":"","image":"https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=2070&auto=format&fit=crop"},
  {"id":"refrigeracion","name":"Refrigeración","description":"","image":"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"},
  {"id":"lavanderia","name":"Lavandería","description":"","image":"https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=2070&auto=format&fit=crop"},
  {"id":"cocina","name":"Cocina","description":"","image":"https://images.unsplash.com/photo-1556911220-e15023318214?q=80&w=2070&auto=format&fit=crop"},
  {"id":"computo","name":"Cómputo","description":"","image":"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2070&auto=format&fit=crop"},
  {"id":"muebles","name":"Muebles","description":"","image":"https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop"},
  {"id":"1773973928461","name":"ZAPATOS","description":"","image":"https://img.freepik.com/vector-gratis/ilustracion-vectorial-zapatos-payaso-colores_1308-180473.jpg?semt=ais_hybrid&w=740&q=80"}
];

export const INITIAL_SUB_CATEGORIES = [
  {"id":"televisores-nuevo","name":"NUEVO (caja sellada)","categoryId":"televisores","image":"https://a-static.mlcdn.com.br/1500x1500/smart-tv-70-4k-uhd-led-samsung-70du7700-wi-fi-bluetooth-alexa-3-hdmi/magazineluiza/238243800/e12d1262b6199adbb8522694dfde3919.jpg"},
  {"id":"televisores-exibicion","name":"EXIBICION","categoryId":"televisores","image":"https://images.unsplash.com/photo-1556740734-7f96267b118a?q=80&w=2070&auto=format&fit=crop"},
  {"id":"televisores-seminuevo","name":"SEMINUEVO (usado)","categoryId":"televisores","image":"https://images.unsplash.com/photo-1558522195-e1201b090344?q=80&w=2070&auto=format&fit=crop"},

  {"id":"audio-nuevo","name":"NUEVO (caja sellada)","categoryId":"audio","image":"https://images.unsplash.com/photo-1589939705384-5185138a047a?q=80&w=2070&auto=format&fit=crop"},
  {"id":"audio-exibicion","name":"EXIBICION","categoryId":"audio","image":"https://images.unsplash.com/photo-1556740734-7f96267b118a?q=80&w=2070&auto=format&fit=crop"},
  {"id":"audio-seminuevo","name":"SEMINUEVO (usado)","categoryId":"audio","image":"https://images.unsplash.com/photo-1558522195-e1201b090344?q=80&w=2070&auto=format&fit=crop"},

  {"id":"refrigeracion-nuevo","name":"NUEVO (caja sellada)","categoryId":"refrigeracion","image":"https://images.unsplash.com/photo-1589939705384-5185138a047a?q=80&w=2070&auto=format&fit=crop"},
  {"id":"refrigeracion-exibicion","name":"EXIBICION","categoryId":"refrigeracion","image":"https://images.unsplash.com/photo-1556740734-7f96267b118a?q=80&w=2070&auto=format&fit=crop"},
  {"id":"refrigeracion-seminuevo","name":"SEMINUEVO (usado)","categoryId":"refrigeracion","image":"https://images.unsplash.com/photo-1558522195-e1201b090344?q=80&w=2070&auto=format&fit=crop"},

  {"id":"lavanderia-nuevo","name":"NUEVO (caja sellada)","categoryId":"lavanderia","image":"https://images.unsplash.com/photo-1589939705384-5185138a047a?q=80&w=2070&auto=format&fit=crop"},
  {"id":"lavanderia-exibicion","name":"EXIBICION","categoryId":"lavanderia","image":"https://images.unsplash.com/photo-1556740734-7f96267b118a?q=80&w=2070&auto=format&fit=crop"},
  {"id":"lavanderia-seminuevo","name":"SEMINUEVO (usado)","categoryId":"lavanderia","image":"https://images.unsplash.com/photo-1558522195-e1201b090344?q=80&w=2070&auto=format&fit=crop"},

  {"id":"cocina-nuevo","name":"NUEVO (caja sellada)","categoryId":"cocina","image":"https://images.unsplash.com/photo-1589939705384-5185138a047a?q=80&w=2070&auto=format&fit=crop"},
  {"id":"cocina-exibicion","name":"EXIBICION","categoryId":"cocina","image":"https://images.unsplash.com/photo-1556740734-7f96267b118a?q=80&w=2070&auto=format&fit=crop"},
  {"id":"cocina-seminuevo","name":"SEMINUEVO (usado)","categoryId":"cocina","image":"https://images.unsplash.com/photo-1558522195-e1201b090344?q=80&w=2070&auto=format&fit=crop"},

  {"id":"computo-nuevo","name":"NUEVO (caja sellada)","categoryId":"computo","image":"https://images.unsplash.com/photo-1589939705384-5185138a047a?q=80&w=2070&auto=format&fit=crop"},
  {"id":"computo-exibicion","name":"EXIBICION","categoryId":"computo","image":"https://images.unsplash.com/photo-1556740734-7f96267b118a?q=80&w=2070&auto=format&fit=crop"},
  {"id":"computo-seminuevo","name":"SEMINUEVO (usado)","categoryId":"computo","image":"https://images.unsplash.com/photo-1558522195-e1201b090344?q=80&w=2070&auto=format&fit=crop"},

  {"id":"muebles-nuevo","name":"NUEVO (caja sellada)","categoryId":"muebles","image":"https://images.unsplash.com/photo-1589939705384-5185138a047a?q=80&w=2070&auto=format&fit=crop"},
  {"id":"muebles-exibicion","name":"EXIBICION","categoryId":"muebles","image":"https://images.unsplash.com/photo-1556740734-7f96267b118a?q=80&w=2070&auto=format&fit=crop"},
  {"id":"muebles-seminuevo","name":"SEMINUEVO (usado)","categoryId":"muebles","image":"https://images.unsplash.com/photo-1558522195-e1201b090344?q=80&w=2070&auto=format&fit=crop"}
];

export const INITIAL_PRODUCTS = [
  {"id":"1773974269237","name":"TEL DE 32 PULGADAS","category":"televisores","subCategory":"televisores-nuevo","price":"450","specs":["CARO PERO BUENO"],"image":"https://a-static.mlcdn.com.br/1500x1500/smart-tv-70-4k-uhd-led-samsung-70du7700-wi-fi-bluetooth-alexa-3-hdmi/magazineluiza/238243800/e12d1262b6199adbb8522694dfde3919.jpg"},
  {"id":"1773974311164","name":"TV SAMSUNG 43","category":"televisores","subCategory":"televisores-nuevo","price":"750","specs":["MASOMENOS"],"image":"https://media.falabella.com/sodimacPE/4166086_00/w=800,h=800,fit=pad"},
  {"id":"1773974343156","name":"TV INDURAMA 50","category":"televisores","subCategory":"televisores-nuevo","price":"950","specs":["ESTA EN ALGO"],"image":"https://www.adslzone.net/app/uploads-adslzone.net/2025/12/smart-tv-samsung-oferta.png?x=500&y=295&quality=80"}
];
