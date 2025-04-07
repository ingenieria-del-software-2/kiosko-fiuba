"use client"

import Link from "next/link"
import { ShoppingCart, Bell, MapPin, ChevronDown, User } from "lucide-react"
import { useUser } from "../context/user-context"

export default function Navbar() {
  const { user, isLoading } = useUser()

  // Obtener la dirección predeterminada del usuario
  const defaultAddress = user?.addresses.find((addr) => addr.isDefault)
  const addressText = defaultAddress
    ? `${defaultAddress.street} ${defaultAddress.number}${defaultAddress.apartment ? `, ${defaultAddress.apartment}` : ""} - ${defaultAddress.city}`
    : "Agregar dirección"

  return (
    <div className="bg-yellow-400 py-3">
      <div className="container mx-auto px-4">
        {/* Bottom navbar */}
        <div className="flex items-center py-2 text-sm">
          <div className="flex items-center text-gray-700 mr-6">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Enviar a</span>
            <Link href="/my-profile?section=addresses" className="ml-1 text-xs hover:text-blue-500">
              {addressText}
            </Link>
          </div>

          <nav className="flex-grow">
            <ul className="flex space-x-4">
              <li>
                <Link href="#" className="flex items-center text-gray-700">
                  Categorías <ChevronDown className="h-4 w-4 ml-1" />
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700">
                  Cupones
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700">
                  Supermercado
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700">
                  Moda
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700">
                  Mercado Play
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700">
                  Vender
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700">
                  Ayuda
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/my-profile" className="flex items-center text-gray-700">
              <User className="h-4 w-4 mr-1" />
              <span>{isLoading ? "Cargando..." : user?.username || "Iniciar sesión"}</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </Link>
            <Link href="#" className="text-gray-700">
              Mis compras
            </Link>
            <Link href="#" className="flex items-center text-gray-700">
              Favoritos <ChevronDown className="h-4 w-4 ml-1" />
            </Link>
            <Link href="#" className="text-gray-700">
              <Bell className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="text-gray-700">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

