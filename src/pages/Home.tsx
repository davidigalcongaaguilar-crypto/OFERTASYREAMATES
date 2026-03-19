import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  ChevronRight, 
  Plus,
  ChevronLeft,
  Instagram, 
  Facebook,
  Phone,
  MapPin,
  X,
  AlertTriangle,
  Upload,
  Link as LinkIcon,
  MessageCircle,
  Settings,
  Edit2,
  Trash2,
  Lock,
  Unlock,
  Camera,
  Copy,
  Globe,
  Save,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND, CONTACT, INITIAL_CATEGORIES, INITIAL_SUB_CATEGORIES, PRODUCTS } from "@/lib/index";
import type { Product, Category, SubCategory } from "@/lib/index";

// ─── Animation Config ────────────────────────────────────────────────────────
const spring = { type: "spring", stiffness: 300, damping: 30 };
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: spring }
};

// ─── Header ──────────────────────────────────────────────────────────────────
function Header({ onBackToHome, isAdmin }: { onBackToHome: () => void, isAdmin: boolean }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div onClick={onBackToHome} className="flex flex-col cursor-pointer group">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black flex items-center justify-center rounded-none group-hover:scale-110 transition-transform">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase font-heading">
              {BRAND.NAME.split(" ")[0]}<span className="text-gray-400"> {BRAND.NAME.split(" ").slice(1).join(" ")}</span>
            </span>
            {isAdmin && <div className="ml-3 flex items-center gap-1 bg-red-600 px-2 py-0.5"><Unlock className="w-3 h-3 text-white" /><span className="text-[8px] font-bold text-white uppercase">Modo Edición</span></div>}
          </div>
          <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-gray-400 ml-8 leading-none">
            {BRAND.SLOGAN}
          </span>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-4 border-r border-gray-100 pr-5">
            <a href={CONTACT.WHATSAPP_LINK} target="_blank" rel="noreferrer" title="WhatsApp" className="text-gray-400 hover:text-[#25D366] transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" title="Instagram" className="text-gray-400 hover:text-[#E1306C] transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" title="Facebook" className="text-gray-400 hover:text-[#1877F2] transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
          <a href={CONTACT.WHATSAPP_LINK} target="_blank" rel="noreferrer">
            <Button className="rounded-none px-6 font-bold text-xs uppercase tracking-widest bg-black hover:bg-gray-800 text-white">
              Cotizar Ahora
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Shared Card Component ────────────────────────────────────────────────────
function GridCard({ 
  title, 
  image, 
  onClick, 
  isAdmin, 
  onEdit, 
  onDelete, 
  onDuplicate,
  label = "Explorar" 
}: { 
  title: string, 
  image: string, 
  onClick: () => void, 
  isAdmin: boolean, 
  onEdit: () => void, 
  onDelete: () => void,
  onDuplicate: () => void,
  label?: string
}) {
  return (
    <motion.div 
      variants={fadeIn} 
      onClick={onClick}
      className="group relative aspect-[16/9] overflow-hidden bg-gray-50 cursor-pointer"
    >
      <img src={image} alt={title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      {isAdmin && (
        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); onDuplicate(); }} title="Duplicar" className="w-10 h-10 bg-black/50 text-white flex items-center justify-center hover:bg-blue-600 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"><Copy className="w-4 h-4" /></button>
          <button onClick={(e) => { e.stopPropagation(); onEdit(); }} title="Editar" className="w-10 h-10 bg-black/50 text-white flex items-center justify-center hover:bg-black backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"><Edit2 className="w-4 h-4" /></button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} title="Eliminar" className="w-10 h-10 bg-black/50 text-white flex items-center justify-center hover:bg-red-600 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-4 h-4" /></button>
        </div>
      )}

      <div className="absolute bottom-8 left-8">
        <h3 className="text-3xl md:text-4xl font-bold font-heading uppercase tracking-tighter text-white mb-2 leading-none">{title}</h3>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">{label} <ChevronRight className="w-4 h-4" /></p>
      </div>
    </motion.div>
  );
}

