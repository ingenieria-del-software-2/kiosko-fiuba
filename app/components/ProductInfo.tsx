"use client"

import { useState, useEffect } from "react"
import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product, ProductVariant } from "../types/product"

interface ProductInfoProps {
  product: Product
  onVariantChange?: (variant: ProductVariant) => void
}

export default function ProductInfo({ product, onVariantChange }: ProductInfoProps) {
  // Estado para almacenar los atributos seleccionados actualmente
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({})
  // Estado para almacenar la variante seleccionada actualmente
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.find((v) => v.isSelected),
  )

  // Inicializar los atributos seleccionados basados en la variante seleccionada por defecto
  useEffect(() => {
    if (selectedVariant) {
      setSelectedAttributes(selectedVariant.attributes)
    } else if (product.variants && product.variants.length > 0) {
      // Asegurarse de que la primera variante esté seleccionada por defecto
      setSelectedAttributes(product.variants[0].attributes)
      setSelectedVariant(product.variants[0])

      // Notificar al componente padre sobre la variante seleccionada
      if (onVariantChange) {
        onVariantChange(product.variants[0])
      }
    }
  }, [product.variants, onVariantChange])

  // Actualizar la variante seleccionada cuando cambian los atributos
  useEffect(() => {
    if (Object.keys(selectedAttributes).length > 0 && product.getVariantByAttributes) {
      const variant = product.getVariantByAttributes(selectedAttributes)
      if (variant) {
        setSelectedVariant(variant)
        if (onVariantChange) {
          onVariantChange(variant)
        }
      }
    }
  }, [selectedAttributes, product, onVariantChange])

  // Modificar la función handleAttributeSelect para actualizar la variante seleccionada
  const handleAttributeSelect = (attributeName: string, attributeValue: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: attributeValue,
    }))

    // Buscar la variante que coincide con el nuevo atributo seleccionado
    if (product.getVariantByAttributes) {
      const newAttributes = {
        ...selectedAttributes,
        [attributeName]: attributeValue,
      }

      const variant = product.getVariantByAttributes(newAttributes)
      if (variant) {
        setSelectedVariant(variant)
        if (onVariantChange) {
          onVariantChange(variant)
        }
      }
    }
  }

  // Verificar si un valor de atributo está disponible basado en las selecciones actuales
  const isAttributeValueAvailable = (attributeName: string, attributeValue: string) => {
    if (!product.getCompatibleVariants) return true

    // Crear una copia de los atributos seleccionados con el nuevo valor
    const testAttributes = {
      ...selectedAttributes,
      [attributeName]: attributeValue,
    }

    // Verificar si hay variantes compatibles con esta selección
    const compatibleVariants = product.getCompatibleVariants(testAttributes)
    return compatibleVariants.length > 0
  }

  // Determinar si el producto es simple o configurable
  const isSimpleProduct = product.productType === "simple" || !product.hasVariants || !product.configOptions

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {product.condition === "new" ? "Nuevo" : product.condition === "used" ? "Usado" : "Reacondicionado"} | +
            {product.soldCount} vendidos
          </span>
          {product.soldCount > 100 && (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">MÁS VENDIDO</span>
          )}
          {product.categories.length > 0 && (
            <span className="text-xs text-blue-500">
              {product.soldCount}° en {product.categories[product.categories.length - 1].name}
            </span>
          )}
        </div>
        <Heart className="text-gray-400" />
      </div>

      <h1 className="text-2xl font-medium">{product.title}</h1>

      <div className="flex items-center space-x-2">
        <span className="font-semibold text-lg">{product.rating.average.toFixed(1)}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(product.rating.average) ? "fill-yellow-400" : "fill-gray-300"}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">({product.rating.count})</span>
      </div>

      {/* Características destacadas para productos simples */}
      {isSimpleProduct && product.highlightedFeatures && (
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Lo que tenés que saber de este producto</h3>
          <ul className="space-y-2">
            {product.highlightedFeatures.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-6 mt-6">
        {/* Mostrar opciones de configuración */}
        {product.configOptions?.map((option) => (
          <div key={option.id}>
            <h3 className="font-medium mb-2">
              {option.name}:{" "}
              {option.values.find((v) => selectedAttributes[option.name] === v.value)?.value ||
                option.values.find((v) => v.isSelected)?.value ||
                option.values[0].value}
            </h3>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={`Seleccionar ${option.name}`}>
              {option.values.map((value) => {
                const isAvailable = isAttributeValueAvailable(option.name, value.value)
                const isSelected = selectedAttributes[option.name] === value.value

                // Find variant with this attribute to show price difference if applicable
                const variantWithThisAttribute = product.variants?.find(
                  (v) =>
                    v.attributes[option.name] === value.value &&
                    Object.entries(selectedAttributes)
                      .filter(([key]) => key !== option.name)
                      .every(([key, val]) => v.attributes[key] === val),
                )

                // Calculate price difference from current selection
                const priceDifference = variantWithThisAttribute
                  ? variantWithThisAttribute.price - (selectedVariant?.price || product.price)
                  : 0

                // Si es una opción de color, mostrar un botón con el color
                if (option.name.toLowerCase() === "color" && value.image) {
                  return (
                    <Button
                      key={value.id}
                      variant="outline"
                      size="sm"
                      role="radio"
                      aria-checked={isSelected}
                      className={`
                        ${isSelected ? "ring-2 ring-blue-500" : ""}
                        ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
                        relative p-1 h-auto min-w-[40px]
                      `}
                      disabled={!isAvailable}
                      onClick={() => handleAttributeSelect(option.name, value.value)}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full mb-1 border border-gray-300 overflow-hidden">
                          <img
                            src={value.image || "/placeholder.svg"}
                            alt={value.value}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs">{value.displayValue || value.value}</span>
                      </div>
                    </Button>
                  )
                }

                return (
                  <Button
                    key={value.id}
                    variant="outline"
                    size="sm"
                    role="radio"
                    aria-checked={isSelected}
                    className={`
                      ${isSelected ? "bg-blue-50 border-blue-200 ring-2 ring-blue-300" : ""}
                      ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
                      relative
                    `}
                    disabled={!isAvailable}
                    onClick={() => handleAttributeSelect(option.name, value.value)}
                  >
                    <span>{value.displayValue || value.value}</span>
                    {priceDifference !== 0 && priceDifference !== undefined && (
                      <span className={`text-xs ml-1 ${priceDifference > 0 ? "text-red-500" : "text-green-500"}`}>
                        {priceDifference > 0
                          ? `+$${Math.abs(priceDifference).toLocaleString()}`
                          : `-$${Math.abs(priceDifference).toLocaleString()}`}
                      </span>
                    )}
                  </Button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

