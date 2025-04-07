"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [isChecked, setIsChecked] = useState(true)

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleContinue = () => {
    router.push("/cart/checkout/buying")
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
                <h2 className="text-lg font-medium">Productos de FULLSTOREONLINE</h2>
              </div>

              <div className="border-t pt-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DpbgguUV1vH8YkXMYntRtDcxSDx5yn.png"
                      alt="Dell Inspiron 15 3520"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-medium">Notebook Dell Inspiron 15 3520 15.6 8gb Ram 512gb Ssd Color Negro</h3>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <button className="text-blue-500 hover:underline mr-4 flex items-center">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Eliminar
                      </button>
                      <button className="text-blue-500 hover:underline flex items-center">Guardar</button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-xl font-bold">$ 959.999</span>
                    <div className="flex items-center mt-2 border rounded-md">
                      <button className="px-2 py-1 text-gray-500" onClick={decreaseQuantity}>
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-1 border-x">{quantity}</span>
                      <button className="px-2 py-1 text-gray-500" onClick={increaseQuantity}>
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500 mt-1">+50 disponibles</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="font-medium mb-4">Envío</h2>
              <div className="flex items-center text-green-600">
                <span className="font-medium">Gratis</span>
              </div>
              <div className="mt-4 border-t pt-4">
                <p className="text-green-600">Aprovechá tu envío gratis agregando más productos de FULLSTOREONLINE.</p>
                <button className="text-blue-500 hover:underline mt-2">Ver más productos de este vendedor</button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-medium mb-4">Resumen de compra</h2>

              <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between">
                  <span>Productos ({quantity})</span>
                  <span>$ {(959999 * quantity).toLocaleString("es-AR")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="text-green-600">Gratis</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>$ {(959999 * quantity).toLocaleString("es-AR")}</span>
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

