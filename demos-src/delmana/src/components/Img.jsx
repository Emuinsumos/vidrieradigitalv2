import { useState } from 'react'
export default function Img({ src, alt, className = '', eager = false }) {
  const [fail, setFail] = useState(false)
  if (fail) return <div role="img" aria-label={alt} className={`bg-trigo/60 flex items-center justify-center text-cafe/50 text-sm ${className}`}>Foto pendiente</div>
  return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFail(true)} className={`object-cover ${className}`} />
}
