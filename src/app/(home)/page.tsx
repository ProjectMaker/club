import { Suspense } from "react";
import Sales from "./_Sales";
import SalesLoading from "./_SalesLoading";
import { createClient } from "@/lib/supabase-server";

import LoginForm from "@/components/pages/LoginForm";

export default async function Home() {
  //const supabase = await createClient()
  //const { data: { user } } = await supabase.auth.getUser()
  
  return ( 
    <div>
      <div className={`py-20 px-8`}>
            {/* Contenu principal à gauche */}
            <div className="text-center lg:text-left">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Trouvez votre <span className="text-blue-300">laverie</span>, <span className="text-green-300">pressing</span> ou <span className="text-purple-300">matériel</span> idéal
                </h2>
                <p className="text-xl text-white/80 mb-8">
                    Découvrez les meilleures opportunités d'investissement dans les laveries automatiques.
                    Des emplacements premium, des rendements attractifs.
                </p>
            </div>
            
          </div>
      
      <Suspense fallback={<SalesLoading />}>
        <Sales />
      </Suspense>
    </div>
  )
}
