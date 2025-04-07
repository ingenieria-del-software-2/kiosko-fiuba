"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCart } from "../context/cart-context"
import { toast } from "@/components/ui/use-toast"
import type { Product, ProductVariant } from "../types/product"

interface PurchaseOptionsProps {
  product: Product
  selectedVariant?: ProductVariant
}

export default function PurchaseOptions({ product, selectedVariant: propSelectedVariant }: PurchaseOptionsProps) {
  const router = useRouter()
  const { addItem, isLoading: isAddingToCart } = useCart()

  // Usar directamente la prop sin estado local para evitar problemas de sincronización
  const variant = propSelectedVariant || product.variants?.find((v) => v.isSelected) || product.variants?.[0]

  // Derivar valores directamente de la variante actual
  const price = variant?.price || product.price
  const compareAtPrice = variant?.compareAtPrice || product.compareAtPrice
  const stock = variant?.stock || product.stock
  const isAvailable = variant?.isAvailable !== false

  const handleBuyNow = async () => {
    if (!isAvailable || stock <= 0) {
      toast({
        title: "Producto no disponible",
        description: "Este producto no está disponible actualmente",
        variant: "destructive",
      })
      return
    }

    const success = await addItem(product.id, 1, variant?.id)

    if (success) {
      router.push("/cart")
    } else {
      toast({
        title: "Error",
        description: "No se pudo agregar el producto al carrito",
        variant: "destructive",
      })
    }
  }

  // Formatear precio para mostrar
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: product.currency,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Obtener información de cuotas para la variante seleccionada
  const getInstallmentOption = () => {
    const installmentOption = product.paymentOptions
      .find((option) => option.type === "credit_card")
      ?.installments.find((inst) => inst.quantity === 12)

    if (installmentOption && price) {
      // Ajustar el monto de la cuota según el precio de la variante seleccionada
      const ratio = price / product.price
      return {
        ...installmentOption,
        amount: installmentOption.amount * ratio,
        totalAmount: price,
      }
    }

    return null
  }

  const installmentOption = getInstallmentOption()

  // Determinar si el producto es simple o configurable
  const isSimpleProduct = product.productType === "simple" || !product.hasVariants || !product.configOptions

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg border">
      <div>
        <h2 className="font-semibold mb-2">1 pago</h2>
        <div className="text-4xl font-bold">{formatPrice(price)}</div>
        {compareAtPrice && compareAtPrice > price && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg text-gray-500 line-through">{formatPrice(compareAtPrice)}</span>
            <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-md font-medium">
              {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}% OFF
            </span>
          </div>
        )}
        <p className="text-sm text-gray-500 mt-1">Vendido por {product.seller.name}</p>
        {variant && variant.name && !isSimpleProduct && <p className="text-sm font-medium mt-2">{variant.name}</p>}
      </div>

      {installmentOption && (
        <div>
          <h2 className="font-semibold mb-2">En cuotas</h2>
          <p className="text-green-600">
            Mismo precio en {installmentOption.quantity} cuotas de {formatPrice(installmentOption.amount)}
            <sup>{Math.round((installmentOption.amount % 1) * 100)}</sup>
          </p>
          <Button variant="link" className="text-blue-500 p-0">
            Ver los medios de pago
          </Button>
        </div>
      )}

      <div>
        <p className="text-green-600 font-medium">
          {product.shipping.isFree ? "Llega gratis " : "Llega "}
          el {new Date().getDay() === 5 ? "lunes" : "miércoles"}
        </p>
        <Button variant="link" className="text-blue-500 p-0">
          Más formas de entrega
        </Button>
      </div>

      {stock <= 10 && (
        <p className="font-semibold">¡{stock === 1 ? "Última disponible" : `Últimas ${stock} disponibles`}!</p>
      )}

      <Button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg"
        onClick={handleBuyNow}
        disabled={!isAvailable || stock <= 0 || isAddingToCart}
      >
        {isAddingToCart ? "Procesando..." : "Comprar ahora"}
      </Button>
      <Button
        variant="outline"
        className="w-full py-3 text-lg"
        disabled={!isAvailable || stock <= 0 || isAddingToCart}
        onClick={async () => {
          const success = await addItem(product.id, 1, variant?.id)
          if (success) {
            toast({
              title: "Producto agregado",
              description: "El producto se ha agregado al carrito correctamente",
            })
          }
        }}
      >
        Agregar al carrito
      </Button>

      <div className="space-y-4 mt-4">
        <div className="flex items-start space-x-2">
          <ArrowLeft className="text-green-500 flex-shrink-0" />
          <div>
            <p className="text-green-500 font-medium">Devolución gratis</p>
            <p className="text-sm text-gray-500">Tenés 30 días desde que lo recibís.</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Shield className="text-gray-500 flex-shrink-0" />
          <div>
            <p className="font-medium">Compra Protegida</p>
            <p className="text-sm text-gray-500">Recibí el producto que esperabas o te devolvemos tu dinero.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

