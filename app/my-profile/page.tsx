"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useUser } from "../context/user-context"
import Navbar from "../components/Navbar"
import { User, CreditCard, MapPin, Settings } from "lucide-react"
import Link from "next/link"

// Importar los componentes de formulario existentes
import PersonalInfoForm from "./components/personal-info-form"
import AccountDataForm from "./components/account-data-form"
import AddressesForm from "./components/addresses-form"
import PaymentMethodsForm from "./components/payment-methods-form"

export default function MyProfilePage() {
  const { user, isLoading, error } = useUser()
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState<string>("personal")

  // Obtener la sección de los parámetros de búsqueda
  useEffect(() => {
    const section = searchParams.get("section")
    if (section) {
      setActiveSection(section)
    }
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <p className="text-center py-8">Cargando información del usuario...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <p className="text-center py-8 text-red-500">Error: {error}</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <p className="text-center py-8">Por favor inicia sesión para ver tu perfil</p>
        </div>
      </div>
    )
  }

  // Renderizar la sección correspondiente según activeSection
  const renderContent = () => {
    switch (activeSection) {
      case "addresses":
        return <AddressesForm />
      case "cards":
      case "payments":
        return <PaymentMethodsForm />
      case "account":
        return <AccountDataForm />
      case "personal":
      default:
        return <PersonalInfoForm />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Header con información del usuario */}
      <div className="bg-white shadow-sm mb-6">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture || "/placeholder.svg"}
                  alt={user.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <User size={32} className="text-gray-600" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-blue-500">Estás en nivel {user.level === "platinum" ? "6" : "4"} - Mercado Puntos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center text-sm">
          <Link href="/my-profile" className="text-blue-500 hover:underline">
            Mi perfil
          </Link>
          {activeSection !== "personal" && (
            <>
              <span className="mx-2">›</span>
              <span>
                {activeSection === "addresses"
                  ? "Direcciones"
                  : activeSection === "cards" || activeSection === "payments"
                    ? "Tarjetas"
                    : activeSection === "account"
                      ? "Datos de tu cuenta"
                      : ""}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar de navegación */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <nav>
                <ul className="divide-y">
                  <li>
                    <Link
                      href="/my-profile?section=personal"
                      className={`flex items-center p-4 hover:bg-gray-50 ${activeSection === "personal" ? "border-l-4 border-blue-500" : ""}`}
                    >
                      <User className="mr-3 h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Información personal</p>
                        <p className="text-sm text-gray-500">
                          Información de tu documento de identidad y tu actividad fiscal.
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-profile?section=account"
                      className={`flex items-center p-4 hover:bg-gray-50 ${activeSection === "account" ? "border-l-4 border-blue-500" : ""}`}
                    >
                      <Settings className="mr-3 h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Datos de tu cuenta</p>
                        <p className="text-sm text-gray-500">
                          Datos que representan a tu cuenta en Mercado Libre y Mercado Pago.
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-profile?section=payments"
                      className={`flex items-center p-4 hover:bg-gray-50 ${activeSection === "payments" || activeSection === "cards" ? "border-l-4 border-blue-500" : ""}`}
                    >
                      <CreditCard className="mr-3 h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Tarjetas</p>
                        <p className="text-sm text-gray-500">Tarjetas guardadas en tu cuenta.</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-profile?section=addresses"
                      className={`flex items-center p-4 hover:bg-gray-50 ${activeSection === "addresses" ? "border-l-4 border-blue-500" : ""}`}
                    >
                      <MapPin className="mr-3 h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Direcciones</p>
                        <p className="text-sm text-gray-500">Direcciones guardadas en tu cuenta.</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="p-4 border-t">
                <button className="text-blue-500 hover:underline text-sm">
                  Cancelar tu cuenta siempre que lo desees.
                </button>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="md:w-3/4">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}

