"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { PaymentService } from "../../../services/payment-service"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load order details
  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) {
        setError("No se encontró el ID de la orden")
        setIsLoading(false)
        return
      }

      try {
        const orderData = await PaymentService.getOrder(orderId)
        if (orderData) {
          setOrder(orderData)
        } else {
          setError("No se pudo cargar la información de la orden")
        }
      } catch (err) {
        console.error("Error loading order:", err)
        setError("Error al cargar la información de la orden")
      } finally {
        setIsLoading(false)
      }
    }

    loadOrder()
  }, [orderId])

  // Generar un número de pedido único
  const orderNumber = order?.id
    ? `ML-${new Date(order.createdAt).getFullYear()}-${String(new Date(order.createdAt).getMonth() + 1).padStart(2, "0")}-${String(new Date(order.createdAt).getDate()).padStart(2, "0")}-${order.id.slice(-6)}`
    : `ML-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}-${Math.floor(100000 + Math.random() * 900000)}`

  // Calcular fecha de entrega estimada (3 días hábiles desde hoy)
  const getEstimatedDeliveryDate = () => {
    if (order?.estimatedDelivery) {
      return new Date(order.estimatedDelivery).toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    }

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Cargando información...</h1>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="mb-4">{error}</p>
          <Link href="/">
            <Button className="bg-blue-500 hover:bg-blue-600">Volver a la tienda</Button>
          </Link>
        </div>
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
            {order && (
              <>
                <div className="flex justify-between mb-2">
                  <span>Productos:</span>
                  <span className="font-medium">
                    {order.items.length} {order.items.length === 1 ? "item" : "items"}
                  </span>
                </div>
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between mb-2 pl-4">
                    <span>{item.productName}</span>
                    <span className="font-medium">x{item.quantity}</span>
                  </div>
                ))}
              </>
            )}
            <div className="flex justify-between mb-2">
              <span>Total:</span>
              <span className="font-medium">$ {order?.totalAmount?.amount.toLocaleString() || "0"}</span>
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