// ─── List Product Item ────────────────────────────────────────────────────────
function ProductListItem({ 
  product, 
  isAdmin, 
  onEdit, 
  onDelete,
  onDuplicate
}: { 
  product: Product, 
  isAdmin: boolean, 
  onEdit: () => void, 
  onDelete: () => void,
  onDuplicate: () => void
}) {
  return (
    <motion.div variants={fadeIn} className="flex flex-col md:flex-row items-stretch gap-8 py-10 border-b border-gray-100 group relative">
      <div className="w-full md:w-1/3 aspect-[4/3] bg-gray-50 overflow-hidden relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
        {isAdmin && (
          <div className="absolute top-4 left-4 flex gap-2">
            <button onClick={onDuplicate} title="Duplicar" className="w-10 h-10 bg-black/80 text-white flex items-center justify-center hover:bg-blue-600 backdrop-blur-md shadow-xl"><Copy className="w-4 h-4" /></button>
            <button onClick={onEdit} title="Editar" className="w-10 h-10 bg-black/80 text-white flex items-center justify-center hover:bg-black backdrop-blur-md shadow-xl"><Edit2 className="w-4 h-4" /></button>
            <button onClick={onDelete} title="Eliminar" className="w-10 h-10 bg-red-600/80 text-white flex items-center justify-center hover:bg-red-600 backdrop-blur-md shadow-xl"><Trash2 className="w-4 h-4" /></button>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between py-2">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-2xl md:text-4xl font-bold font-heading uppercase tracking-tighter leading-tight">{product.name}</h3>
              <span className="text-xl md:text-3xl font-bold text-black font-heading tracking-tighter">{product.price}</span>
            </div>
            <div className="h-1 w-12 bg-black mt-2" />
          </div>
          
          <div className="space-y-3">
            {product.specs.map((spec, i) => (
              <div key={i} className="flex items-center gap-3 text-xs text-gray-500 uppercase font-bold tracking-[0.1em]">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0" />
                {spec}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a href={`${CONTACT.WHATSAPP_LINK}?text=Me interesa el ${product.name} - ${product.price}`} target="_blank" rel="noreferrer" className="flex-1">
            <Button className="w-full rounded-none bg-black hover:bg-gray-800 text-white font-bold uppercase tracking-widest py-8 text-xs flex items-center justify-center gap-3 transition-all">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main View ───────────────────────────────────────────────────────────────
export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  
  // Data State with LocalStorage Sync
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('porsche_v7_cat');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });
  const [subCategories, setSubCategories] = useState<SubCategory[]>(() => {
    const saved = localStorage.getItem('porsche_v7_sub');
    return saved ? JSON.parse(saved) : INITIAL_SUB_CATEGORIES;
  });
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('porsche_v7_prod');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('porsche_v7_cat', JSON.stringify(categories));
    localStorage.setItem('porsche_v7_sub', JSON.stringify(subCategories));
    localStorage.setItem('porsche_v7_prod', JSON.stringify(products));
  }, [categories, subCategories, products]);

  // Form Modals
  const [modal, setModal] = useState<{ type: 'cat' | 'sub' | 'prod' | 'delete' | 'publish', open: boolean, edit?: any }>({ type: 'cat', open: false });
  const [form, setForm] = useState({ name: "", image: "", price: "", specs: "" });
  const [copySuccess, setCopySuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ name: "", image: "", price: "", specs: "" });
    setModal({ type: 'cat', open: false, edit: undefined });
    setCopySuccess(false);
  };

  const openAddModal = (type: 'cat' | 'sub' | 'prod') => {
    setForm({ name: "", image: "", price: "", specs: "" });
    setModal({ type, open: true });
  };

  const openEditModal = (type: 'cat' | 'sub' | 'prod', item: any) => {
    setForm({ 
      name: item.name, 
      image: item.image, 
      price: item.price || "", 
      specs: item.specs ? item.specs.join("\n") : "" 
    });
    setModal({ type, open: true, edit: item });
  };

  const handleDuplicate = (type: 'cat' | 'sub' | 'prod', item: any) => {
    const newId = Date.now().toString();
    if (type === 'cat') setCategories([...categories, { ...item, id: newId, name: `${item.name} (Copia)` }]);
    else if (type === 'sub') setSubCategories([...subCategories, { ...item, id: newId, name: `${item.name} (Copia)` }]);
    else if (type === 'prod') setProducts([...products, { ...item, id: newId, name: `${item.name} (Copia)` }]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!form.name) return;
    if (modal.type === 'cat') {
      const newItem = { id: modal.edit?.id || Date.now().toString(), name: form.name, description: "", image: form.image };
      if (modal.edit) setCategories(categories.map(c => c.id === modal.edit.id ? newItem : c));
      else setCategories([...categories, newItem]);
    }
    if (modal.type === 'sub') {
      const newItem = { id: modal.edit?.id || Date.now().toString(), name: form.name, categoryId: selectedCategory!, image: form.image };
      if (modal.edit) setSubCategories(subCategories.map(s => s.id === modal.edit.id ? newItem : s));
      else setSubCategories([...subCategories, newItem]);
    }
    if (modal.type === 'prod') {
      const newItem: Product = {
        id: modal.edit?.id || Date.now().toString(),
        name: form.name,
        category: selectedCategory!,
        subCategory: selectedSubCategory!,
        price: form.price,
        specs: form.specs.split("\n").filter(s => s.trim()),
        image: form.image
      };
      if (modal.edit) setProducts(products.map(p => p.id === modal.edit.id ? newItem : p));
      else setProducts([...products, newItem]);
    }
    resetForm();
  };

  const confirmDelete = () => {
    const { edit: item, type } = modal;
    if (type === 'cat') setCategories(categories.filter(c => c.id !== item.id));
    if (type === 'sub') setSubCategories(subCategories.filter(s => s.id !== item.id));
    if (type === 'prod') setProducts(products.filter(p => p.id !== item.id));
    resetForm();
  };

  const exportJSON = () => {
    const data = { categories, subCategories, products };
    const json = JSON.stringify(data);
    navigator.clipboard.writeText(json);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const filteredSubCats = subCategories.filter(s => s.categoryId === selectedCategory);
  const filteredProds = products.filter(p => p.category === selectedCategory && p.subCategory === selectedSubCategory);

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Header onBackToHome={() => { setSelectedCategory(null); setSelectedSubCategory(null); }} isAdmin={isAdmin} />

      <main className="pt-20">
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            /* NIVEL 1: CATEGORÍAS */
            <motion.section key="lvl1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-6 py-16">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                <div>
                  <h1 className="text-5xl md:text-8xl font-bold font-heading uppercase tracking-tighter mb-4 leading-none">CATALOGO EN <span className="text-gray-300">LINEA</span></h1>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">disfrute mientras encuentra lo que busca</p>
                </div>
                {isAdmin && (
                  <div className="flex gap-3">
                    <Button onClick={() => setModal({ type: 'publish', open: true })} className="rounded-none bg-red-600 text-white hover:bg-red-700 font-bold text-[10px] uppercase tracking-widest px-8 h-14 border-none flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Publicar Globalmente
                    </Button>
                    <Button onClick={() => openAddModal('cat')} className="rounded-none bg-black text-white hover:bg-gray-800 font-bold text-[10px] uppercase tracking-widest px-8 h-14">
                      <Plus className="w-4 h-4 mr-2" /> Agregar Línea
                    </Button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map(cat => (
                  <GridCard key={cat.id} title={cat.name} image={cat.image} isAdmin={isAdmin} onClick={() => setSelectedCategory(cat.id)} onEdit={() => openEditModal('cat', cat)} onDuplicate={() => handleDuplicate('cat', cat)} onDelete={() => setModal({ type: 'cat', open: true, edit: cat, delete: true } as any)} />
                ))}
                {isAdmin && (
                   <div onClick={() => openAddModal('cat')} className="border-2 border-dashed border-gray-100 aspect-[16/9] flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-black hover:bg-gray-50 transition-all group">
                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform"><Plus className="w-6 h-6 text-gray-300" /></div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300">Nueva Línea</span>
                  </div>
                )}
              </div>
            </motion.section>
          ) : !selectedSubCategory ? (
            /* NIVEL 2: ESTADOS */
            <motion.section key="lvl2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-6 py-16">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                <div className="flex items-center gap-8">
                  <button onClick={() => setSelectedCategory(null)} className="p-5 border border-gray-200 hover:border-black transition-colors"><ChevronLeft className="w-8 h-8" /></button>
                  <div>
                    <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase tracking-tighter leading-none">{categories.find(c => c.id === selectedCategory)?.name}</h2>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">Seleccione el estado de la unidad</p>
                  </div>
                </div>
                {isAdmin && (
                  <Button onClick={() => openAddModal('sub')} className="rounded-none bg-black text-white hover:bg-gray-800 font-bold text-[10px] uppercase tracking-widest px-8 h-14">
                    <Plus className="w-4 h-4 mr-2" /> Agregar Estado
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filteredSubCats.map(sub => (
                  <GridCard key={sub.id} title={sub.name} image={sub.image} isAdmin={isAdmin} label="Ver Modelos" onClick={() => setSelectedSubCategory(sub.id)} onEdit={() => openEditModal('sub', sub)} onDuplicate={() => handleDuplicate('sub', sub)} onDelete={() => setModal({ type: 'sub', open: true, edit: sub, delete: true } as any)} />
                ))}
                {isAdmin && (
                   <div onClick={() => openAddModal('sub')} className="border-2 border-dashed border-gray-100 aspect-[16/9] flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-black hover:bg-gray-50 transition-all group">
                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform"><Plus className="w-6 h-6 text-gray-300" /></div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300">Nuevo Estado</span>
                  </div>
                )}
              </div>
            </motion.section>
          ) : (
            /* NIVEL 3: PRODUCTOS */
            <motion.section key="lvl3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-6 py-16">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 pb-12 border-b border-gray-100">
                <div className="flex items-center gap-8">
                  <button onClick={() => setSelectedSubCategory(null)} className="p-5 border border-gray-200 hover:border-black transition-colors"><ChevronLeft className="w-8 h-8" /></button>
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading uppercase tracking-tighter leading-none mb-3">
                      {subCategories.find(s => s.id === selectedSubCategory)?.name} <span className="text-gray-300">{categories.find(c => c.id === selectedCategory)?.name}</span>
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">{filteredProds.length} Unidades Disponibles</p>
                  </div>
                </div>
                {isAdmin && (
                  <Button onClick={() => openAddModal('prod')} className="rounded-none bg-black text-white hover:bg-gray-800 font-bold text-[10px] uppercase tracking-widest px-8 h-14">
                    <Plus className="w-4 h-4 mr-2" /> Agregar Producto
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {filteredProds.map(p => (
                  <ProductListItem key={p.id} product={p} isAdmin={isAdmin} onEdit={() => openEditModal('prod', p)} onDuplicate={() => handleDuplicate('prod', p)} onDelete={() => setModal({ type: 'prod', open: true, edit: p, delete: true } as any)} />
                ))}
                {isAdmin && (
                  <div onClick={() => openAddModal('prod')} className="border-2 border-dashed border-gray-100 py-16 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-black hover:bg-gray-50 transition-all group mt-10">
                    <div className="w-12 h-12 bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform"><Plus className="w-6 h-6 text-gray-300" /></div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300">Nuevo Producto</span>
                  </div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* SETTINGS TOGGLE */}
      <div className="fixed bottom-6 right-6 z-[100] group">
        <button onClick={() => setIsAdmin(!isAdmin)} className="w-12 h-12 bg-white/80 backdrop-blur-md border border-gray-100 text-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-xl group-hover:scale-110">
          {isAdmin ? <Lock className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
        </button>
      </div>

      {/* MODALS */}
      {modal.open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          {modal.type === 'publish' ? (
            /* Publish Modal */
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-xl p-10 rounded-none shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-red-100 flex items-center justify-center mb-6"><Globe className="w-10 h-10 text-red-600" /></div>
                <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Publicar Cambios Globalmente</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-8 leading-relaxed">
                  Para que tus nuevas categorías e imágenes sean visibles para todos tus clientes, haz clic en el botón de abajo para copiar tu base de datos y **pégala en el chat de Skywork Agent**.
                </p>
                <div className="w-full bg-gray-50 p-6 border border-gray-100 mb-8 text-left max-h-40 overflow-hidden relative">
                   <code className="text-[8px] text-gray-400 break-all">{JSON.stringify({ categories, subCategories, products })}</code>
                   <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>
                <div className="flex w-full gap-4">
                  <Button variant="outline" onClick={resetForm} className="flex-1 rounded-none border-gray-200 font-bold uppercase tracking-widest py-8 text-[11px]">Cancelar</Button>
                  <Button onClick={exportJSON} className="flex-1 rounded-none bg-red-600 hover:bg-red-700 font-bold uppercase tracking-widest py-8 text-[11px] text-white flex items-center justify-center gap-2">
                    {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copySuccess ? "¡Copiado!" : "Copiar Código de Publicación"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (modal as any).delete ? (
            /* Delete Modal */
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-sm p-10 rounded-none border-t-8 border-red-600 shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-red-100 flex items-center justify-center mb-6"><AlertTriangle className="w-10 h-10 text-red-600" /></div>
                <h3 className="text-xl font-bold uppercase tracking-tighter mb-2">Eliminar Definitivamente</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-10 leading-relaxed">¿Borrar "{modal.edit.name}"?</p>
                <div className="flex w-full gap-4">
                  <Button variant="outline" onClick={resetForm} className="flex-1 rounded-none border-gray-200 font-bold uppercase tracking-widest py-6 text-[10px]">Cancelar</Button>
                  <Button onClick={confirmDelete} className="flex-1 rounded-none bg-red-600 hover:bg-red-700 font-bold uppercase tracking-widest py-6 text-[10px] text-white">Eliminar</Button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Add/Edit Modal */
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-lg p-10 rounded-none my-10 shadow-2xl">
              <h3 className="text-2xl font-bold uppercase tracking-tighter mb-8 font-heading">{modal.edit ? 'Editar' : 'Agregar'} {modal.type === 'cat' ? 'Línea' : modal.type === 'sub' ? 'Estado' : 'Producto'}</h3>
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Título / Nombre</label>
                  <input type="text" placeholder="NOMBRE" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border-b-2 border-gray-100 py-3 font-bold uppercase tracking-widest text-base focus:border-black outline-none" />
                  {modal.type === 'prod' && (
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Precio</label>
                      <input type="text" placeholder="EJ: S/ 1,200" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full border-b-2 border-gray-100 py-3 font-bold uppercase tracking-widest text-base focus:border-black outline-none" />
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Especificaciones</label>
                      <textarea placeholder="ESPECIFICACIONES..." value={form.specs} onChange={(e) => setForm({ ...form, specs: e.target.value })} rows={4} className="w-full border-2 border-gray-100 p-4 font-bold uppercase tracking-widest text-[10px] focus:border-black outline-none resize-none" />
                    </div>
                  )}
                  <div className="space-y-4 pt-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Imagen</label>
                    <div className="flex flex-col gap-3">
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input type="text" placeholder="PEGAR URL..." value={form.image.startsWith('data:') ? '' : form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full border-2 border-gray-100 pl-10 pr-4 py-3 font-bold uppercase tracking-widest text-[10px] focus:border-black outline-none" />
                      </div>
                      <button onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-gray-200 py-4 flex items-center justify-center gap-2 hover:border-black transition-colors">
                        <Camera className="w-4 h-4 text-gray-400" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Subir desde PC</span>
                      </button>
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </div>
                    {form.image && <div className="aspect-video bg-gray-50 overflow-hidden mt-4 border border-gray-100"><img src={form.image} className="w-full h-full object-cover" /></div>}
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <Button onClick={resetForm} variant="outline" className="flex-1 rounded-none py-8 font-bold uppercase tracking-widest text-xs">Cancelar</Button>
                  <Button onClick={handleSave} className="flex-1 rounded-none bg-black text-white hover:bg-gray-800 py-8 font-bold uppercase tracking-widest text-xs">Guardar</Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      <footer className="bg-black text-white py-24 mt-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 mb-20 pb-20 border-b border-gray-900">
            <div>
              <div className="flex items-center gap-2 mb-8"><div className="w-8 h-8 bg-white flex items-center justify-center"><Zap className="w-4 h-4 text-black" /></div><span className="font-bold text-2xl tracking-tighter uppercase font-heading">{BRAND.NAME}</span></div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-6 leading-relaxed">{BRAND.SLOGAN}</p>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Contacto</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-5"><MapPin className="w-5 h-5 text-gray-700 shrink-0" /><div className="text-xs font-bold uppercase tracking-widest leading-relaxed">{CONTACT.ADDRESS}<br />{CONTACT.CITY}</div></div>
                <div className="flex items-center gap-5"><Phone className="w-5 h-5 text-gray-700" /><div className="text-xs font-bold uppercase tracking-widest">+51 {CONTACT.PHONE}</div></div>
              </div>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Redes</h4>
              <div className="flex gap-6">
                <a href={CONTACT.WHATSAPP_LINK} target="_blank" rel="noreferrer" title="WhatsApp" className="w-12 h-12 flex items-center justify-center border border-gray-800 text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all"><MessageCircle className="w-5 h-5" /></a>
                <a href="#" title="Instagram" className="w-12 h-12 flex items-center justify-center border border-gray-800 text-white hover:bg-[#E1306C] hover:border-[#E1306C] transition-all"><Instagram className="w-5 h-5" /></a>
                <a href="#" title="Facebook" className="w-12 h-12 flex items-center justify-center border border-gray-800 text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-800 text-center">© {new Date().getFullYear()} {BRAND.NAME.toUpperCase()}. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </footer>
    </div>
  );
}
