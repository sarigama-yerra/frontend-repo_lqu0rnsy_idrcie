import { X, Languages, Youtube } from 'lucide-react'
import { useEffect, useState } from 'react'

const LANGS = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ar', name: 'العربية' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
]

function formatIngredients(meal) {
  const items = []
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ing && ing.trim()) items.push(`${measure || ''} ${ing}`.trim())
  }
  return items
}

function RecipeModal({ open, onClose, meal, backendUrl }) {
  const [lang, setLang] = useState('en')
  const [translated, setTranslated] = useState('')

  useEffect(() => {
    if (!meal) return
    setTranslated(meal.strInstructions || '')
  }, [meal])

  const translate = async (target) => {
    if (!meal?.strInstructions) return
    setLang(target)
    try {
      const res = await fetch(`${backendUrl}/api/translate?text=${encodeURIComponent(meal.strInstructions)}&target=${target}`)
      const data = await res.json()
      setTranslated(data.translated || meal.strInstructions)
    } catch (e) {
      setTranslated(meal.strInstructions)
    }
  }

  if (!open || !meal) return null

  const videoId = meal.strYoutube?.includes('=') ? meal.strYoutube.split('=')[1] : null
  const ingredients = formatIngredients(meal)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-slate-900 text-white ring-1 ring-white/10 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold">{meal.strMeal}</h3>
            <p className="text-white/60 text-sm">{meal.strArea} • {meal.strCategory}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
            <X />
          </button>
        </div>

        {videoId && (
          <div className="aspect-video w-full bg-black">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Recipe Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div>
            <h4 className="font-semibold mb-2">Ingredients</h4>
            <ul className="space-y-1 text-sm text-white/80 list-disc pl-4">
              {ingredients.map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Instructions</h4>
              <div className="flex items-center gap-2">
                <Languages size={16} className="text-white/70"/>
                <select value={lang} onChange={(e)=>translate(e.target.value)} className="bg-white/10 text-white text-sm rounded-lg px-2 py-1 ring-1 ring-white/20">
                  {LANGS.map(l => <option key={l.code} value={l.code} className="bg-slate-900">{l.name}</option>)}
                </select>
              </div>
            </div>
            <p className="text-sm leading-6 text-white/80 whitespace-pre-line">
              {translated}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeModal
