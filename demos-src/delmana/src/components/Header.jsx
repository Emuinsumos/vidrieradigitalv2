import { useState } from 'react'
import { BRAND_NAME, WHATSAPP_1, waLink } from '../config/site.js'
const links = [['Producto', '#producto'], ['Usos', '#usos'], ['Galería', '#galeria'], ['Contacto', '#consulta']]
export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-crema/95 backdrop-blur border-b border-trigo">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#inicio" className="font-display text-2xl font-bold tracking-wider text-acento">{BRAND_NAME}</a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(([t, h]) => <a key={h} href={h} className="hover:text-acento transition">{t}</a>)}
          <a href={waLink(WHATSAPP_1)} target="_blank" rel="noreferrer" className="btn btn-primary !py-2.5">Pedir por WhatsApp</a>
        </nav>
        <button className="md:hidden p-2 text-3xl leading-none" aria-label="Abrir menú" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
      </div>
      {open && (
        <nav className="md:hidden px-5 pb-5 flex flex-col gap-1 fade-up">
          {links.map(([t, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 text-lg border-b border-trigo">{t}</a>)}
          <a href={waLink(WHATSAPP_1)} target="_blank" rel="noreferrer" className="btn btn-primary mt-3">Pedir por WhatsApp</a>
        </nav>
      )}
    </header>
  )
}
