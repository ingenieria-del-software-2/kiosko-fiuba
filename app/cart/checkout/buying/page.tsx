"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"
import { useCart } from "../../../hooks/use-cart"
import { useCheckout } from "../../../hooks/use-checkout"
import { useUser } from "../../../context/user-context"

export default function CheckoutPage() {
  const router = useRouter()
  const [deliveryOption, setDeliveryOption] = useState("monday")
  const { user } = useUser()
  const { cart, isLoading: isLoadingCart } = useCart()
  const {
    checkout,
    shippingMethods,
    isLoading: isLoadingCheckout,
    initializeCheckout,
    updateShipping,
    selectShippingMethod,
  } = useCheckout(cart?.id)

  // Initialize checkout when cart is loaded
  useEffect(() => {
    if (cart && !checkout) {
      initializeCheckout(user?.id)
    }
  }, [cart, checkout, initializeCheckout, user?.id])

  // Set shipping information when user is loaded
  useEffect(() => {
    if (checkout && user && user.addresses.length > 0) {
      const defaultAddress = user.addresses.find((addr) => addr.isDefault) || user.addresses[0]

      updateShipping({
        fullName: `${user.firstName} ${user.lastName}`,
        street: defaultAddress.street,
        apartment: defaultAddress.apartment,
        city: defaultAddress.city,
        state: defaultAddress.state,
        postalCode: defaultAddress.zipCode,
        country: defaultAddress.country,
        phoneNumber: user.phoneNumber,
      })
    }
  }, [checkout, user, updateShipping])

  const handleContinue = () => {
    if (shippingMethods && shippingMethods.length > 0) {
      // Select the first shipping method if not already selected
      if (!checkout?.selectedShippingMethod) {
        selectShippingMethod(shippingMethods[0].id)
      }

      router.push("/cart/checkout/payment")
    }
  }

  // Redirigir al usuario a agregar una dirección si no tiene ninguna
  useEffect(() => {
    if (user && user.addresses.length === 0) {
      router.push("/my-profile?section=addresses")
    }
  }, [user, router])

  const isLoading = isLoadingCart || isLoadingCheckout

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Cargando información...</h1>
        </div>
      </div>
    )
  }

  // Si el usuario no tiene direcciones, mostrar un mensaje y redirigir
  if (user && user.addresses.length === 0) {
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
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Necesitas agregar una dirección de envío</h3>
            <p className="text-gray-500 mb-4">
              Para continuar con tu compra, debes agregar una dirección donde recibir tus productos.
            </p>
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => router.push("/my-profile?section=addresses")}
            >
              Agregar dirección
            </Button>
          </div>
        </main>
      </div>
    )
  }

  if (!cart || !checkout) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Error al cargar la información</h1>
          <Button onClick={() => router.push("/cart")}>Volver al carrito</Button>
        </div>
      </div>
    )
  }

  // Obtener la dirección predeterminada del usuario
  const defaultAddress = user?.addresses.find((addr) => addr.isDefault)
  const addressText = defaultAddress
    ? `${defaultAddress.street} ${defaultAddress.number}${defaultAddress.apartment ? `, ${defaultAddress.apartment}` : ""}, ${defaultAddress.city}`
    : "Avenida Cordoba 3543"

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
            <h1 className="text-2xl font-bold mb-6">Revisá cuándo llega tu compra</h1>

            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 mr-2 text-gray-500" />
              <span>Envío a {addressText}</span>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-4 border-b">
                <h2 className="font-medium">Envío 1</h2>
              </div>

              <div className="p-4">
                {checkout.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 mr-4">
                        <img
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.productName}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        {item.variantId && <p className="text-sm text-gray-500">Variante: {item.variantId}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Cantidad: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="border-t">
                {shippingMethods &&
                  shippingMethods.map((method) => (
                    <div key={method.id} className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <RadioGroupItem value={method.id} id={method.id} className="mr-3" />
                        <Label htmlFor={method.id}>
                          {method.name} - Llega en {method.estimatedDeliveryDays} días
                        </Label>
                      </div>
                      <span className={method.price.amount === 0 ? "text-green-600 font-medium" : ""}>
                        {method.price.amount === 0 ? "Gratis" : `$${method.price.amount.toLocaleString()}`}
                      </span>
                    </div>
                  ))}
              </RadioGroup>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="font-medium">Envío</h2>
                <span className="text-green-600 font-medium">
                  {checkout.shippingCost.amount === 0 ? "Gratis" : `$${checkout.shippingCost.amount.toLocaleString()}`}
                </span>
              </div>
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

              <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between">
                  <span>Productos ({checkout.items.length})</span>
                  <span>$ {checkout.subtotal.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="text-green-600">
                    {checkout.shippingCost.amount === 0
                      ? "Gratis"
                      : `$${checkout.shippingCost.amount.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex justify-between font-medium">
                  <span>Pagás</span>
                  <span>$ {checkout.totalAmount.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

