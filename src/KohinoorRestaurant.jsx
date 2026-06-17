
//dir C:\Users\rajar\OneDrive\Desktop
import { useState, useEffect, useRef } from "react";
import {
  Clock,
  MapPin,
  Accessibility,
  Users,
  ChevronDown,
  Menu,
  X,
  CreditCard,
  Smartphone,
  Nfc,
  Phone,
  Instagram,
  
  Star,
  Music,
  Tv2,
  UtensilsCrossed,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SLIDES = [
  {
    url: "/images/img_3.png",
    alt: "Fine dining ambiance",
  },
  {
    url: "/images/img1.png",
    alt: "Authentic Indian curry",
  },
  {
    url: "/images/img2.png",
    alt: "Royal Indian feast spread",
  },
];

const MENU_TABS = [
  { id: "all", label: "All" },
  { id: "buffet", label: "All-You-Can-Eat Buffet" },
  { id: "starters", label: "Starters / Bites" },
  { id: "mains", label: "Main Course" },
  { id: "vegan", label: "Vegan Options" },
  { id: "catalogue", label: "Full Catalogue" },
];

const MENU_ITEMS = [
  {
    id: 1,
    name: "Premium Grand Feast Buffet",
    category: ["buffet", "catalogue"],
    price: 699,
    tag: "Chef's Pride",
    desc: "Unlimited access to 30+ dishes — dal makhani, biryani, kebabs, desserts, and seasonal specials. Served daily 12 PM–4 PM.",
  },
  {
    id: 2,
    name: "Mutton Rogan Josh",
    category: ["mains", "catalogue"],
    price: 450,
    tag: "Signature",
    desc: "Slow-braised Kashmiri lamb in a deeply aromatic whole-spice gravy. Served with roomali roti.",
  },
  {
    id: 3,
    name: "Honey Chilli Potatoes",
    category: ["starters", "vegan", "catalogue"],
    price: 240,
    tag: "Crowd Favourite",
    desc: "Crispy golden potato batons tossed in a tangy honey-chilli glaze, sesame seeds, and spring onion.",
  },
  {
    id: 4,
    name: "Paneer Tikka Platter",
    category: ["starters", "vegan", "catalogue"],
    price: 320,
    tag: "Vegan-Friendly",
    desc: "Tandoor-charred cottage cheese cubes marinated in mustard, yoghurt, and smoked paprika. Six pieces per platter.",
  },
  {
    id: 5,
    name: "Dal Makhani",
    category: ["mains", "vegan", "catalogue"],
    price: 280,
    tag: "Classic",
    desc: "Black lentils slow-cooked overnight with tomatoes and a touch of cream. Pairs beautifully with naan or jeera rice.",
  },
  {
    id: 6,
    name: "Seekh Kebab (Half Dozen)",
    category: ["starters", "catalogue"],
    price: 390,
    tag: "Grill Special",
    desc: "Minced lamb and spiced herbs moulded onto skewers, char-grilled to a smoky perfection in our clay tandoor.",
  },
  {
    id: 7,
    name: "Veg Biryani",
    category: ["mains", "vegan", "catalogue"],
    price: 260,
    tag: "Vegan",
    desc: "Fragrant basmati layered with seasonal vegetables, caramelised onions, saffron water, and whole spices.",
  },
  {
    id: 8,
    name: "Butter Chicken",
    category: ["mains", "catalogue"],
    price: 380,
    tag: "All-Time Bestseller",
    desc: "Tandoori chicken morsels folded into a velvety tomato-cream sauce. Rich, mildly spiced, and utterly indulgent.",
  },
  {
    id: 9,
    name: "Weekend Brunch Buffet",
    category: ["buffet", "catalogue"],
    price: 499,
    tag: "Sat & Sun Only",
    desc: "A curated brunch spread with live egg station, chaat counter, dessert carousel, and unlimited soft beverages.",
  },
  {
    id: 10,
    name: "Mushroom & Truffle Risotto",
    category: ["vegan", "mains", "catalogue"],
    price: 350,
    tag: "Continental",
    desc: "Arborio rice slow-stirred with porcini, fresh truffle oil, parmesan shavings (vegan parmesan available on request).",
  },
];

const TRUST_CARDS = [
  {
    icon: Clock,
    title: "Opening Hours",
    lines: ["12:00 PM – 10:00 PM", "Open 7 Days a Week"],
    sub: "Last orders at 9:30 PM",
  },
  {
    icon: MapPin,
    title: "Our Location",
    lines: ["28-C, 2nd Extension", "Akhnoor, Jammu"],
    sub: "Opposite Bahu Plaza",
  },
  {
    icon: Accessibility,
    title: "Full Accessibility",
    lines: ["Wheelchair-friendly", "Car park · Entrance"],
    sub: "Accessible seating & restrooms",
  },
  {
    icon: Users,
    title: "Guest Amenities",
    lines: ["Baby high-chairs", "Private dining rooms"],
    sub: "Cosy upmarket family atmosphere",
  },
];

const WA_NUMBER = "917889955907";

function waLink(itemName, price) {
  const msg = encodeURIComponent(
    `Hi Kohinoor Restaurant! I'd like to enquire about "${itemName}" (₹${price}). Could you please confirm availability and help me place an order?`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function AlertRibbon() {
  const items = [
    { icon: Music, text: "Weekend Live Music" },
    { icon: UtensilsCrossed, text: "All-You-Can-Eat Buffet Daily" },
    { icon: Tv2, text: "Live Sports Screening" },
  ];
  return (
    <div className="bg-amber-500 text-stone-900 text-xs font-semibold tracking-wide">
      <div className="flex items-center justify-center gap-6 px-4 py-2 overflow-x-auto whitespace-nowrap scrollbar-none">
        {items.map(({ icon: Icon, text }, i) => (
          <span key={i} className="flex items-center gap-1.5 shrink-0">
            <Icon size={13} />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

function Navbar({ onReserve }) {
  const [open, setOpen] = useState(false);
  const links = ["Menu", "About", "Gallery", "Contact"];

  return (
    <header className="sticky top-0 z-50 bg-stone-950/95 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <span
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            className="text-2xl font-bold tracking-widest text-amber-400"
          >
            KOHINOOR
          </span>
          <span className="text-[9px] tracking-[0.3em] text-stone-400 uppercase">
            Fine Dining · Akhnoor
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-stone-300 hover:text-amber-400 text-sm tracking-wider transition-colors"
            >
              {l}
            </a>
          ))}
          <button
            onClick={onReserve}
            className="ml-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-sm px-5 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95"
          >
            Reserve Table
          </button>
        </nav>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onReserve}
            className="bg-amber-500 text-stone-900 font-bold text-xs px-4 py-2 rounded-full"
          >
            Reserve
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-stone-300 hover:text-amber-400 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-stone-950 border-t border-stone-800 px-4 pb-4 pt-2 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-stone-300 hover:text-amber-400 text-sm tracking-wider py-1 border-b border-stone-800 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % SLIDES.length),
      2500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[92vh] min-h-[560px] overflow-hidden">
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.url}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-8">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6">
          <Star size={11} fill="currentColor" /> Jammu's Premier Fine Dining
          Experience
        </div>
        <h1
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-4xl mb-4"
        >
          A Royal Taste of{" "}
          <span className="text-amber-400">Authentic Flavors</span>
          <br className="hidden sm:block" /> for Family &amp; Feasts
        </h1>
        <p className="text-stone-300 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
          Since our founding, Kohinoor has been Jammu's gathering place for
          royal Kashmiri cuisine, legendary hospitality, and unforgettable
          celebrations.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
          <a
            href="#menu"
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 text-sm tracking-wide"
          >
            <UtensilsCrossed size={16} /> Explore Menu
          </a>
          <a
            href="https://maps.google.com/?q=Kohinoor+Restaurant+Gandhi+Nagar+Jammu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 text-sm tracking-wide backdrop-blur-sm"
          >
            <MapPin size={16} /> Get Directions
          </a>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-8 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-amber-400"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustGrid() {
  return (
    <section className="bg-stone-950 py-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TRUST_CARDS.map(({ icon: Icon, title, lines, sub }) => (
          <div
            key={title}
            className="group bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center mb-4 group-hover:bg-amber-500/25 transition-colors">
              <Icon size={20} className="text-amber-400" />
            </div>
            <h3 className="text-white font-semibold text-sm tracking-wide mb-2">
              {title}
            </h3>
            {lines.map((l, i) => (
              <p key={i} className="text-stone-300 text-sm leading-snug">
                {l}
              </p>
            ))}
            <p className="text-stone-500 text-xs mt-2 leading-snug">{sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MenuSection() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category.includes(activeTab));

  return (
    <section id="menu" className="bg-stone-900 py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-2">
            What We Serve
          </p>
          <h2
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            Our Menu
          </h2>
          <div className="mt-3 w-16 h-0.5 bg-amber-500 mx-auto rounded-full" />
        </div>

        {/* Tab pills — horizontally scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none justify-start sm:justify-center">
          {MENU_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border ${
                activeTab === tab.id
                  ? "bg-amber-500 text-stone-900 border-amber-500"
                  : "bg-transparent text-stone-400 border-stone-700 hover:border-amber-500/50 hover:text-stone-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-stone-950 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Tag + name */}
              <div>
                <span className="inline-block bg-amber-500/15 text-amber-400 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2">
                  {item.tag}
                </span>
                <h3 className="text-white font-semibold text-base leading-snug">
                  {item.name}
                </h3>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed flex-1">
                {item.desc}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-amber-400 font-bold text-lg">
                  ₹{item.price}
                </span>
                <a
                  href={waLink(item.name, item.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-all hover:scale-105 active:scale-95"
                >
                  {/* WhatsApp icon as inline SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 fill-white shrink-0"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Order / Enquire
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReserveModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });
  const [sent, setSent] = useState(false);

  function handleSubmit() {
    const msg = encodeURIComponent(
      `🍽️ *Table Reservation Request*\n\nName: ${form.name}\nPhone: ${form.phone}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}\nNotes: ${form.notes || "None"}\n\nKindly confirm my reservation. Thank you!`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    setSent(true);
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              className="text-white text-xl font-bold"
            >
              Reserve a Table
            </h2>
            <p className="text-stone-400 text-xs mt-0.5">
              We'll confirm via WhatsApp
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🎉</div>
            <p className="text-white font-semibold mb-1">
              Request sent via WhatsApp!
            </p>
            <p className="text-stone-400 text-sm">
              We'll confirm your table shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-amber-500 text-stone-900 font-bold px-6 py-2.5 rounded-full text-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {[
              { key: "name", label: "Full Name", placeholder: "Your name", type: "text" },
              { key: "phone", label: "Phone Number", placeholder: "+91 XXXXX XXXXX", type: "tel" },
              { key: "date", label: "Preferred Date", placeholder: "", type: "date" },
              { key: "time", label: "Preferred Time", placeholder: "", type: "time" },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label className="text-stone-400 text-xs mb-1 block">
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [key]: e.target.value }))
                  }
                  className="w-full bg-stone-800 border border-stone-700 text-white placeholder-stone-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="text-stone-400 text-xs mb-1 block">
                Number of Guests
              </label>
              <select
                value={form.guests}
                onChange={(e) =>
                  setForm((f) => ({ ...f, guests: e.target.value }))
                }
                className="w-full bg-stone-800 border border-stone-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-stone-400 text-xs mb-1 block">
                Special Requests (optional)
              </label>
              <textarea
                placeholder="Dietary needs, anniversary setup, etc."
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                rows={2}
                className="w-full bg-stone-800 border border-stone-700 text-white placeholder-stone-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold py-3 rounded-full transition-all hover:scale-[1.02] active:scale-95 text-sm tracking-wide mt-1"
            >
              Confirm via WhatsApp →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Footer() {
  const payments = [
    { icon: CreditCard, label: "Credit / Debit Cards" },
    { icon: Smartphone, label: "Google Pay" },
    { icon: Nfc, label: "NFC Mobile Pay" },
  ];
  return (
    <footer className="bg-stone-950 border-t border-stone-800" id="contact">
      {/* Payment strip */}
      <div className="border-b border-stone-800 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-stone-500 text-xs tracking-[0.25em] uppercase mb-6">
            We Accept
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {payments.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center">
                  <Icon size={17} className="text-amber-400" />
                </div>
                <span className="text-stone-300 text-sm font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <span
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            className="text-2xl font-bold tracking-widest text-amber-400"
          >
            KOHINOOR
          </span>
          <p className="text-stone-400 text-sm mt-3 leading-relaxed max-w-xs">
            Jammu's destination for royal Kashmiri cuisine, warm hospitality, and
            cherished family moments since our very first table.
          </p>
          <div className="flex gap-3 mt-5">
            {[Instagram, Phone].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-amber-500/20 border border-stone-700 hover:border-amber-500/50 flex items-center justify-center text-stone-400 hover:text-amber-400 transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-wider mb-4">
            Contact Us
          </h4>
          <ul className="space-y-2.5 text-stone-400 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-amber-400 mt-0.5 shrink-0" />
              <span>
                Akhnoor,<br />
                Jammu – Opposite Bahu Plaza
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-amber-400 shrink-0" />
              <a
                href="tel:+917889955907"
                className="hover:text-amber-400 transition-colors"
              >
                +91 78899 55907
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={14} className="text-amber-400 shrink-0" />
              <span>12:00 PM – 10:00 PM, Daily</span>
            </li>
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-wider mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-stone-400 text-sm">
            {["Our Menu", "Reserve a Table", "Gallery", "Private Dining", "Careers"].map(
              (l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {l}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-stone-800 px-4 py-5 text-center">
        <p className="text-stone-600 text-xs">
          © {new Date().getFullYear()} Kohinoor Restaurant, Akhnoor,
          Jammu. All rights reserved. · Website prototype for client review.
        </p>
      </div>
    </footer>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function KohinoorRestaurant() {
  const [showReserve, setShowReserve] = useState(false);

  return (
    <div className="min-h-screen bg-stone-950 text-white font-sans antialiased">
      <AlertRibbon />
      <Navbar onReserve={() => setShowReserve(true)} />
      <Hero />
      <TrustGrid />
      <MenuSection />
      <Footer />
      {showReserve && <ReserveModal onClose={() => setShowReserve(false)} />}
    </div>
  );
}
