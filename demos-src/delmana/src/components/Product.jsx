import { PRODUCT } from '../config/site.js'
import Img from './Img.jsx'
export default function Product() {
  const rows = [['Marca', PRODUCT.BRAND_NAME], ['Presentación', PRODUCT.PRESENTATION], ['Usos', 'Milanesas, pollo, verduras y preparaciones gastronómicas']]
  return (
    <section id="producto" className="bg-white">
      <div className="section grid md:grid-cols-2 gap-10 items-center">
        <Img src={PRODUCT.IMAGE} alt={PRODUCT.IMAGE_ALT} className="w-full aspect-square rounded-3xl shadow-lg" />
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">{PRODUCT.PRODUCT_NAME}</h2>
          <p className="mt-4 text-cafe/80">{PRODUCT.DESCRIPTION}</p>
          <dl className="mt-6 divide-y divide-trigo border-y border-trigo">
            {rows.map(([k, v]) => <div key={k} className="py-3 flex justify-between gap-4"><dt className="font-semibold">{k}</dt><dd className="text-right text-cafe/80">{v}</dd></div>)}
          </dl>
          <a href="#consulta" className="btn btn-primary mt-8 w-full sm:w-auto">Consultar disponibilidad</a>
        </div>
      </div>
    </section>
  )
}
