"use client"

import { useState, useEffect } from "react"
import type { ProductImage } from "../types/product"

interface ProductGalleryProps {
  images: ProductImage[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  // Ordenar imágenes por el campo order
  const sortedImages = [...images].sort((a, b) => a.order - b.order)

  // Encontrar la imagen principal o usar la primera
  const mainImageIndex = sortedImages.findIndex((img) => img.isMain)
  const [selectedImage, setSelectedImage] = useState(mainImageIndex !== -1 ? mainImageIndex : 0)

  // Resetear el índice de imagen seleccionada cuando cambian las imágenes
  useEffect(() => {
    const newMainImageIndex = sortedImages.findIndex((img) => img.isMain)
    setSelectedImage(newMainImageIndex !== -1 ? newMainImageIndex : 0)
  }, [images])

  return (
    <div className="flex">
      {/* Miniaturas verticales */}
      <div className="flex flex-col gap-2 mr-4">
        {sortedImages.map((image, index) => (
          <button
            key={image.id}
            className={`relative h-16 w-16 border rounded-lg overflow-hidden ${
              selectedImage === index ? "border-blue-500 border-2" : "border-gray-200"
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <img src={image.url || "/placeholder.svg"} alt={image.alt} className="object-contain w-full h-full" />
          </button>
        ))}
      </div>

      {/* Imagen principal */}
      <div className="relative flex-grow h-[400px] border rounded-lg overflow-hidden">
        {sortedImages.length > 0 ? (
          <img
            src={sortedImages[selectedImage]?.url || "/placeholder.svg"}
            alt={sortedImages[selectedImage]?.alt || "Imagen del producto"}
            className="object-contain w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No hay imagen disponible</span>
          </div>
        )}
      </div>
    </div>
  )
}

