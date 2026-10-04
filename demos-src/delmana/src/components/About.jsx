import { TEXTS } from '../config/site.js'
import Img from './Img.jsx'
export default function About() {
  return (
    <section className="section grid md:grid-cols-2 gap-10 items-center">
      <Img src={`${import.meta.env.BASE_URL}img/gastronomia.svg`} alt="Preparación gastronómica con rebozado" className="w-full aspect-[4/3] rounded-3xl" />
      <div>
        <h2 className="font-display text-3xl md:text-4xl font-bold">{TEXTS.ABOUT_TITLE}</h2>
        <p className="mt-4 text-lg text-cafe/80">{TEXTS.ABOUT_TEXT}</p>
      </div>
    </section>
  )
}
