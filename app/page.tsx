import Navbar from "./components/Navbar"
import Link from "next/link"
import { ProductService } from "./services/product-service"

export default async function HomePage() {
  // Obtener productos para mostrar en la página principal
  const laptopProduct = await ProductService.getProductById("prod1")
  const thermosProduct = await ProductService.getProductById("prod2")

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Productos destacados</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {laptopProduct && (
            <Link href={`/product/${laptopProduct.slug}`} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 flex items-center justify-center p-4">
                  <img
                    src={laptopProduct.images[0].url || "/placeholder.svg"}
                    alt={laptopProduct.title}
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <p className="text-green-600 font-medium">{laptopProduct.shipping.isFree ? "Envío gratis" : ""}</p>
                  <p className="text-xl font-bold">$ {laptopProduct.price.toLocaleString()}</p>
                  <p className="text-sm line-clamp-2 mt-1">{laptopProduct.title}</p>
                </div>
              </div>
            </Link>
          )}

          {thermosProduct && (
            <Link href={`/product/${thermosProduct.slug}`} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 flex items-center justify-center p-4">
                  <img
                    src={thermosProduct.images[0].url || "/placeholder.svg"}
                    alt={thermosProduct.title}
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <p className="text-green-600 font-medium">{thermosProduct.shipping.isFree ? "Envío gratis" : ""}</p>
                  <p className="text-xl font-bold">$ {thermosProduct.price.toLocaleString()}</p>
                  <p className="text-sm line-clamp-2 mt-1">{thermosProduct.title}</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}

