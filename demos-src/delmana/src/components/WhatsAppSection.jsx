import { TEXTS, WHATSAPP_1, WHATSAPP_2, waLink } from '../config/site.js'
export default function WhatsAppSection() {
  const lines = [['Línea comercial 1', WHATSAPP_1], ['Línea comercial 2', WHATSAPP_2]]
  return (
    <section id="pedidos" className="bg-cafe text-crema">
      <div className="section text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold">{TEXTS.CTA_TITLE}</h2>
        <p className="mt-4 text-lg text-crema/80">{TEXTS.CTA_TEXT}</p>
        <a href={waLink(WHATSAPP_1)} target="_blank" rel="noreferrer" className="btn btn-primary mt-8">Hablar por WhatsApp</a>
        <div className="mt-12 grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {lines.map(([t, n]) => (
            <div key={t} className="bg-crema/10 rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold">{t}</h3>
              <p className="mt-1 text-crema/70">Consultar / realizar pedido</p>
              <a href={waLink(n)} target="_blank" rel="noreferrer" className="btn btn-primary mt-4 w-full">WhatsApp</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
