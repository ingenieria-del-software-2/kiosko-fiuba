import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "../types/product"

interface ProductReviewsProps {
  product: Product
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  // Ordenar reseñas por fecha (más recientes primero)
  const sortedReviews = [...product.reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Calcular porcentajes para la distribución de estrellas
  const calculatePercentage = (count: number) => {
    return (count / product.rating.count) * 100
  }

  return (
    <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-medium mb-6">Opiniones del producto</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="flex items-center gap-4">
            <span className="text-6xl font-bold text-blue-500">{product.rating.average.toFixed(1)}</span>
            <div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(product.rating.average)
                        ? "fill-yellow-400"
                        : i < Math.ceil(product.rating.average)
                          ? "fill-yellow-400 stroke-yellow-400"
                          : "fill-gray-300"
                    }`}
                    style={
                      i < Math.ceil(product.rating.average) && i >= Math.floor(product.rating.average)
                        ? { fillOpacity: 0.5 }
                        : undefined
                    }
                  />
                ))}
              </div>
              <p className="text-gray-500">{product.rating.count.toLocaleString()} calificaciones</p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="w-8">{stars}</span>
                <Star className="w-4 h-4 fill-gray-300" />
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-gray-500 h-2 rounded-full"
                    style={{
                      width: `${calculatePercentage(product.rating.distribution[stars as keyof typeof product.rating.distribution])}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {sortedReviews.length > 0 && sortedReviews[0].attributes && (
            <div className="mt-6">
              <h3 className="font-medium mb-4">Calificación de características</h3>
              <div className="space-y-3">
                {sortedReviews[0].attributes.map((attr) => (
                  <div key={attr.name}>
                    <p>{attr.name}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < attr.rating ? "fill-yellow-400" : "fill-gray-300"}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="md:w-2/3">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Opiniones destacadas</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Ordenar
                </Button>
                <Button variant="outline" size="sm">
                  Calificación
                </Button>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4">{product.reviews.length} comentarios</p>

            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <p className="mb-4">
                El producto es estéticamente atractivo y de excelente calidad, con materiales duraderos y un diseño
                práctico. Calienta rápidamente y ofrece la posibilidad de seleccionar diferentes temperaturas, lo que la
                hace versátil y útil para diversas necesidades. Además, su pantalla digital es fácil de usar y
                proporciona precisión en el control de la temperatura, lo que ha dejado a los usuarios muy satisfechos
                con su rendimiento.
              </p>
              <div className="flex items-center text-gray-500 text-sm">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 4V2M12 20V22M4 12H2M22 12H20M19.778 19.778L18.364 18.364M19.778 4.222L18.364 5.636M4.222 19.778L5.636 18.364M4.222 4.222L5.636 5.636"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Resumen de opiniones generado por IA
                </span>
              </div>
              <div className="mt-2 flex items-center">
                <Button variant="outline" size="sm" className="text-sm">
                  Es útil
                </Button>
                <span className="ml-2 text-sm text-gray-500">26</span>
              </div>
            </div>

            {sortedReviews.map((review, index) => (
              <div key={review.id} className={`${index > 0 ? "border-t" : ""} pt-6 ${index > 0 ? "mt-6" : ""}`}>
                <div className="flex justify-between mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400" : "fill-gray-300"}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {review.title && <p className="font-medium mb-1">{review.title}</p>}
                <p className="text-sm">{review.comment}</p>

                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {review.images.map((img, i) => (
                      <img
                        key={i}
                        src={img || "/placeholder.svg"}
                        alt={`Imagen de reseña ${i + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}

                <div className="mt-2 flex items-center">
                  <Button variant="outline" size="sm" className="text-sm">
                    Es útil
                  </Button>
                  <span className="ml-2 text-sm text-gray-500">{review.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

