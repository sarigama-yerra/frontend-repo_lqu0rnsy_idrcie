import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import RecipeCard from './components/RecipeCard'
import RecipeModal from './components/RecipeModal'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [random, setRandom] = useState(null)
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    // Load a random recipe on first view
    getRandom()
  }, [])

  const search = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/recipes/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data.meals || [])
      if (!data.meals) setError('No recipes found. Try another search term.')
    } catch (e) {
      setError('Failed to search recipes. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getRandom = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/recipes/random`)
      const data = await res.json()
      const meal = data?.meals?.[0]
      setRandom(meal || null)
    } catch (e) {
      setError('Failed to load a random recipe.')
    } finally {
      setLoading(false)
    }
  }

  const saveFavorite = async (meal) => {
    try {
      await fetch(`${baseUrl}/api/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meal_id: meal.idMeal,
          title: meal.strMeal,
          thumbnail: meal.strMealThumb,
          category: meal.strCategory,
          area: meal.strArea,
        })
      })
    } catch (e) {
      // ignore UI error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <Hero onSearchChange={setQuery} onSearch={search} query={query} />

        {error && <div className="rounded-xl bg-rose-500/10 text-rose-200 ring-1 ring-rose-500/20 p-4">{error}</div>}

        {loading && (
          <div className="text-center text-white/70">Loading...</div>
        )}

        {!loading && random && !results.length && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Today’s pick</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <RecipeCard meal={random} onSave={saveFavorite} onSelect={setSelected} />
            </div>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Results</h2>
              <button onClick={()=>setResults([])} className="text-sm text-white/70 underline">Clear</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map(meal => (
                <RecipeCard key={meal.idMeal} meal={meal} onSave={saveFavorite} onSelect={setSelected} />
              ))}
            </div>
          </div>
        )}
      </div>

      <RecipeModal open={!!selected} onClose={()=>setSelected(null)} meal={selected} backendUrl={baseUrl} />
    </div>
  )
}

export default App
