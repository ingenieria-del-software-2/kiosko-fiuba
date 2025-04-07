"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useProduct } from "../../../hooks/use-product"
import { useUser } from "../../../context/user-context"
import type { ProductVariant } from "../../../types/product"

export default function PaymentPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("installments")
  const { user } = useUser()

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

  const handleContinue = () => {
    router.push("/cart/checkout/confirmation")
  }

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

  // Obtener opciones de pago del producto
  const paymentOptions = product.paymentOptions

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

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Elegí cómo pagar</h1>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="divide-y">
                <div className="p-6 relative">
                  <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    RECOMENDADO
                  </div>
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value="installments" id="installments" className="mt-1" />
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                          M
                        </div>
                        <Label htmlFor="installments" className="font-medium">
                          Cuotas sin Tarjeta
                        </Label>
                      </div>
                      <p className="text-sm mt-1">Límite disponible: $ 808.646,75</p>
                      <p className="text-sm">Hasta 12 cuotas sin tarjeta</p>
                    </div>
                  </div>
                </div>

                {user?.paymentMethods.map((method, index) => (
                  <div key={method.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          {method.cardBrand === "visa" ? (
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="#1A1F71">
                              <path d="M9.5 4h5c4.5 0 5.5 2 5.5 5v6c0 3-1 5-5.5 5h-5C5 20 4 18 4 15V9c0-3 1-5 5.5-5z" />
                              <path fill="white" d="M9.5 16.5l1.5-9 2 .5-1.5 8.5h-2z" />
                              <path fill="white" d="M13.5 16.5l1.5-9 2 .5-1.5 8.5h-2z" />
                              <path fill="white" d="M7.5 16.5l1.5-9 2 .5-1.5 8.5h-2z" />
                            </svg>
                          ) : method.cardBrand === "mastercard" ? (
                            <svg viewBox="0 0 24 24" width="20" height="20">
                              <circle cx="8" cy="12" r="6" fill="#EB001B" />
                              <circle cx="16" cy="12" r="6" fill="#F79E1B" />
                              <path d="M12 17.5a6 6 0 0 0 0-11 6 6 0 0 0 0 11z" fill="#FF5F00" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                              <rect x="3" y="5" width="18" height="14" rx="2" />
                              <line x1="3" y1="10" x2="21" y2="10" stroke="white" />
                            </svg>
                          )}
                        </div>
                        <Label htmlFor={method.id} className="font-medium">
                          {method.bank} **** {method.lastFourDigits}
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value="debit" id="debit" className="mt-1" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-500">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <line x1="3" y1="10" x2="21" y2="10" stroke="white" />
                        </svg>
                      </div>
                      <Label htmlFor="debit" className="font-medium">
                        Nueva tarjeta de débito
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value="credit" id="credit" className="mt-1" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-500">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <line x1="3" y1="10" x2="21" y2="10" stroke="white" />
                        </svg>
                      </div>
                      <Label htmlFor="credit" className="font-medium">
                        Nueva tarjeta de crédito
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value="cash" id="cash" className="mt-1" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-500">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                          <rect x="3" y="6" width="18" height="12" rx="1" />
                          <circle cx="12" cy="12" r="3" fill="white" />
                        </svg>
                      </div>
                      <Label htmlFor="cash" className="font-medium">
                        Efectivo en puntos de pago
                      </Label>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-end">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg" onClick={handleContinue}>
                Continuar
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-medium mb-4">Resumen de compra</h2>
              <div className="border-b pb-4">
                <div className="flex justify-between mb-2">
                  <span>Producto</span>
                  <span>$ {price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Envío</span>
                  <span className="text-green-600">
                    {product.shipping.isFree ? "Gratis" : `$${product.shipping.cost}`}
                  </span>
                </div>
                <div className="mt-2">
                  <Link href="#" className="text-blue-500 text-sm">
                    Ingresar código de cupón
                  </Link>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex justify-between font-medium">
                  <span>Pagás</span>
                  <span>$ {price.toLocaleString()}</span>
                </div>
                {!isSimpleProduct && selectedVariant && (
                  <p className="text-sm text-gray-500 mt-2">{selectedVariant.name}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

