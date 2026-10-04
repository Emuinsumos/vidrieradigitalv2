import { GALLERY } from '../config/site.js'
import Img from './Img.jsx'
export default function Gallery() {
  return (
    <section id="galeria" className="bg-trigo/40">
      <div className="section">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center">Galería</h2>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY.map((g, i) => <Img key={i} src={g.src} alt={g.alt} className="w-full aspect-square rounded-2xl hover:scale-[1.02] transition duration-300" />)}
        </div>
      </div>
    </section>
  )
}
