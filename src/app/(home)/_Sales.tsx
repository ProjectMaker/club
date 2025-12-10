import Image from "next/image";
import Link from "next/link";
import { Picture, User } from "@/models";
import { getSales } from "@/data-access-layers/sales-promotion";
import { MATERIAL_CATEGORIES } from "@/utils/constants";

interface ProductProps {
  id: number;
  name: string;
  pictures: Picture[];
  href: string;
  type: string;
}

function Product({ product }: { product: ProductProps }) {
  if (!product) {
    return null
  }

  return (
    <div
      key={product.id}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        {
          product.pictures.length > 0 && (
            <img
              src={product.pictures[0].data_url}
              alt={product.name}
              width={400}
              height={200}
              className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
            />
          )
        }
        {/* Type Sticker */}
        <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {product.type}
        </div>
      </div>

      {/* Contenu */}
      <h4 className="text-xl font-bold text-white mb-2">{product.name}</h4>

      <div className="flex-grow" />

      {/* Link */}
      <a
        href={product.href}
        className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors text-center mt-4"
        tabIndex={0}
      >
        Voir les détails
      </a>
    </div>
  )
}

export default async function Sales({ user }: { user: User | null }) {
  const { laundry, pressing, material } = await getSales()
  
  return (
    <section id="annonces" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-white text-center mb-12">
          Annonces à la une
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Product product={{ ...laundry, href: user ? `/private/laundries/${laundry.id}` : "/disclaimers/laundries", type: "Laverie" }} />
          {pressing && (
            <Product product={{ ...pressing, href: user ? `/private/pressings/${pressing.id}` : "/disclaimers/pressings", type: "Pressing" }} />
          )}
          {
            material && (
              <Product product={{ id: material.id, name: MATERIAL_CATEGORIES.find(category => category.name === material.category)?.label || '', pictures: material.pictures, href: user ? `/private/materials/${material.id}` : "/disclaimers/materials", type: "Matériel" }} />
            )
          }
        </div>
      </div>
    </section>
  )
}