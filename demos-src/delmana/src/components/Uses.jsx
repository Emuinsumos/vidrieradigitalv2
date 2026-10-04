import { USES } from '../config/site.js'
import Img from './Img.jsx'
export default function Uses() {
  return (
    <section id="usos" className="section">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center">Un producto, muchas posibilidades</h2>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {USES.map((u) => (
          <article key={u.title} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition duration-300">
            <Img src={u.image} alt={u.alt} className="w-full aspect-[4/3]" />
            <div className="p-5"><h3 className="font-display text-xl font-bold">{u.title}</h3><p className="mt-2 text-cafe/80">{u.text}</p></div>
          </article>
        ))}
      </div>
    </section>
  )
}
