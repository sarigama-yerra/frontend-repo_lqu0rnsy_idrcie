import { Heart } from 'lucide-react'

function RecipeCard({ meal, onSave, onSelect }) {
  return (
    <div className="group rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden hover:ring-white/20 transition cursor-pointer" onClick={() => onSelect(meal)}>
      <div className="relative overflow-hidden">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="h-48 w-full object-cover group-hover:scale-[1.03] transition" />
        <button
          onClick={(e) => { e.stopPropagation(); onSave(meal); }}
          className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 text-rose-600 px-3 py-1 text-xs font-semibold shadow"
        >
          <Heart size={14}/> Save
        </button>
      </div>
      <div className="p-4">
        <div className="text-white font-semibold line-clamp-1">{meal.strMeal}</div>
        <div className="text-white/60 text-sm mt-1 flex items-center gap-3">
          <span>{meal.strArea}</span>
          <span>•</span>
          <span>{meal.strCategory}</span>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
