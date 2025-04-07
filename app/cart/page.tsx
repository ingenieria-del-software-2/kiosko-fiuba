"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "../hooks/use-cart"

export default function CartPage() {
  const router = useRouter()
  const { cart, isLoading, error, updateItemQuantity, removeItem } = useCart()
  const [isChecked, setIsChecked] = useState(true)

  const handleContinue = () => {
    router.push("/cart/checkout/buying")
  }

  if (isLoading) {
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
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-lg">Cargando carrito...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
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
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-lg text-red-500">Error al cargar el carrito</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Intentar nuevamente
            </Button>
          </div>
        </main>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
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
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-xl font-medium mb-4">Tu carrito está vacío</h2>
            <p className="mb-6">¿No sabés qué comprar? ¡Miles de productos te esperan!</p>
            <Link href="/">
              <Button className="bg-blue-500 hover:bg-blue-600">Descubrir productos</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

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
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2 h-5 w-5"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <h2 className="text-lg font-medium">Productos de {cart.items[0]?.sellerName || "VENDEDOR"}</h2>
              </div>

              <div className="border-t pt-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-4 mb-4 pb-4 border-b">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.productName}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-medium">{item.productName}</h3>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <button
                          className="text-blue-500 hover:underline mr-4 flex items-center"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Eliminar
                        </button>
                        <button className="text-blue-500 hover:underline flex items-center">Guardar</button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-xl font-bold">$ {item.unitPrice.amount.toLocaleString()}</span>
                      <div className="flex items-center mt-2 border rounded-md">
                        <button
                          className="px-2 py-1 text-gray-500"
                          onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-1 border-x">{item.quantity}</span>
                        <button
                          className="px-2 py-1 text-gray-500"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-500 mt-1">+50 disponibles</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="font-medium mb-4">Envío</h2>
              <div className="flex items-center text-green-600">
                <span className="font-medium">Gratis</span>
              </div>
              <div className="mt-4 border-t pt-4">
                <p className="text-green-600">
                  Aprovechá tu envío gratis agregando más productos de {cart.items[0]?.sellerName || "VENDEDOR"}.
                </p>
                <button className="text-blue-500 hover:underline mt-2">Ver más productos de este vendedor</button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-medium mb-4">Resumen de compra</h2>

              <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between">
                  <span>Productos ({cart.itemCount})</span>
                  <span>$ {cart.totalAmount.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="text-green-600">Gratis</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>$ {cart.totalAmount.amount.toLocaleString()}</span>
                </div>

                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg mt-4"
                  onClick={handleContinue}
                >
                  Continuar compra
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

