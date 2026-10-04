import { useState } from 'react'
import { WHATSAPP_1, WHATSAPP_2, waLink } from '../config/site.js'
export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-white rounded-2xl shadow-xl p-4 w-64 fade-up">
          <p className="font-semibold mb-3">¿Con quién querés comunicarte?</p>
          <a href={waLink(WHATSAPP_1)} target="_blank" rel="noreferrer" className="btn btn-primary w-full mb-2">WhatsApp 1</a>
          <a href={waLink(WHATSAPP_2)} target="_blank" rel="noreferrer" className="btn btn-primary w-full">WhatsApp 2</a>
        </div>
      )}
      <button onClick={() => setOpen(!open)} aria-label="WhatsApp" className="w-16 h-16 rounded-full bg-[#25D366] text-white shadow-xl text-3xl hover:scale-105 transition">{open ? '✕' : '💬'}</button>
    </div>
  )
}
