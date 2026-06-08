import { useEffect, useMemo, useState } from 'react'
import './App.css'

type MenuItem = {
  name: string
  detail: string
  price?: string
  category: string
  badge?: string
}

type Restaurant = {
  slug: string
  name: string
  shortName: string
  cuisine: string
  tagline: string
  headline: string
  intro: string
  address: string
  phone?: string
  whatsapp?: string
  mapUrl: string
  hours: string
  logo?: string
  logoKind?: 'light' | 'dark'
  heroImage?: string
  heroAlt: string
  theme: string
  layout: 'terrace' | 'fast' | 'bistro' | 'atelier' | 'lounge'
  primaryAction: string
  secondaryAction: string
  bookingHeadline: string
  bookingBody: string
  takeoutHeadline: string
  takeoutBody: string
  times: string[]
  takeoutModes: string[]
  menu: MenuItem[]
  sections: { label: string; title: string; body: string }[]
  seo: { title: string; description: string }
}

const restaurants: Restaurant[] = [
  {
    slug: 'la-luna',
    name: 'La Luna',
    shortName: 'La Luna',
    cuisine: 'Restaurante · Bar · Terraza',
    tagline: 'Complejo La Luna · Calle de Argelia',
    headline: 'Terraza, cocina y cócteles para la noche de Malabo.',
    intro: 'Reserva una mesa, consulta platos destacados y prepara tu visita a uno de los espacios clásicos de Calle de Argelia.',
    address: 'QQ4H+RFR, C. de Argelia, Malabo',
    phone: '+240 333 096 096',
    whatsapp: '240333096096',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=La+Luna+Calle+de+Argelia+Malabo',
    hours: 'Todos los días · 11:30–23:30',
    logo: '/restaurants/la-luna/logo.jpg',
    logoKind: 'light',
    heroImage: '/restaurants/la-luna/hero.jpg',
    heroAlt: 'Terraza y ambiente de La Luna en Malabo',
    theme: 'theme-luna',
    layout: 'terrace',
    primaryAction: 'Reservar mesa',
    secondaryAction: 'Ver carta',
    bookingHeadline: 'Reserva para cena, terraza o grupo.',
    bookingBody: 'Envía los datos básicos por WhatsApp para que el equipo confirme disponibilidad.',
    takeoutHeadline: 'Consulta platos para recoger.',
    takeoutBody: 'Ideal para tablas, platos de mar y pedidos familiares que el restaurante pueda confirmar antes de preparar.',
    times: ['19:00', '20:30', '22:00', 'Evento privado'],
    takeoutModes: ['Recoger hoy', 'Recogida por conductor', 'Pedido para grupo'],
    sections: [
      { label: 'Ambiente', title: 'Noche tranquila, mesa cuidada.', body: 'Cena, terraza y bar en un recorrido claro: carta, reserva, ubicación y contacto directo.' },
      { label: 'Ubicación', title: 'Calle de Argelia, Malabo.', body: 'Encuentra la dirección, confirma disponibilidad y llega con la reserva preparada.' },
    ],
    menu: [
      { name: 'Parrillada del puerto', detail: 'Pescado, gambas, cítricos, plátano y verduras para compartir.', price: '18.000 XAF', category: 'Cena', badge: 'Mar' },
      { name: 'Arroz marinero', detail: 'Arroz familiar con mariscos y aliños de casa.', price: '14.000 XAF', category: 'Cena', badge: 'Grupo' },
      { name: 'Cóctel de terraza', detail: 'Ron, lima, fruta tropical y servicio de noche.', price: '5.000 XAF', category: 'Bar', badge: 'Terraza' },
      { name: 'Tabla nocturna', detail: 'Bocados calientes, salsas y pan para acompañar bebidas.', price: '9.000 XAF', category: 'Para llevar', badge: 'Pickup' },
    ],
    seo: { title: 'La Luna Malabo · Restaurante Bar Terraza', description: 'La Luna Malabo: restaurante, bar y terraza en Calle de Argelia con reservas y consultas por WhatsApp.' },
  },
  {
    slug: 'kalytero',
    name: 'Kalytero',
    shortName: 'Kalytero',
    cuisine: 'Tapas · Música · Frente al mar',
    tagline: 'Paseo Marítimo 14 y 15',
    headline: 'Tapas, música y buen ambiente frente al mar.',
    intro: 'Un sitio rápido y vivo para decidir qué comer, reservar con amigos y pedir combos sin dar vueltas.',
    address: 'Paseo Marítimo 14 y 15, Malabo',
    phone: '+240 555 911 787',
    whatsapp: '240555911787',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kalytero+Paseo+Maritimo+Malabo',
    hours: 'Almuerzo, tarde y noche',
    logo: '/restaurants/kalytero/logo.svg',
    logoKind: 'dark',
    heroAlt: 'Tapas y mesa casual junto al mar',
    theme: 'theme-kalytero',
    layout: 'fast',
    primaryAction: 'Pedir por WhatsApp',
    secondaryAction: 'Reservar grupo',
    bookingHeadline: 'Mesa casual para amigos o trabajo.',
    bookingBody: 'Indica hora, personas y si quieres zona de música o mesa tranquila.',
    takeoutHeadline: 'Combos listos para recoger.',
    takeoutBody: 'Pide tapas, hamburguesas o bowls para oficina, playa o grupo pequeño.',
    times: ['12:30', '14:00', '19:30', 'Grupo'],
    takeoutModes: ['Recoger en 30 min', 'Pedido oficina', 'Combo familiar'],
    sections: [
      { label: 'Ritmo', title: 'Primero decisión, luego comida.', body: 'Carta, precios y WhatsApp están cerca para pedir desde el móvil sin perder tiempo.' },
      { label: 'Mar', title: 'Color, energía y Paseo Marítimo.', body: 'Tapas, música y mesas casuales con una presencia viva, rápida y fácil de compartir.' },
    ],
    menu: [
      { name: 'Burger Kalytero', detail: 'Carne a la parrilla, salsa de casa, queso y papas.', price: '6.500 XAF', category: 'Combos', badge: 'Popular' },
      { name: 'Pollo citrus grill', detail: 'Pollo marinado, arroz, ensalada y salsa suave.', price: '7.500 XAF', category: 'Combos', badge: 'Lunch' },
      { name: 'Tapas de costa', detail: 'Bocados para compartir con bebida y música.', price: '8.000 XAF', category: 'Tapas', badge: 'Mesa' },
      { name: 'Jarra tropical', detail: 'Zumo fresco para compartir.', price: '3.000 XAF', category: 'Bebidas', badge: 'Fresh' },
    ],
    seo: { title: 'Kalytero Malabo · Tapas Música y Buen Ambiente', description: 'Kalytero Malabo en Paseo Marítimo: tapas, música, reservas y pedidos por WhatsApp.' },
  },
  {
    slug: 'imagine',
    name: 'Restaurante Imagine',
    shortName: 'Imagine',
    cuisine: 'Cocina creativa · Eventos · Delivery',
    tagline: 'Ingredientes locales, propuestas globales',
    headline: 'Cocina creativa para familia, eventos y antojos de semana.',
    intro: 'Imagine necesita sentirse cercano y especial: carta visible, especiales, catering y pedidos fáciles desde el teléfono.',
    address: 'Malabo, Bioko Norte',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Restaurante+Imagine+Malabo',
    hours: 'Consulta disponibilidad por WhatsApp',
    logo: '/restaurants/imagine/logo.png',
    logoKind: 'light',
    heroImage: '/restaurants/imagine/hero.jpg',
    heroAlt: 'Cabecera pública de Restaurante Imagine',
    theme: 'theme-imagine',
    layout: 'bistro',
    primaryAction: 'Reservar o consultar',
    secondaryAction: 'Especiales',
    bookingHeadline: 'Mesa familiar, evento o catering.',
    bookingBody: 'Envía fecha, hora y tipo de visita para que Imagine confirme el mejor formato.',
    takeoutHeadline: 'Delivery o recogida bajo consulta.',
    takeoutBody: 'Prepara un mensaje claro para platos, postres, catering pequeño o pedidos especiales.',
    times: ['13:00', '15:00', '20:00', 'Evento'],
    takeoutModes: ['Recogida', 'Delivery', 'Catering pequeño'],
    sections: [
      { label: 'Especiales', title: 'Una carta con personalidad.', body: 'Platos creativos, postres y bebidas organizados para familias, comidas de semana y momentos especiales.' },
      { label: 'Servicio', title: 'Mesa, delivery y catering.', body: 'Reserva una mesa, consulta delivery o prepara una solicitud de catering desde el mismo flujo.' },
    ],
    menu: [
      { name: 'Especial Imagine', detail: 'Plato del día con producto local y salsa creativa.', price: '8.000 XAF', category: 'Especiales', badge: 'Hoy' },
      { name: 'Pasta familiar', detail: 'Pasta cremosa para mesa de 3 a 4 personas.', price: '13.000 XAF', category: 'Familia', badge: 'Mesa' },
      { name: 'Caja dulce', detail: 'Postres surtidos para llevar o regalar.', price: '6.000 XAF', category: 'Postres', badge: 'Dulce' },
      { name: 'Limonada coral', detail: 'Limonada fresca con fruta de temporada.', price: '2.500 XAF', category: 'Bebidas', badge: 'Fresh' },
    ],
    seo: { title: 'Restaurante Imagine Malabo · Cocina Creativa', description: 'Restaurante Imagine en Malabo: cocina creativa, eventos, catering, delivery y consultas por WhatsApp.' },
  },
  {
    slug: 'latelier',
    name: "Restaurant L'Atelier",
    shortName: "L'Atelier",
    cuisine: 'Chef table · Cocina cuidada',
    tagline: 'Mesa de autor en Malabo',
    headline: 'Una carta precisa, preparada como taller de cocina.',
    intro: 'Una experiencia sobria para clientes que quieren reservar, leer una carta corta y entender el cuidado del plato.',
    address: 'Malabo, Guinea Ecuatorial',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Restaurant+L%27Atelier+Malabo',
    hours: 'Cena y reservas privadas bajo consulta',
    heroAlt: 'Cocina de autor y preparación de chef',
    theme: 'theme-atelier',
    layout: 'atelier',
    primaryAction: 'Reservar chef table',
    secondaryAction: 'Ver menú corto',
    bookingHeadline: 'Reserva precisa, sin ruido.',
    bookingBody: 'Indica fecha, personas y si buscas cena privada, chef table o celebración discreta.',
    takeoutHeadline: 'Preparaciones limitadas.',
    takeoutBody: 'Solicitudes por encargo para cajas de autor o regalos gastronómicos.',
    times: ['19:30', '21:00', 'Chef table', 'Cena privada'],
    takeoutModes: ['Caja de autor', 'Regalo gastronómico', 'Recogida con cita'],
    sections: [
      { label: 'Taller', title: 'Menos elementos, más intención.', body: 'Carta corta, ritmo tranquilo y reservas pensadas para una cena cuidada.' },
      { label: 'Privado', title: 'Cenas pequeñas y cuidadas.', body: 'Solicita chef table, cena privada o caja de autor con detalles claros desde el primer mensaje.' },
    ],
    menu: [
      { name: 'Menú corto de temporada', detail: 'Tres pasos con producto local y técnica de casa.', price: '22.000 XAF', category: 'Cena', badge: 'Chef' },
      { name: 'Pescado sellado', detail: 'Pescado del día, mantequilla cítrica y verduras.', price: '16.000 XAF', category: 'Cena', badge: 'Firma' },
      { name: 'Maridaje ligero', detail: 'Selección de vino o cóctel bajo consulta.', price: '8.000 XAF', category: 'Bebidas', badge: 'Pairing' },
      { name: 'Caja de autor', detail: 'Preparación limitada para recoger con reserva previa.', price: '18.000 XAF', category: 'Encargo', badge: 'Limitado' },
    ],
    seo: { title: "Restaurant L'Atelier Malabo · Chef Table", description: "Restaurant L'Atelier Malabo: cocina cuidada, carta corta, reservas privadas y consultas directas." },
  },
  {
    slug: 'wanda',
    name: 'Wanda Lounge & Restaurante',
    shortName: 'Wanda',
    cuisine: 'Lounge · Música · Mesas de grupo',
    tagline: 'Noche, platos y reservas de grupo',
    headline: 'Mesa, música y platos para una noche con gente.',
    intro: 'Wanda debe vender energía: grupos, cumpleaños, platos para compartir y contacto rápido antes de salir.',
    address: 'Malabo, Guinea Ecuatorial',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Wanda+Lounge+Restaurante+Malabo',
    hours: 'Tarde y noche bajo consulta',
    heroAlt: 'Ambiente lounge con mesa de grupo y música',
    theme: 'theme-wanda',
    layout: 'lounge',
    primaryAction: 'Reservar grupo',
    secondaryAction: 'Ver late menu',
    bookingHeadline: 'Cumpleaños, grupo o noche especial.',
    bookingBody: 'Indica número de personas, hora y tipo de mesa para preparar la solicitud.',
    takeoutHeadline: 'Platos y platters para recoger.',
    takeoutBody: 'Consulta wings, tablas y cajas para arrancar la noche antes de llegar.',
    times: ['20:00', '22:30', 'Cumpleaños', 'Evento'],
    takeoutModes: ['Recogida tarde', 'Platter grupo', 'Conductor recoge'],
    sections: [
      { label: 'Lounge', title: 'Más evento que comedor clásico.', body: 'Mesas de grupo, música, platos para compartir y contacto rápido antes de salir.' },
      { label: 'Grupos', title: 'Reserva la noche antes de llegar.', body: 'Cumpleaños, late menu y platters aparecen juntos para que la solicitud llegue completa.' },
    ],
    menu: [
      { name: 'Wanda wings', detail: 'Alitas glaseadas, salsa picante y papas crujientes.', price: '8.500 XAF', category: 'Late menu', badge: 'Late' },
      { name: 'Tabla lounge', detail: 'Bocados para compartir antes de la música.', price: '15.000 XAF', category: 'Grupo', badge: 'Mesa' },
      { name: 'Mocktail neon', detail: 'Bebida sin alcohol, fruta tropical y toque ácido.', price: '4.000 XAF', category: 'Bebidas', badge: 'Bar' },
      { name: 'Platter para llevar', detail: 'Caja para grupo con wings, papas y salsas.', price: '18.000 XAF', category: 'Pickup', badge: 'Grupo' },
    ],
    seo: { title: 'Wanda Lounge & Restaurante Malabo · Mesas y Late Menu', description: 'Wanda Lounge & Restaurante: mesas de grupo, late menu, música y consultas por WhatsApp en Malabo.' },
  },
]

function currentSlug() {
  const clean = window.location.pathname.replace(/^\//, '').split('/')[0]
  return clean || 'imagine'
}

function getRestaurant() {
  return restaurants.find((item) => item.slug === currentSlug()) ?? restaurants.find((item) => item.slug === 'imagine') ?? restaurants[0]
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function waLink(restaurant: Restaurant, message: string) {
  const number = restaurant.whatsapp ?? restaurant.phone?.replace(/\D/g, '')
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`
}

function fallbackMark(restaurant: Restaurant) {
  if (restaurant.layout === 'atelier') return <span className="fallback-mark atelier-mark">A</span>
  if (restaurant.layout === 'lounge') return <span className="fallback-mark wanda-mark">W</span>
  return <span className="fallback-mark">{restaurant.shortName.slice(0, 1)}</span>
}

function App() {
  const restaurant = getRestaurant()
  const [category, setCategory] = useState('Todos')
  const [booking, setBooking] = useState({ name: '', date: '', time: restaurant.times[0], guests: '2 personas' })
  const [takeout, setTakeout] = useState({ name: '', mode: restaurant.takeoutModes[0], notes: '' })

  useEffect(() => {
    document.title = restaurant.seo.title
    document.documentElement.lang = 'es'
    const meta = document.querySelector('meta[name="description"]')
    meta?.setAttribute('content', restaurant.seo.description)
  }, [restaurant])

  const categories = useMemo(() => ['Todos', ...Array.from(new Set(restaurant.menu.map((item) => item.category)))], [restaurant.menu])
  const visibleMenu = category === 'Todos' ? restaurant.menu : restaurant.menu.filter((item) => item.category === category)
  const bookingReady = booking.name.trim() && booking.date && booking.time && booking.guests
  const takeoutReady = takeout.name.trim() && takeout.mode
  const bookingMessage = `Hola ${restaurant.name}, quiero reservar. Nombre: ${booking.name || '[nombre]'}. Fecha: ${booking.date || '[fecha]'}. Hora: ${booking.time}. Personas: ${booking.guests}.`
  const takeoutMessage = `Hola ${restaurant.name}, quiero consultar un pedido para llevar. Nombre: ${takeout.name || '[nombre]'}. Modalidad: ${takeout.mode}. Detalles: ${takeout.notes || '[pedido]'}.`

  return (
    <main className={`site ${restaurant.theme} layout-${restaurant.layout}`}>
      <a className="skip-link" href="#menu">Saltar a la carta</a>
      <nav className="topbar shell" aria-label={`${restaurant.name} navegación`}>
        <a className={`brand ${restaurant.logoKind === 'light' ? 'brand-light' : ''}`} href="/" aria-label={`${restaurant.name} inicio`}>
          {restaurant.logo ? <img src={restaurant.logo} alt={`${restaurant.name} logo`} /> : fallbackMark(restaurant)}
          <span>{restaurant.name}</span>
        </a>
        <div className="nav-links">
          <a href="#menu">Carta</a>
          <a href="#reservas">Reservas</a>
          <a href="#pedidos">Pedidos</a>
          <a href="#visita">Visita</a>
        </div>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">{restaurant.cuisine}</p>
          <h1>{restaurant.headline}</h1>
          <p>{restaurant.intro}</p>
          <div className="hero-actions">
            <a className="button primary" href="#reservas">{restaurant.primaryAction}</a>
            <a className="button ghost" href="#menu">{restaurant.secondaryAction}</a>
          </div>
        </div>
        <div className="hero-panel" aria-label={restaurant.heroAlt}>
          {restaurant.heroImage ? <img src={restaurant.heroImage} alt={restaurant.heroAlt} /> : <div className="generated-hero" aria-hidden="true"><span>{restaurant.shortName}</span></div>}
          <div className="hero-card">
            <span>{restaurant.tagline}</span>
            <strong>{restaurant.hours}</strong>
            <a href={restaurant.mapUrl} target="_blank" rel="noreferrer">Abrir ubicación</a>
          </div>
        </div>
      </section>

      <section className="story-grid shell" aria-label={`${restaurant.name} detalles`}>
        {restaurant.sections.map((section) => (
          <article key={section.label}>
            <span>{section.label}</span>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section id="menu" className="menu-section shell">
        <div className="section-head">
          <p className="eyebrow">Carta</p>
          <h2>Platos destacados para decidir rápido.</h2>
          <p>Filtra por categoría y abre una consulta directa si quieres reservar o pedir.</p>
        </div>
        <div className="chips" aria-label="Filtrar categorías de carta">
          {categories.map((item) => (
            <button key={item} className={item === category ? 'chip active' : 'chip'} onClick={() => setCategory(item)} type="button">{item}</button>
          ))}
        </div>
        <div className="menu-list">
          {visibleMenu.map((item) => (
            <article className="menu-item" key={item.name}>
              <div>
                {item.badge ? <span>{item.badge}</span> : null}
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
              </div>
              {item.price ? <strong>{item.price}</strong> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="conversion shell" aria-label="Reservas y pedidos">
        <form id="reservas" className="form-card booking" onSubmit={(event) => event.preventDefault()}>
          <p className="eyebrow">Reservas</p>
          <h2>{restaurant.bookingHeadline}</h2>
          <p>{restaurant.bookingBody}</p>
          <label>Nombre<input value={booking.name} onChange={(event) => setBooking({ ...booking, name: event.target.value })} placeholder="Tu nombre" required /></label>
          <div className="form-row">
            <label>Fecha<input type="date" min={today()} value={booking.date} onChange={(event) => setBooking({ ...booking, date: event.target.value })} required /></label>
            <label>Hora<select value={booking.time} onChange={(event) => setBooking({ ...booking, time: event.target.value })}>{restaurant.times.map((time) => <option key={time}>{time}</option>)}</select></label>
          </div>
          <label>Personas<select value={booking.guests} onChange={(event) => setBooking({ ...booking, guests: event.target.value })}><option>2 personas</option><option>4 personas</option><option>6 personas</option><option>Grupo privado</option></select></label>
          <a className={bookingReady ? 'button primary wide' : 'button primary wide disabled'} href={bookingReady ? waLink(restaurant, bookingMessage) : '#reservas'} aria-disabled={!bookingReady}>Abrir mensaje de reserva</a>
        </form>

        <form id="pedidos" className="form-card takeout" onSubmit={(event) => event.preventDefault()}>
          <p className="eyebrow">Pedidos</p>
          <h2>{restaurant.takeoutHeadline}</h2>
          <p>{restaurant.takeoutBody}</p>
          <label>Nombre<input value={takeout.name} onChange={(event) => setTakeout({ ...takeout, name: event.target.value })} placeholder="Tu nombre" required /></label>
          <label>Modalidad<select value={takeout.mode} onChange={(event) => setTakeout({ ...takeout, mode: event.target.value })}>{restaurant.takeoutModes.map((mode) => <option key={mode}>{mode}</option>)}</select></label>
          <label>Detalles<textarea value={takeout.notes} onChange={(event) => setTakeout({ ...takeout, notes: event.target.value })} placeholder="Platos, cantidad, hora, zona..." /></label>
          <a className={takeoutReady ? 'button ghost wide strong' : 'button ghost wide disabled'} href={takeoutReady ? waLink(restaurant, takeoutMessage) : '#pedidos'} aria-disabled={!takeoutReady}>Abrir mensaje de pedido</a>
        </form>
      </section>

      <section id="visita" className="visit shell">
        <div>
          <p className="eyebrow">Visita</p>
          <h2>{restaurant.address}</h2>
          <p>{restaurant.hours}{restaurant.phone ? ` · ${restaurant.phone}` : ''}</p>
        </div>
        <a className="button primary" href={restaurant.mapUrl} target="_blank" rel="noreferrer">Abrir mapa</a>
      </section>
    </main>
  )
}

export default App
