import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { ProductCategory } from "../types/product"

interface BreadcrumbProps {
  categories: ProductCategory[]
}

export default function Breadcrumb({ categories }: BreadcrumbProps) {
  // Ordenar categorías por jerarquía (de más general a más específica)
  const sortedCategories = [...categories].sort((a, b) => {
    // Si a no tiene padre y b sí, a va primero
    if (!a.parentId && b.parentId) return -1
    // Si b no tiene padre y a sí, b va primero
    if (a.parentId && !b.parentId) return 1
    // Si ambos tienen o no tienen padre, mantener el orden original
    return 0
  })

  return (
    <div className="flex items-center text-sm py-4 text-gray-500">
      <div className="flex flex-wrap items-center">
        <Link href="#" className="hover:text-blue-500">
          Volver al listado
        </Link>
        <span className="mx-2">|</span>

        {sortedCategories.map((category, index) => (
          <div key={category.id} className="flex items-center">
            <Link href={`/categoria/${category.slug}`} className="hover:text-blue-500">
              {category.name}
            </Link>
            {index < sortedCategories.length - 1 && <ChevronRight className="h-3 w-3 mx-1" />}
          </div>
        ))}
      </div>

      <div className="ml-auto flex items-center space-x-4">
        <Link href="#" className="text-blue-500 hover:underline">
          Vender uno igual
        </Link>
        <Link href="#" className="text-blue-500 hover:underline">
          Compartir
        </Link>
      </div>
    </div>
  )
}

