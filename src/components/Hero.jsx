import { Search, Video, Mic, Globe2, Heart } from 'lucide-react'

function Hero({ onSearchChange, onSearch, query }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-rose-500/10 via-fuchsia-500/10 to-indigo-500/10 p-8 md:p-12 shadow-2xl">
      <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(600px_200px_at_0%_0%,rgba(244,63,94,0.4),transparent),radial-gradient(600px_200px_at_100%_0%,rgba(168,85,247,0.4),transparent),radial-gradient(800px_300px_at_50%_100%,rgba(99,102,241,0.35),transparent)]"/>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/20 backdrop-blur">
            <Globe2 size={14}/> Multilingual recipe search · Video · Voice · Text
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Discover recipes from around the world
          </h1>
          <p className="mt-4 text-white/80 md:text-lg max-w-xl">
            Search thousands of dishes, watch quick how-to videos, translate instructions instantly, and save your favorites.
          </p>

          <div className="mt-6 flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                value={query}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                placeholder="Type a dish, ingredient, or cuisine in any language..."
                className="w-full rounded-2xl bg-white/10 text-white placeholder-white/60 px-5 py-4 pr-12 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-white/40 backdrop-blur"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70" size={20} />
            </div>
            <button onClick={onSearch} className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-900 font-semibold px-5 py-4 shadow hover:shadow-lg transition">
              <Search size={18}/> Search
            </button>
          </div>
          <div className="mt-3 text-xs text-white/70">Try: paella, pho, biryani, tacos, sushi</div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-3 w-full">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/20 bg-cover bg-center" style={{backgroundImage:'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop)'}}/>
          <div className="aspect-square rounded-2xl overflow-hidden ring-1 ring-white/20 bg-cover bg-center" style={{backgroundImage:'url(https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop)'}}/>
          <div className="aspect-square rounded-2xl overflow-hidden ring-1 ring-white/20 bg-cover bg-center" style={{backgroundImage:'url(https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=1200&auto=format&fit=crop)'}}/>
          <div className="aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/20 bg-cover bg-center" style={{backgroundImage:'url(https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop)'}}/>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4 text-white/80 text-sm">
        <div className="inline-flex items-center gap-2"><Video size={16}/> Short how-to videos</div>
        <div className="inline-flex items-center gap-2"><Mic size={16}/> Voice friendly</div>
        <div className="inline-flex items-center gap-2"><Heart size={16}/> Save favorites</div>
      </div>
    </div>
  )
}

export default Hero
