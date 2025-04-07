"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useProduct } from "../../../hooks/use-product"
import type { ProductVariant } from "../../../types/product"

export default function ConfirmationPage() {
  // Obtener un producto aleatorio para demostración
  const { product, isLoading } = useProduct("prod1")

  // Estado para la variante seleccionada
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>()

  // Inicializar la variante seleccionada cuando se carga el producto
  useEffect(() => {
    if (product && product.variants) {
      const defaultVariant = product.variants.find((v) => v.isSelected) || product.variants[0]
      setSelectedVariant(defaultVariant)
    }
  }, [product])

  // Generar un número de pedido único
  const orderNumber = `ML-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}-${Math.floor(100000 + Math.random() * 900000)}`

  // Calcular fecha de entrega estimada (3 días hábiles desde hoy)
  const getEstimatedDeliveryDate = () => {
    const today = new Date()
    const deliveryDate = new Date(today)
    let daysToAdd = 3 // Días hábiles a añadir

    while (daysToAdd > 0) {
      deliveryDate.setDate(deliveryDate.getDate() + 1)
      // Saltar fines de semana (0 = domingo, 6 = sábado)
      if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
        daysToAdd--
      }
    }

    // Formatear fecha en español
    return deliveryDate.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  }

  const estimatedDeliveryDate = getEstimatedDeliveryDate()

  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Cargando información...</h1>
        </div>
      </div>
    )
  }

  // Obtener precio y stock de la variante seleccionada
  const price = selectedVariant?.price || product.price
  const variantName = selectedVariant?.name || ""
  const isSimpleProduct = product.productType === "simple" || !product.hasVariants

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-yellow-400 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <img src="/placeholder.svg?height=40&width=120" alt="MercadoLibre" className="h-10" />
          </Link>
          <Link href="#" className="text-gray-700">
            Ayuda
          </Link>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>

          <h1 className="text-3xl font-bold mb-4">¡Gracias por tu compra!</h1>
          <p className="text-xl mb-8">Tu pedido ha sido confirmado</p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
            <h2 className="text-xl font-medium mb-4">Detalles de la compra</h2>
            <div className="flex justify-between mb-2">
              <span>Número de pedido:</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Producto:</span>
              <span className="font-medium">{product.title}</span>
            </div>
            {!isSimpleProduct && selectedVariant && (
              <div className="flex justify-between mb-2">
                <span>Configuración:</span>
                <span className="font-medium">{selectedVariant.name}</span>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <span>Total:</span>
              <span className="font-medium">$ {price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Entrega estimada:</span>
              <span className="font-medium text-green-600">{estimatedDeliveryDate}</span>
            </div>
          </div>

          <div className="space-y-4">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg">
              Ver detalle de la compra
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full py-3 text-lg">
                Volver a la tienda
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

