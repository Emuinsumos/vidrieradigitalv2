import { BRAND_NAME, PRODUCT, TEXTS, WHATSAPP_1, waLink } from '../config/site.js'
import Img from './Img.jsx'
export default function Hero() {
  return (
    <section id="inicio" className="bg-gradient-to-b from-crema to-trigo/50">
      <div className="max-w-6xl mx-auto px-5 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div className="fade-up">
          <p className="font-display text-acento font-bold tracking-[0.3em] mb-3">{BRAND_NAME}</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">{TEXTS.HERO_TITLE}</h1>
          <p className="mt-5 text-lg text-cafe/80">{TEXTS.HERO_TEXT}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#consulta" className="btn btn-outline">Consultar producto</a>
            <a href={waLink(WHATSAPP_1)} target="_blank" rel="noreferrer" className="btn btn-primary">Pedir por WhatsApp</a>
          </div>
        </div>
        <Img eager src={PRODUCT.IMAGE} alt={PRODUCT.IMAGE_ALT} className="w-full aspect-square rounded-3xl shadow-xl fade-up" />
      </div>
    </section>
  )
}
