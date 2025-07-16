import Sales from "./_Sales";
import { createClient } from "@/lib/supabase-server";

import LoginForm from "@/components/pages/LoginForm";

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  return ( 
    <div>
      <div className={`py-20 px-8 grid gap-12 items-center ${user ? 'lg:grid-cols-1' : 'lg:grid-cols-2'}`}>
            {/* Contenu principal à gauche */}
            <div className="text-center lg:text-left">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Trouvez votre <span className="text-blue-300">laverie</span>, <span className="text-green-300">pressing</span> ou <span className="text-purple-300">matériel</span> idéal
                </h2>
                <p className="text-xl text-white/80 mb-8">
                    Découvrez les meilleures opportunités d'investissement dans les laveries automatiques.
                    Des emplacements premium, des rendements attractifs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                        Parcourir les annonces
                    </button>
                </div>
            </div>
            {!user && (
                <div className="flex justify-center lg:justify-end">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 w-full max-w-md">
                        <div className="text-3xl font-bold text-white text-center mb-6">Se connecter</div>
                        <LoginForm />
                    </div>
                </div>
            )}
          </div>
      
      <Sales />
    </div>
  )
}
