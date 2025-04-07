"use client"

import { useUser } from "../context/user-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, MapPin, CreditCard, Settings, ShoppingBag } from "lucide-react"

export default function UserProfile() {
  const { user, isLoading, error } = useUser()

  if (isLoading) {
    return <div className="flex justify-center p-8">Cargando información del usuario...</div>
  }

  if (error) {
    return <div className="flex justify-center p-8 text-red-500">{error}</div>
  }

  if (!user) {
    return <div className="flex justify-center p-8">Por favor inicia sesión para ver tu perfil</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture || "/placeholder.svg"}
                    alt={user.displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500">
                    <User size={40} />
                  </div>
                )}
              </div>
              <CardTitle>{user.displayName}</CardTitle>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="mt-2 flex items-center text-sm">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  {user.level === "platinum"
                    ? "Platinum"
                    : user.level === "gold"
                      ? "Gold"
                      : user.level === "platinum_pro"
                        ? "Platinum Pro"
                        : user.level === "mercado_puntos"
                          ? "Mercado Puntos"
                          : "Regular"}
                </span>
                <span className="ml-2 text-gray-500">Desde {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Mis datos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Mis compras
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  Mis direcciones
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Medios de pago
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Datos personales</TabsTrigger>
              <TabsTrigger value="addresses">Direcciones</TabsTrigger>
              <TabsTrigger value="payments">Medios de pago</TabsTrigger>
              <TabsTrigger value="preferences">Preferencias</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Datos personales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Nombre</p>
                        <p>{user.firstName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Apellido</p>
                        <p>{user.lastName}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{user.email}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <p>{user.phoneNumber}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Nombre de usuario</p>
                      <p>{user.username}</p>
                    </div>

                    <Button className="mt-4">Editar datos personales</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Mis direcciones</CardTitle>
                  <Button>Agregar dirección</Button>
                </CardHeader>
                <CardContent>
                  {user.addresses.length === 0 ? (
                    <p>No tienes direcciones guardadas</p>
                  ) : (
                    <div className="space-y-4">
                      {user.addresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-4 relative">
                          {address.isDefault && (
                            <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              Predeterminada
                            </span>
                          )}
                          <p className="font-medium">{address.label || "Dirección"}</p>
                          <p>{`${address.street} ${address.number}${address.apartment ? `, ${address.apartment}` : ""}`}</p>
                          <p>{`${address.neighborhood}, ${address.city}, ${address.state}`}</p>
                          <p>{`${address.zipCode}, ${address.country}`}</p>
                          {address.reference && (
                            <p className="text-sm text-gray-500 mt-2">Referencia: {address.reference}</p>
                          )}

                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                            {!address.isDefault && (
                              <Button variant="outline" size="sm">
                                Establecer como predeterminada
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="text-red-500">
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Medios de pago</CardTitle>
                  <Button>Agregar medio de pago</Button>
                </CardHeader>
                <CardContent>
                  {user.paymentMethods.length === 0 ? (
                    <p>No tienes medios de pago guardados</p>
                  ) : (
                    <div className="space-y-4">
                      {user.paymentMethods.map((payment) => (
                        <div key={payment.id} className="border rounded-lg p-4 relative">
                          {payment.isDefault && (
                            <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              Predeterminado
                            </span>
                          )}

                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center mr-3">
                              {payment.type === "credit_card" && payment.cardBrand === "visa" && (
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1A1F71">
                                  <path d="M9.5 4h5c4.5 0 5.5 2 5.5 5v6c0 3-1 5-5.5 5h-5C5 20 4 18 4 15V9c0-3 1-5 5.5-5z" />
                                  <path fill="white" d="M9.5 16.5l1.5-9 2 .5-1.5 8.5h-2z" />
                                  <path fill="white" d="M13.5 16.5l1.5-9 2 .5-1.5 8.5h-2z" />
                                  <path fill="white" d="M7.5 16.5l1.5-9 2 .5-1.5 8.5h-2z" />
                                </svg>
                              )}
                              {payment.type === "credit_card" && payment.cardBrand === "mastercard" && (
                                <svg viewBox="0 0 24 24" width="20" height="20">
                                  <circle cx="8" cy="12" r="6" fill="#EB001B" />
                                  <circle cx="16" cy="12" r="6" fill="#F79E1B" />
                                  <path d="M12 17.5a6 6 0 0 0 0-11 6 6 0 0 0 0 11z" fill="#FF5F00" />
                                </svg>
                              )}
                            </div>

                            <div>
                              <p className="font-medium">
                                {payment.type === "credit_card"
                                  ? "Tarjeta de crédito"
                                  : payment.type === "debit_card"
                                    ? "Tarjeta de débito"
                                    : payment.type === "mercado_credit"
                                      ? "Mercado Crédito"
                                      : "Cuenta bancaria"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {payment.bank && `${payment.bank} `}
                                {payment.lastFourDigits && `terminada en ${payment.lastFourDigits}`}
                                {payment.expirationMonth &&
                                  payment.expirationYear &&
                                  ` - Vence: ${payment.expirationMonth.toString().padStart(2, "0")}/${payment.expirationYear}`}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            {!payment.isDefault && (
                              <Button variant="outline" size="sm">
                                Establecer como predeterminado
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="text-red-500">
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Comunicaciones</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Recibir promociones</span>
                          <input
                            type="checkbox"
                            checked={user.preferences.receivePromotions}
                            className="h-4 w-4"
                            readOnly
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Recibir newsletters</span>
                          <input
                            type="checkbox"
                            checked={user.preferences.receiveNewsletters}
                            className="h-4 w-4"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Seguridad</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Autenticación de dos factores</span>
                          <input
                            type="checkbox"
                            checked={user.preferences.twoFactorAuth}
                            className="h-4 w-4"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Notificaciones</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Email</span>
                          <input
                            type="checkbox"
                            checked={user.preferences.notificationPreferences.email}
                            className="h-4 w-4"
                            readOnly
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Push</span>
                          <input
                            type="checkbox"
                            checked={user.preferences.notificationPreferences.push}
                            className="h-4 w-4"
                            readOnly
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>SMS</span>
                          <input
                            type="checkbox"
                            checked={user.preferences.notificationPreferences.sms}
                            className="h-4 w-4"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <Button>Actualizar preferencias</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

