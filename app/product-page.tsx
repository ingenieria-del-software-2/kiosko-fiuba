"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Breadcrumb from "./components/Breadcrumb"
import ProductGallery from "./components/ProductGallery"
import ProductInfo from "./components/ProductInfo"
import PurchaseOptions from "./components/PurchaseOptions"
import ProductReviews from "./components/ProductReviews"
import { useProduct } from "./hooks/use-product"
import type { ProductVariant, ProductImage } from "./types/product"

interface ProductPageClientProps {
  productId: string
}

export default function ProductPageClient({ productId }: ProductPageClientProps) {
  const { product, isLoading, error } = useProduct(productId)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>()
  const [currentImages, setCurrentImages] = useState<ProductImage[]>([])

  useEffect(() => {
    if (product) {
      // Inicializar con la variante seleccionada o la primera
      const initialVariant = product.variants?.find((v) => v.isSelected) || product.variants?.[0]
      setSelectedVariant(initialVariant)

      // Inicializar las imágenes
      if (initialVariant?.images) {
        setCurrentImages(initialVariant.images)
      } else {
        setCurrentImages(product.images)
      }
    }
  }, [product])

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant)

    // Actualizar las imágenes si la variante tiene imágenes propias
    if (variant.images && variant.images.length > 0) {
      setCurrentImages(variant.images)
    } else {
      // Si no tiene imágenes propias, usar las del producto
      setCurrentImages(product?.images || [])
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Cargando producto...</h1>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <p>Lo sentimos, el producto que estás buscando no existe o no está disponible.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb categories={product.categories} />

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Columna izquierda: Galería de imágenes */}
            <div className="lg:col-span-4">
              <ProductGallery images={currentImages} />
            </div>

            {/* Columna central: Información del producto */}
            <div className="lg:col-span-5">
              <ProductInfo product={product} onVariantChange={handleVariantChange} />
            </div>

            {/* Columna derecha: Opciones de compra */}
            <div className="lg:col-span-3">
              <PurchaseOptions product={product} selectedVariant={selectedVariant} />
            </div>
          </div>
        </div>

        <ProductReviews product={product} />
      </main>
    </div>
  )
}

